

/**
 * Error message component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.message - The error message to display.
 * @returns {JSX.Element} - The rendered error message component.
 */
import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => {
  return (
    <div
      className="container max-w-sm mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mt-10 flex justify-center items-center"
      role="alert"
      aria-live="assertive"
    >
      {message}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
