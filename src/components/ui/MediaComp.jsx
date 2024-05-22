import PropTypes from "prop-types";
import NoImage from "/src/assets/images/no-image.jpg";

const MediaComponent = ({ media, name }) => {
  const imageUrl = media.length > 0 ? media[0] : NoImage;
  const imageDescription = media.length > 0 ? name : "No image available.";

  return (
    <div>
      <img
        className="w-full h-auto md:h-64 object-cover"
        src={imageUrl}
        alt={imageDescription}
      />
    </div>
  );
};

MediaComponent.propTypes = {
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
};

export default MediaComponent;
