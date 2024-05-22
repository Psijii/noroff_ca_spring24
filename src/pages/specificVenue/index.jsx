import { useParams } from "react-router-dom";
import ApiHook from "../../hooks/ApiHook";
import { VENUES_URL } from "../../constants/index";
import VenueDetails from "./VenueDetails";
import LoadingIndicator from "../../components/ui/LoadingIndicator";
import ErrorMessage from "../../components/ui/ErrorMessage";

const qs = "?_owner=true&_bookings=true";

const SpecificVenue = () => {
  const { id } = useParams();

  const {
    data: venue,
    isLoading,
    isError,
  } = ApiHook(`${VENUES_URL}/${id}${qs}`);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorMessage message={isError} />;
  }

  return (
    <div className="mt-20">
      <VenueDetails venue={venue} />
    </div>
  );
};

export default SpecificVenue;
