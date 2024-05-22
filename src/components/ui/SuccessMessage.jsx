import PropTypes from "prop-types";

const SuccessMessage = ({ message = "Operation successful!" }) => {
  return (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
      role="alert"
    >
      {message}
    </div>
  );
};

SuccessMessage.propTypes = {
  message: PropTypes.string,
};

export default SuccessMessage;
