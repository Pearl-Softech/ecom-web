import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="text-white pt-5 pb-4 mt-5" style={{ backgroundColor: "#24cfa6" }}>
      <div className="container">
        <div className="row">

          {/* Column 1 - About Us */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold text-dark mb-3">About Us</h5>
            <p className="text-black">
              Your ECOM is a leading e-commerce platform providing high-quality products at the best prices. We value trust, quality, and customer satisfaction.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold text-dark mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/about" className="text-black text-decoration-none d-block hover-opacity">
                  <i className="bi bi-info-circle me-2"></i> About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-black text-decoration-none d-block">
                  <i className="bi bi-envelope me-2"></i> Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="text-black text-decoration-none d-block">
                  <i className="bi bi-question-circle me-2"></i> FAQ
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-black text-decoration-none d-block">
                  <i className="bi bi-file-earmark-text me-2"></i> Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Customer Service */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold text-dark mb-3">Customer Service</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/shipping" className="text-black text-decoration-none d-block">
                  <i className="bi bi-truck me-2"></i> Shipping Info
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/returns" className="text-black text-decoration-none d-block">
                  <i className="bi bi-arrow-return-left me-2"></i> Returns & Exchanges
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/support" className="text-black text-decoration-none d-block">
                  <i className="bi bi-headset me-2"></i> Support
                </Link>
              </li>
              <li className="mb-2 text-black">
                <i className="bi bi-telephone me-2"></i> +1 (800) 123-4567
              </li>
              <li className="mb-2 text-black">
                <i className="bi bi-envelope-open me-2"></i> support@yourecom.com
              </li>
            </ul>
          </div>

          {/* Column 4 - Follow Us */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold text-dark mb-3">Follow Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="https://www.facebook.com" className="text-black text-decoration-none d-block" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-facebook me-2"></i> Facebook
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.instagram.com" className="text-black text-decoration-none d-block" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-instagram me-2"></i> Instagram
                </a>
              </li>
              <li className="mb-2">
                <a href="https://twitter.com" className="text-black text-decoration-none d-block" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-twitter me-2"></i> Twitter
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="row mt-4">
          <div className="col text-center">
            <hr className="border-dark" />
            <p className="text-dark mb-0">&copy; {new Date().getFullYear()} ECOM. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
