import VenueCardCreatedByHost from "../usersVenue/index.jsx";
import { useVenues } from "../../../context/useVenues";

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
