import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-contact">
            <span>Atención al Cliente: (021) 555-0100</span>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <h1>CAVALLARO</h1>
            </Link>

            <nav className="main-nav">
              <Link to="/">Inicio</Link>
              <Link to="/productos">Productos</Link>
              <Link to="/nosotros">Nosotros</Link>
              <Link to="/contacto">Contacto</Link>
              <Link to="/ubicaciones">Ubicaciones</Link>
            </nav>

            <div className="header-actions">
              <Link to="/carrito" className="cart-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="header-categories">
        <div className="container">
          <nav className="category-nav">
            <Link to="/productos?categoria=higiene-personal">Higiene Personal</Link>
            <Link to="/productos?categoria=cuidado-prendas">Cuidado de Prendas</Link>
            <Link to="/productos?categoria=limpieza-hogar">Limpieza del Hogar</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
