import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/authUtils.js";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { getAccessToken, handleLogout } = useAuth();
  const accessToken = getAccessToken();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleNavLinkClick = () => setIsOpen(false);
  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  const linkClasses = "text-white hover:text-gray-300 mb-2 inline-block";
  const buttonClasses =
    "rounded-sm px-3 py-2 inline-block w-20 mb-2 transition ease-out duration-500";

  return (
    <nav className="bg-primary py-4 px-8 fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex space-x-6 font-bold">
          <NavLink to="/" className="text-white hover:underline">
            Home
          </NavLink>
          <NavLink to="/venues" className="text-white hover:underline">
            Venues
          </NavLink>
        </div>
        <div className="hidden md:flex space-x-4">
          {accessToken ? (
            <>
              <NavLink
                to="/profile"
                className={"text-primary bg-white " + buttonClasses}
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogoutClick}
                className={"text-white bg-primary " + buttonClasses}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/logIn"
                className={"text-primary bg-white " + buttonClasses}
              >
                Login
              </NavLink>
              <NavLink
                to="/signUp"
                className={"text-white bg-primary " + buttonClasses}
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
        <button
          onClick={toggleMenu}
          className="text-white hover:text-gray-300 md:hidden"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col mt-2 md:hidden">
          <NavLink to="/" className={linkClasses} onClick={handleNavLinkClick}>
            Home
          </NavLink>
          <NavLink
            to="/venues"
            className={linkClasses}
            onClick={handleNavLinkClick}
          >
            Venues
          </NavLink>
          {!accessToken ? (
            <>
              <NavLink
                to="/logIn"
                className={"text-primary bg-white " + buttonClasses}
                onClick={handleNavLinkClick}
              >
                Login
              </NavLink>
              <NavLink
                to="/signUp"
                className={"text-white bg-primary " + buttonClasses}
                onClick={handleNavLinkClick}
              >
                Signup
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                className={"text-primary bg-white " + buttonClasses}
                onClick={handleNavLinkClick}
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogoutClick}
                className={"text-white bg-primary " + buttonClasses}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
