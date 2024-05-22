/*eslint-disable react/prop-types*/

import { FaMapMarkerAlt, FaCalendar, FaMoneyBill } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import NoImage from "/src/assets/images/no-image.jpg";

const imageNotAvailable = "Image not available";

function VenueCardCreatedByHost({ userVenue }) {
  const { id, name, created, location, maxGuests, media, price } = userVenue;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const imageSrc = media && media.length > 0 ? media[0] : NoImage;
  const altText = media && media.length > 0 ? name : imageNotAvailable;

  return (
    <Link
      to={`/venueCreatedByHost/${id}`}
      className="container max-w-xl mx-auto bg-white px-2 py-2 my-10 rounded-sm overflow-hidden shadow-md md:flex md:flex-row md:gap-10 justify-between items-center"
    >
      <div className="md:w-1/2">
        <img
          className="w-full h-48 object-cover rounded-sm shadow-sm mb-4 md:mb-0"
          src={imageSrc}
          alt={altText}
        />
      </div>
      <div className="p-4 md:w-1/2">
        <h2 className="font-semibold mb-2">{name}</h2>
        <div className="flex items-center gap-4 text-sm mb-2 text-gray-600">
          <FaMapMarkerAlt />
          {location.city}, {location.country}
        </div>
        <div className="flex items-center gap-4 text-sm mb-2 text-gray-600">
          <BsPeopleFill /> {maxGuests}
        </div>
        <div className="flex items-center gap-4 text-sm mb-2 text-gray-600">
          <FaMoneyBill />
          {price}
        </div>
        <div className="flex items-center gap-4 text-sm mb-2 text-gray-600">
          <FaCalendar />
          Created: {formatDate(created)}
        </div>
      </div>
    </Link>
  );
}

export default VenueCardCreatedByHost;
