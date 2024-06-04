import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-primary mt-auto">
      <div className="container py-4 text-center">
        <div className="flex items-center justify-center text-white font-light text-sm gap-5">
          <Link to="/" className="uppercase">
            privacy policy
          </Link>
          <Link to="/" className="uppercase">
            term of service
          </Link>
          <Link to="/" className="uppercase">
            About Shopi.
          </Link>
        </div>
        <span className="text-white font-light text-sm font-Manrope block mt-3">
          &copy; 2024 Shopi. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
