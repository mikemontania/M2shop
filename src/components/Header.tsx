import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

export default function Header() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      name: "Higiene Personal",
      color: "#c22622",
      subcategories: ["Coco puro", "Tocador"],
      slug: "higiene-personal",
    },
    {
      name: "Cuidado de las Prendas",
      color: "#c22622",
      subcategories: [
        "Coco puro",
        "Jabón prensado",
        "Jabón de lavar",
        "Deterg. Liq p/ Ropas",
        "Jabón en polvo",
        "Suavizante",
      ],
      slug: "cuidado-de-las-prendas",
    },
    {
      name: "Limpieza y Desinfección del Hogar",
      color: "#c22622",
      subcategories: [
        "Complementarios",
        "Desodorante",
        "Detergente",
        "Lavandina",
        "Limpiador",
      ],
      slug: "limpieza-y-desinfeccion-del-hogar",
    },
  ];

  return (
    <header className="site-header">
      <div className="header-desktop">
        <div className="header-top">
          <div className="container header-row">
            <div className="logo">
              <Link to="/">
                <img
                  src="https://www.cavallaro.com.py/img/logo-web-blanco.png"
                  alt="Cavallaro"
                />
              </Link>
            </div>

            <div className="departments">
              <button
                className="departments-btn"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <i className="tm tm-departments-thin"></i> Categorías
              </button>

              {menuOpen && (
                <ul className="departments-menu">
                  {categories.map((cat, i) => (
                    <li
                      key={i}
                      className={`cat-item ${
                        activeCategory === i ? "active" : ""
                      }`}
                      onMouseEnter={() => setActiveCategory(i)}
                      onMouseLeave={() => setActiveCategory(null)}
                    >
                      <div className="cat-header">
                        <div
                          className="square-color"
                          style={{ backgroundColor: cat.color }}
                        ></div>
                        <Link to={`/catalogo/${cat.slug}`}>{cat.name}</Link>
                      </div>
                      {activeCategory === i && (
                        <ul className="subcategories">
                          {cat.subcategories.map((sub, j) => (
                            <li key={j}>
                              <Link to="#">{sub}</Link>
                            </li>
                          ))}
                          <li className="view-all">
                            <Link to={`/catalogo/${cat.slug}`}>
                              Ver todo en "{cat.name}"
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <form className="search-form">
              <input
                type="text"
                placeholder="Buscar productos..."
                aria-label="Buscar productos"
              />
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>

            <div className="header-links">
              {user ? (
                <>
                  <Link to="/mis-pedidos" className="link">
                    <img src="/icons/account.png" alt="Cuenta" />
                    Mis pedidos
                  </Link>
                  <button className="logout-btn" onClick={logout}>
                    Salir
                  </button>
                </>
              ) : (
                <Link to="/login" className="link">
                  <img src="/icons/account.png" alt="Login" />
                  Ingresar
                </Link>
              )}

              <Link to="/carrito" className="cart-link">
                <img src="/icons/cart.png" alt="Carrito" />
                <span className="cart-info">
                  <span className="cart-count">{cartCount}</span>
                  <span className="cart-label">Tus Compras</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <nav className="main-menu">
          <div className="container">
            <ul>
               <Link to="/productos?categoria=higiene-personal">HIGIENE PERSONAL</Link>
            <Link to="/productos?categoria=cuidado-prendas">CUIDADO DE LAS PRENDAS</Link>
            <Link to="/productos?categoria=limpieza-hogar">LIMPIEZA Y DESINFECCION DEL HOGAR</Link>
              <Link to="/empresa">LA EMPRESA</Link>
             </ul>
          </div>
        </nav>
      </div>

      {/* Versión móvil */}
      <div className="header-mobile">
        <div className="mobile-row">
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          <Link to="/" className="logo">
            <img
              src="https://www.cavallaro.com.py/img/logo-web-blanco.png"
              alt="Cavallaro"
            />
          </Link>
          <Link to="/carrito" className="mobile-cart">
            🛒<span>{cartCount}</span>
          </Link>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <ul>
              {categories.map((cat, i) => (
                <li key={i}>
                  <Link to={`/catalogo/${cat.slug}`}>{cat.name}</Link>
                </li>
              ))}
              <li><Link to="/la-empresa">La Empresa</Link></li>
              <li><Link to="/mapa-de-cobertura">Área de cobertura</Link></li>
              <li><a href="tel:+595215889000">+595 21 588 9000</a></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
