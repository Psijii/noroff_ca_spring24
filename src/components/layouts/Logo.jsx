import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center">
      <NavLink
        to="/"
        style={{
          fontFamily: "Merriweather, sans-serif",
          color: "white",
          fontSize: "3xl",
          fontWeight: "bold",
        }}
      >
        Holidaze
      </NavLink>
    </div>
  );
};

export default Logo;
