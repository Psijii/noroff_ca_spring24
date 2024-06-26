

/**
 * Renders a list of venues created by the user.
 * @returns {JSX.Element} The rendered UserVenues component.
 */
import VenueCardCreatedByHost from "../usersVenue/index.jsx";
import { useVenues } from "../../../context/useVenues.jsx";

export default function UserVenues() {
  const { venues } = useVenues();

  if (!venues || venues.length === 0) {
    return <p>No venues available.</p>;
  }

  return (
    <div>
      {" "}
      {<></>}
      {venues.map((venue) => (
        <VenueCardCreatedByHost userVenue={venue} key={venue.id} />
      ))}
    </div>
  );
}
