import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  SiVisa,
  SiMastercard,
  SiPaypal,
  SiApplepay,
  SiGooglepay,
} from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row gy-4">
          {/* ===== Column 1 - About ===== */}
          <div className="col-md-3">
            <h5 className="fw-bold text-white mb-3">E-Shop</h5>
            <p className="small text-secondary">
              Discover top-quality products, unbeatable deals, and fast delivery
              — all in one place!
            </p>
            <div className="d-flex gap-3 fs-5">
              <FaFacebookF className="text-primary" />
              <FaInstagram className="text-danger" />
              <FaTwitter className="text-info" />
              <FaYoutube className="text-danger" />
              <FaLinkedinIn className="text-primary" />
            </div>
          </div>

          {/* ===== Column 2 - Customer Service ===== */}
          <div className="col-md-3">
            <h6 className="fw-bold text-white mb-3">Customer Service</h6>
            <ul className="list-unstyled text-secondary small">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-secondary">
                  Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-secondary">
                  Track Order
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-secondary">
                  Returns
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-secondary">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* ===== Column 3 - Company Info ===== */}
          <div className="col-md-3">
            <h6 className="fw-bold text-white mb-3">Company</h6>
            <ul className="list-unstyled text-secondary small">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-secondary">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-secondary">
                  Careers
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-secondary">
                  Contact
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-secondary">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* ===== Column 4 - Newsletter & Payment ===== */}
          <div className="col-md-3">
            <h6 className="fw-bold text-white mb-3">Stay Updated</h6>
            <p className="small text-secondary">
              Subscribe to our newsletter for the latest offers!
            </p>
            <form className="d-flex mb-3">
              <input
                type="email"
                className="form-control form-control-sm me-2"
                placeholder="Enter your email"
              />
              <button className="btn btn-sm btn-primary">Join</button>
            </form>

            <p className="small text-secondary mb-2">We Accept:</p>
            <div className="d-flex gap-3 fs-3">
              <SiVisa className="text-primary" />
              <SiMastercard className="text-danger" />
              <SiPaypal className="text-info" />
              <SiApplepay className="text-light" />
              <SiGooglepay className="text-success" />
            </div>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        {/* ===== Bottom Bar ===== */}
        <div className="text-center text-secondary small">
          © {new Date().getFullYear()} E-Shop — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
