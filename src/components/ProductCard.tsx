import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ProductDto as Product } from '../lib/api';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, quantity);
    setAdded(true);
    setQuantity(1);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Link to={`/producto/${product.slug}`} className="product-card">
      <div className="product-image">
        <img src={product.image_url} alt={product.name} onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.cavallaro.com.py/productos/300000918.jpg'; }} />
        {product.is_new && <span className="badge badge-new">Nuevo</span>}
        {product.is_featured && <span className="badge badge-featured">Destacado</span>}

        <div className="product-overlay" onClick={(e) => e.preventDefault()}>
          <div className="overlay-content">
            <div className="quantity-pill">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                aria-label="Disminuir"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(99, quantity + 1))}
                aria-label="Aumentar"
              >
                +
              </button>
            </div>
            <button onClick={handleAddToCart} className="btn btn-primary add-overlay-btn">
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <button onClick={handleAddToCart} className="btn btn-primary">
          Agregar al Carrito
        </button>
      </div>
      {added && (
        <div className="toast-added" aria-live="polite">Agregado al carrito</div>
      )}
    </Link>
  );
}
