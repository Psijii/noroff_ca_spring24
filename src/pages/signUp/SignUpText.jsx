

/**
 * Component for displaying a sign-up text with an image and a call-to-action button.
 * @component
 */
import { NavLink } from "react-router-dom";
import CardImage from "/src/assets/images/card-image.jpg";

const TextSignUp = () => {
  return (
    <div className="bg-white shadow-md rounded-sm overflow-hidden mx-auto max-w-xl">
      <img src={CardImage} alt="Image of a venue" className="w-full h-auto" />
      <div className="p-4">
        <h1 className="text-3xl font-heading mb-2">Holidaze</h1>
        <p className="text-gray-600 font-paragraph">
          Sign up to book your next holiday or to list your venue for others to
          book. It is free and easy to get started.
        </p>
        <NavLink
          to="/venues"
          className="bg-secondary text-white px-4 py-2 mt-4 inline-block hover:bg-secondary-lighter rounded-sm"
        >
          Explore venues
        </NavLink>
      </div>
    </div>
  );
};

export default TextSignUp;
