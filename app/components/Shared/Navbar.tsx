import {Link} from 'react-router';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="text-gradient font-bold text-2xl">
        CareerScan
      </Link>
      <Link to="/upload" className="primary-button w-fit">
        Upload Resume
      </Link>
    </div>
  );
};

export default Navbar;
