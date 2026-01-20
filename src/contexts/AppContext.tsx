import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import cartService, { CartItem } from '../services/cart.service';
import { obtenerCategorias } from '../services/categorias.services';
import { Category } from '../interfaces/Categorias.interface';
import authService, { User } from '../services/auth.service';
import { Product } from '../interfaces/Productos.interface';
import BannerService, { Banner } from "../services/BannerService";

interface AppContextType {
  // Usuario y autenticación
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;

  // Banners
  banners: Banner[];
  bannersLoading: boolean;
  bannersError: string | null;
  refreshBanners: () => Promise<void>;

  // Carrito de compras
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  cartSubTotal: number;
  cartImporteDescuento: number;
  cartLoading: boolean;
  addToCart: (product: Product, cantidad?: number) => Promise<void>;
  removeFromCart: (itemCarritoId: number) => Promise<void>;
  updateQuantity: (itemCarritoId: number, cantidad: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;

  // Categorías
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  refreshCategories: () => Promise<void>;

  // Sistema de notificaciones (toasts)
  toasts: { id: number; message: string; type: 'success' | 'error' | 'info' }[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ========== ESTADOS ==========
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  
  // Estados de banners
  const [banners, setBanners] = useState<Banner[]>([]);
  const [bannersLoading, setBannersLoading] = useState(true);
  const [bannersError, setBannersError] = useState<string | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartImporteDescuento, setCartImporteDescuento] = useState(0);
  const [cartLoading, setCartLoading] = useState(true);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  // 🔧 Ref para evitar múltiples llamadas simultáneas
  const isRefreshingCart = useRef(false);
  const isInitialized = useRef(false);

  // ========== FUNCIONES DE BANNERS ==========
  const loadBanners = async () => {
    try {
      setBannersLoading(true);
      setBannersError(null);

      // Intentar cargar desde caché
      const cached = localStorage.getItem('banners_cache');
      const cacheTime = localStorage.getItem('banners_cache_time');

      if (cached && cacheTime) {
        const age = Date.now() - parseInt(cacheTime);
        // Si el caché tiene menos de 5 minutos, usarlo (banners cambian más frecuente)
        if (age < 5 * 60 * 1000) {
          setBanners(JSON.parse(cached));
          setBannersLoading(false);
          return;
        }
      }

      // Si no hay caché válido, traer del servidor
      const response = await BannerService.listarTodos();
      const bannersData = response?.banners || [];
      
      setBanners(bannersData);

      // Guardar en caché
      localStorage.setItem('banners_cache', JSON.stringify(bannersData));
      localStorage.setItem('banners_cache_time', Date.now().toString());
    } catch (error) {
      console.error('Error cargando banners:', error);
      setBannersError('No se pudieron cargar los banners');
      
      // En caso de error, intentar usar caché antiguo si existe
      const cached = localStorage.getItem('banners_cache');
      if (cached) {
        setBanners(JSON.parse(cached));
        showToast('Mostrando banners en caché', 'info');
      }
    } finally {
      setBannersLoading(false);
    }
  };

  const refreshBanners = async () => {
    localStorage.removeItem('banners_cache');
    localStorage.removeItem('banners_cache_time');
    await loadBanners();
  };

  // ========== FUNCIONES DE CARRITO (BACKEND) ==========
  const refreshCart = async () => {
    if (isRefreshingCart.current) {
      console.log('⏳ refreshCart ya está en ejecución, saltando...');
      return;
    }

    try {
      isRefreshingCart.current = true;
      setCartLoading(true);
      console.log('🔄 Iniciando refreshCart...');

      const cartData = await cartService.getCart();
      console.log('📦 Cart refrescado:', {
        items: cartData.carrito.items.length,
        total: cartData.resumen.total,
        count: cartData.resumen.cantidadItems
      });

      setCart(cartData.carrito.items);
      setCartTotal(cartData.resumen.total);
      setCartSubTotal(cartData.resumen.subTotal);
      setCartImporteDescuento(cartData.resumen.importeDescuento);
      setCartCount(cartData.resumen.cantidadItems || 0);
    } catch (error: any) {
      console.error('❌ Error refreshing cart:', error);
      setCart([]);
      setCartTotal(0);
      setCartCount(0);
    } finally {
      setCartLoading(false);
      isRefreshingCart.current = false;
    }
  };

  const addToCart = async (variante: Product, cantidad: number = 1) => {
    try {
      console.log('🛒 Agregando al carrito:', { varianteId: variante.id, nombre: variante.name, cantidad });
      await cartService.addToCart(variante.id, cantidad);
      await refreshCart();
      showToast('Producto agregado al carrito', 'success');
    } catch (error: any) {
      console.error('❌ Error adding to cart:', error);
      showToast(error.message || 'Error al agregar al carrito', 'error');
      throw error;
    }
  };

  const removeFromCart = async (itemCarritoId: number) => {
    try {
      await cartService.removeFromCart(itemCarritoId);
      await refreshCart();
      showToast('Producto eliminado del carrito', 'info');
    } catch (error: any) {
      console.error('❌ Error removing from cart:', error);
      showToast(error.message || 'Error al eliminar del carrito', 'error');
      throw error;
    }
  };

  const updateQuantity = async (itemCarritoId: number, cantidad: number) => {
    try {
      if (cantidad < 1) {
        await removeFromCart(itemCarritoId);
        return;
      }
      await cartService.updateQuantity(itemCarritoId, cantidad);
      await refreshCart();
    } catch (error: any) {
      console.error('❌ Error updating quantity:', error);
      showToast(error.message || 'Error al actualizar cantidad', 'error');
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      await refreshCart();
      showToast('Carrito vaciado', 'info');
    } catch (error: any) {
      console.error('❌ Error clearing cart:', error);
      showToast(error.message || 'Error al vaciar carrito', 'error');
      throw error;
    }
  };

  // ========== FUNCIONES DE AUTENTICACIÓN ==========
  const login = async (email: string, password: string) => {
    const result = await authService.login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
      showToast('Sesión iniciada correctamente', 'success');
      await refreshCart();
    } else {
      showToast(result.message || 'Error al iniciar sesión', 'error');
    }
    return result;
  };

  const logout = async () => {
    try {
      authService.logout();
      setUser(null);
      setCart([]);
      setCartTotal(0);
      setCartCount(0);

      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('sessionId', newSessionId);
      console.log('🆕 Nuevo sessionId para invitado:', newSessionId);

      showToast('Sesión cerrada. Puedes seguir comprando como invitado', 'info');
      await refreshCart();
    } catch (error) {
      console.error('❌ Error en logout:', error);
      setUser(null);
      setCart([]);
    }
  };

  const refreshUser = async () => {
    if (!authService.isAuthenticated()) {
      setUser(null);
      return;
    }

    try {
      const result = await authService.getProfile();
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('❌ Error refreshing user:', error);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  const autoRenewToken = async () => {
    if (!authService.isAuthenticated()) return;
    const result = await authService.renewToken();
    if (result.success && result.user) {
      setUser(result.user);
    } else {
      await logout();
    }
  };

  // ========== FUNCIONES DE CATEGORÍAS ==========
  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);
      setCategoriesError(null);

      const cached = localStorage.getItem('categories_cache');
      const cacheTime = localStorage.getItem('categories_cache_time');

      if (cached && cacheTime) {
        const age = Date.now() - parseInt(cacheTime);
        if (age < 10 * 60 * 1000) {
          setCategories(JSON.parse(cached));
          setCategoriesLoading(false);
          return;
        }
      }

      const data = await obtenerCategorias();
      setCategories(data);

      localStorage.setItem('categories_cache', JSON.stringify(data));
      localStorage.setItem('categories_cache_time', Date.now().toString());
    } catch (error) {
      console.error('Error cargando categorías:', error);
      setCategoriesError('No se pudieron cargar las categorías');

      const cached = localStorage.getItem('categories_cache');
      if (cached) {
        setCategories(JSON.parse(cached));
        showToast('Mostrando categorías en caché', 'info');
      }
    } finally {
      setCategoriesLoading(false);
    }
  };

  const refreshCategories = async () => {
    localStorage.removeItem('categories_cache');
    localStorage.removeItem('categories_cache_time');
    await loadCategories();
  };

  // ========== FUNCIONES DE TOASTS ==========
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  // ========== EFECTOS ==========
  useEffect(() => {
    if (isInitialized.current) {
      console.log('⚠️ AppContext ya inicializado, saltando...');
      return;
    }

    const initializeApp = async () => {
      console.log('🚀 Inicializando aplicación...');
      isInitialized.current = true;

      // Cargar categorías y banners en paralelo (no dependen de auth)
      await Promise.all([
        loadCategories(),
        loadBanners()
      ]);

      // Si hay usuario, verificar que el token sea válido
      if (authService.isAuthenticated()) {
        await refreshUser();
      }

      // Cargar carrito al final
      await refreshCart();
      console.log('✅ Aplicación inicializada');
    };

    initializeApp();

    return () => {
      console.log('🧹 Cleanup AppContext');
    };
  }, []);

  useEffect(() => {
    if (!authService.isAuthenticated()) return;

    const interval = setInterval(() => {
      autoRenewToken();
    }, 20 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  // ========== PROVIDER ==========
  return (
    <AppContext.Provider
      value={{
        // Usuario
        user,
        isAuthenticated: authService.isAuthenticated(),
        login,
        logout,
        refreshUser,

        // Banners
        banners,
        bannersLoading,
        bannersError,
        refreshBanners,

        // Carrito
        cart,
        cartCount,
        cartTotal,
        cartSubTotal,
        cartImporteDescuento,
        cartLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,

        // Categorías
        categories,
        categoriesLoading,
        categoriesError,
        refreshCategories,

        // Toasts
        toasts,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};