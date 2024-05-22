import { FaUtensils, FaWifi, FaPaw, FaCar } from "react-icons/fa";
import PropTypes from "prop-types";

const IconInfo = ({ icon: Icon, label }) => (
  <div className="flex flex-col items-center">
    <Icon aria-label={label} />
    <p>{label}</p>
  </div>
);

IconInfo.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
};

const MetaIcons = ({ meta }) => {
  const amenities = [
    { condition: meta.breakfast, icon: FaUtensils, label: "Breakfast" },
    { condition: meta.wifi, icon: FaWifi, label: "Wi-Fi" },
    { condition: meta.pets, icon: FaPaw, label: "Pets" },
    { condition: meta.parking, icon: FaCar, label: "Parking" },
  ];

  return (
    <div className="flex gap-6">
      {amenities.map(
        (amenity, index) =>
          amenity.condition && (
            <IconInfo key={index} icon={amenity.icon} label={amenity.label} />
          )
      )}
    </div>
  );
};

MetaIcons.propTypes = {
  meta: PropTypes.shape({
    breakfast: PropTypes.bool,
    wifi: PropTypes.bool,
    pets: PropTypes.bool,
    parking: PropTypes.bool,
  }).isRequired,
};

export default MetaIcons;
