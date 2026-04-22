import { NavLink } from "react-router-dom";

function Footer() {

  return (
    <footer className="footer">
      <div className="footer-columns">
        <div>
          <h4>Shop</h4>
          {/* <NavLink to="/men">Men</NavLink>
          <NavLink to="/women">Women</NavLink>
          <NavLink to="/kids">Kids</NavLink> */}
        </div>

        <div>
          <h4>Company</h4>
          {/* <NavLink to="/about">About</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact</NavLink> */}
        </div>

        <div>
          <h4>Support</h4>
          {/* <NavLink to="/contact-info">Contact Info</NavLink>
          <NavLink to="/shipping">Shipping</NavLink> */}
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Ember. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
