/**
 * Component for displaying user profile information.
 *
 * @component
 * @param {Object} profile - The user profile object.
 * @param {string} profile.name - The name of the user.
 * @param {string} profile.avatar - The URL of the user's avatar image.
 * @param {string} profile.email - The email address of the user.
 * @param {boolean} profile.venueManager - Indicates if the user is a venue manager.
 * @param {Array} profile.bookings - An array of booking objects.
 * @param {number|string} profile.bookings.id - The ID of the booking.
 * @param {string} profile.bookings.created - The creation date of the booking.
 * @param {string} profile.bookings.dateFrom - The start date of the booking.
 * @param {string} profile.bookings.dateTo - The end date of the booking.
 * @param {number} profile.bookings.guests - The number of guests for the booking.
 * @param {Object} profile.bookings.venue - The venue object for the booking.
 * @param {string} profile.bookings.venue.name - The name of the venue.
 * @param {Array} profile.venues - An array of venues created by the user.
 *
 * @returns {JSX.Element} The rendered user profile component.
 */
/* eslint-disable */

import PropTypes from "prop-types";
import AvatarModal from "../avatar/AvatarModal";
import { useState } from "react";
import BookingVenueCard from "../userBookings/Index";
import UserVenues from "../userVenues/Index";
import CreateVenueForm from "../createVenue/CreateVenueForm";
import noAvatarImage from "/src/assets/images/no-avatar.png";
import BreadCrumb from "../../../components/ui/Breadcrumb";
import { useVenues } from "../../../context/useVenues";

const DisplayProfile = ({ profile }) => {
  const { name, avatar, email, venueManager, bookings, venues } = profile;
  const [activeTab, setActiveTab] = useState("bookings");

  const { setAllVenues } = useVenues();

  setAllVenues(venues);

  const newAvatar = avatar ? avatar : noAvatarImage;

  const paths = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <>
      <BreadCrumb paths={paths} />
      {/* profile info */}
      <div className="container mx-auto px-10 py-10 max-w-2xl bg-white rounded-sm shadow-sm">
        <div className="flex flex-col items-center md:flex-row md:justify-center gap-10 md:space-x-4">
          <img
            src={newAvatar}
            alt={name}
            className="rounded-full w-32 h-32 md:w-50 md:h-50"
          />
          <div className="mt-4 md:mt-0">
            <h1 className="text-2xl font-bold">{name}</h1>
            <div>
              <p className="font-customFont text-lg">{email}</p>
              <p>Account Type: {venueManager ? "Venue Manager" : "Guest"}</p>
            </div>
            <AvatarModal />
          </div>
        </div>
      </div>
      {/* tab start */}
      <div className="container mx-auto mt-20">
        {venueManager ? (
          <div className="flex-col md:flex md:flex-row justify-between items-center max-w-sm mx-auto md:max-w-xl px-4 py-4">
            <div
              className={`border border-secondary-500 px-4 py-4 cursor-pointer ${
                activeTab === "bookings"
                  ? "bg-secondary-lighter text-white"
                  : "bg-white text-secondary"
              }`}
              onClick={() => setActiveTab("bookings")}
            >
              <h4 className="text-2xl font-semibold text-center">
                Your bookings
              </h4>
            </div>
            <div
              className={`border border-secondary-200 px-4 py-4  cursor-pointer ${
                activeTab === "venues"
                  ? "bg-secondary-lighter text-white"
                  : "bg-white text-secondary"
              }`}
              onClick={() => setActiveTab("venues")}
            >
              <h4 className="text-2xl font-semibold text-center">
                Your venues
              </h4>
            </div>
            <div
              className={`border border-secondary-500 px-4 py-4 cursor-pointer ${
                activeTab === "createVenue"
                  ? "bg-secondary-lighter text-white"
                  : "bg-white text-secondary"
              }`}
              onClick={() => setActiveTab("createVenue")}
            >
              <h4 className="text-2xl font-semibold text-center">
                Add a new venue
              </h4>
            </div>
          </div>
        ) : (
          <div className="flex-col md:flex md:flex-row justify-between items-center max-w-sm mx-auto md:max-w-lg px-4 py-4 ">
            <div
              className={`flex-grow px-4 py-4 cursor-pointer ${
                activeTab === "bookings"
                  ? "bg-secondary-lighter text-white"
                  : "bg-white text-secondary"
              }`}
              onClick={() => setActiveTab("bookings")}
            >
              <h3 className="text-xl font-customFont text-center">
                Your Upcoming Bookings
              </h3>
            </div>
          </div>
        )}
        {/* tab end */}
        {/* render booking, rented venues, create venue form */}
        {activeTab === "bookings" && (
          <div className="container mx-auto px-10 py-10 max-w-2xl bg-gray-100 rounded-sm shadow-sm mt-10">
            <h1 className="text-center text-xl md:text-2xl bg-gray-200 py-2 rounded-sm">
              Upcoming booking(s).
            </h1>
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                <BookingVenueCard key={booking.id} booking={booking} />
              ))
            ) : (
              <p className="text-xl text-center py-10 text-secondary">
                No booking(s) yet.
              </p>
            )}
          </div>
        )}
        {activeTab === "venues" && (
          <div className="container max-w-4xl mx-auto px-4 py-4 bg-gray-200 rounded-sm shadow-sm mt-10">
            <h1 className="text-center text-xl md:text-2xl bg-white py-4 rounded-sm max-w-xl mx-auto my-4">
              {venues && venues.length > 0
                ? `All venues created by ${name}`
                : `Hi ! ${name},  you have not created any venues yet`}
            </h1>
            {venues && venues.length > 0 ? <UserVenues /> : null}
          </div>
        )}
        {activeTab === "createVenue" && (
          <div className="container max-lg mx-auto px-4">
            {<CreateVenueForm />}
          </div>
        )}
      </div>
    </>
  );
};

DisplayProfile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    venueManager: PropTypes.bool.isRequired,
    bookings: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        created: PropTypes.string.isRequired,
        dateFrom: PropTypes.string.isRequired,
        dateTo: PropTypes.string.isRequired,
        guests: PropTypes.number.isRequired,
        venue: PropTypes.shape({
          name: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
};

export default DisplayProfile;
