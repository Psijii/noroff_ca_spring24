/*eslint-disable */
import { useState, useEffect } from "react";
import { FaWifi, FaUtensils, FaPaw, FaCar } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BookingForm from "./bookingVenue/BookingForm";
import { load } from "../../storage/index.mjs";
import Breadcrumb from "../../components/ui/Breadcrumb";
import NoImage from "/src/assets/images/no-image.jpg";
import NoAvatar from "/src/assets/images/no-avatar.png";

const VenueDetails = ({ venue }) => {
  const {
    id,
    description,
    maxGuests,
    name,
    media,
    price,
    location,
    meta,
    owner,
    rating,
    bookings,
  } = venue;

  const token = load("token");
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setisUserLoggedIn(true);
    }
  }, [token]);

  let paths;
  if (name) {
    paths = [
      { name: "Home", path: "/" },
      { name: "Venues", path: "/venues" },
      {
        name: name.length > 20 ? name.substring(0, 20) + ".." : name,
        path: `/venues/${id}`,
      },
    ];
  } else {
    paths = [
      { name: "Home", path: "/" },
      { name: "Venues", path: "/venues" },
      { name: "Venue Details", path: `/venues/${id}` },
    ];
  }

  // Function to render media
  let mediaItems;
  if (media.length === 0) {
    mediaItems = (
      <div>
        <img
          className="object-cover mx-auto h-80 rounded-sm"
          src={NoImage}
          alt={name}
        />
      </div>
    );
  } else {
    mediaItems = media.map((imageUrl, index) => (
      <div key={`media-${index}`}>
        <img
          className="object-cover mx-auto h-80 rounded-sm"
          src={imageUrl}
          alt={name}
        />
      </div>
    ));
  }

  const ownerAvatar = owner.avatar ? owner.avatar : NoAvatar;

  return (
    <div key={id}>
      <Breadcrumb paths={paths} />
      <div className="container max-w-5xl mx-auto px-4 py-4">
        <Carousel showStatus={false} showThumbs={false}>
          {mediaItems}
        </Carousel>
      </div>
      <div className="container mx-auto px-4 py-4 border shadow-md md:flex md:flex-row justify-between mt-4">
        <div className="w-full md:w-1/2 px-6 py-4 border border-b-gray-200">
          <div className="mt-4 ">
            <h2 className="font-bold text-3xl mb-2 ">{name.toUpperCase()}</h2>
            <h6 className="font-bold text-xl text-primary mb-2">
              Price:{price} NOK per night.
            </h6>
            <p className="text-lg font-semibold text-gray-700 ">
              Max guests: {maxGuests}
            </p>
          </div>
          <div className="mt-4">
            <h2 className="font-bold text-xl mt-4">Description</h2>
            <p>{description}</p>
          </div>
          <div className="mb-4">
            <h2 className="font-bold text-xl mt-4">Address</h2>
            <p className="text-gray-700 text-lg">Address: {location.address}</p>
            <p className="text-gray-700">City: {location.city}</p>
            <p className="text-gray-700">Country: {location.country}</p>
            <p className="text-gray-700">Continent: {location.continent}</p>
          </div>

          <h2 className="font-bold text-xl mt-4">Info</h2>
          <div className="flex gap-6 my-4 justify-start mt-4">
            {meta.breakfast ? (
              <div>
                <FaUtensils />
                <p>Breakfast</p>
              </div>
            ) : null}

            {meta.wifi ? (
              <div>
                {" "}
                <FaWifi />
                <p>Wi-Fi</p>
              </div>
            ) : null}

            {meta.pets ? (
              <div>
                {" "}
                <FaPaw />
                <p>Pets</p>{" "}
              </div>
            ) : null}

            {meta.parking ? (
              <div>
                <FaCar />
                <p>Parking</p>
              </div>
            ) : null}
          </div>
          <div>
            <h2 className="font-bold text-xl mt-6">Your host:</h2>
            <div className="mt-4">
              <img
                src={ownerAvatar}
                alt={owner.name}
                className="w-16 h-16 rounded-full"
              />
              <p className="mt-2 text-gray-700">Name: {owner.name}</p>
              <p className="mt-2 text-gray-700">Email: {owner.email}</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 px-6 py-4 border border-b-gray-200">
          <h2 className="font-bold text-xl text-center border-b-4 border-primary py-4">
            Book the venue.
          </h2>
          {isUserLoggedIn ? (
            <BookingForm price={price} maxGuests={maxGuests} venueId={id} />
          ) : (
            <p className="text-center text-lg font-semibold mt-10 text-secondary">
              Please login to book the venue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
