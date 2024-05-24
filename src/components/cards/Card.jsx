

/**
 * Card component represents a card displaying information about a venue.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.venue - The venue object containing information about the venue.
 * @param {string} props.venue.id - The unique identifier of the venue.
 * @param {string} props.venue.name - The name of the venue.
 * @param {number} props.venue.price - The price of the venue per night.
 * @param {Object} props.venue.location - The location object containing address, city, and country information.
 * @param {string} props.venue.location.address - The address of the venue.
 * @param {string} props.venue.location.city - The city of the venue.
 * @param {string} props.venue.location.country - The country of the venue.
 * @param {string[]} props.venue.media - An array of media URLs associated with the venue.
 * @param {Object} props.venue.meta - The meta object containing information about the venue (e.g., wifi, parking, breakfast, pets).
 * @param {boolean} props.venue.meta.wifi - Indicates if wifi is available at the venue.
 * @param {boolean} props.venue.meta.parking - Indicates if parking is available at the venue.
 * @param {boolean} props.venue.meta.breakfast - Indicates if breakfast is available at the venue.
 * @param {boolean} props.venue.meta.pets - Indicates if pets are allowed at the venue.
 * @returns {JSX.Element} The rendered Card component.
 */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MediaComponent from "/src/components/ui/MediaComp.jsx";
import MetaIcons from "/src/components/ui/MetaIcons.jsx";

const Card = ({ venue }) => {
  const { id, name, price, location, media, meta } = venue;

  return (
    <Link
      to={`/Venues/${id}`}
      className="container mx-auto mt-8 w-80 h-full"
      aria-label={`View details about ${name}`}
    >
      <div className="max-w-sm rounded-sm overflow-hidden shadow-md bg-tertiary transition duration-300 flex flex-col h-full">
        <MediaComponent media={media} name={name} />

        <div className="px-6 py-4 flex-grow">
          <h5
            className="font-bold text-xl mb-2"
            style={{ textTransform: "uppercase" }}
          >
            {name}
          </h5>

          <p className="text-gray-700 mb-4 border-b-2 border-gray-200">
            {`${location.address}, ${location.city}, ${location.country}`}
          </p>
          <div className="mt-10">
            <MetaIcons meta={meta} />
          </div>
        </div>
        <div className="px-6 pt-4 pb-2 flex items-center justify-end">
          <div className="text-xl font-semibold">NOK {price} per night.</div>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    location: PropTypes.shape({
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    media: PropTypes.arrayOf(PropTypes.string).isRequired,
    meta: PropTypes.shape({
      wifi: PropTypes.bool.isRequired,
      parking: PropTypes.bool.isRequired,
      breakfast: PropTypes.bool.isRequired,
      pets: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Card;
