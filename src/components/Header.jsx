import { NavLink, 
  // useLocation 
} from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/images/logo.svg";

function Header() {
  // const location = useLocation();

  // const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  /* ---------------- Scroll Hide / Show ---------------- */
  useEffect(() => {
    let lastScroll = 0;

    const onScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        setIsHeaderHidden(true);
      } else {
        setIsHeaderHidden(false);
      }

      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- Close nav on route change ---------------- */
  // useEffect(() => {
  //   setIsNavOpen(false);
  // }, [location]);

  return (
    <header
      className={`header ${isHeaderHidden ? "header-up" : "header-down"}`}
    >
      {/* Logo */}
      <div className="header__logo">
        <NavLink to="/">
          <img className="header__logo-image" src={logo} alt="Logo" />
        </NavLink>
      </div>

      {/* Navigation */}
      {/* <nav className={`header__nav ${isNavOpen ? "header__nav--open" : ""}`}>
        <ul className="header__list">
          <li className="header__item">
            <NavLink className="header__link" to="/">
              Home
            </NavLink>
          </li>

          <li className="header__item">
            <NavLink className="header__link" to="/about">
              About
            </NavLink>
          </li>

          <li className="header__item">
            <NavLink className="header__link" to="/blogs">
              Blogs
            </NavLink>
          </li>

          <li className="header__item">
            <NavLink className="header__link" to="/contact">
              Contact Us
            </NavLink>
          </li>

          <li className="header__item">
            <NavLink className="header__link" to="/cart">
              Cart
            </NavLink>
          </li>
        </ul>
      </nav> */}

      {/* Actions */}
      {/* <div className="header__actions">
        <NavLink className="header__contact" to="/login">
          Login
        </NavLink>

        <NavLink className="header__contact" to="/cart">
          Cart
        </NavLink>
      </div> */}

      {/* Burger */}
      {/* <div
        className="header__burger"
        onClick={() => setIsNavOpen((prev) => !prev)}
      >
        <div className="header__burger-lines">
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
        </div>
      </div> */}
    </header>
  );
}

export default Header;
