import { Link } from 'react-router-dom';
import { ProductDto as Product } from '../lib/api';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/producto/${product.slug}`} className="product-card">
      <div className="product-image">
        <img src={product.image_url} alt={product.name} />
        {product.is_new && <span className="badge badge-new">Nuevo</span>}
        {product.is_featured && <span className="badge badge-featured">Destacado</span>}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <button onClick={handleAddToCart} className="btn btn-primary">
          Agregar al Carrito
        </button>
      </div>
    </Link>
  );
}
