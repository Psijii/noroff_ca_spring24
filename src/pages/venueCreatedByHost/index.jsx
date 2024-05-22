import { useParams } from "react-router-dom";
import { useSpecificVenue } from "../../hooks/useSpecificVenue/Index.jsx";
import SpecificVenueCard from "./SpecificVenueCard.jsx";
import LoadingIndicator from "../../components/ui/LoadingInd.jsx";
import ErrorMessage from "../../components/ui/ErrorMsg.jsx";

const HostSpecificVenue = () => {
  const { id } = useParams();
  console.log("Specifc venue id:", id);

  const { specificVenue, isLoading, isError } = useSpecificVenue(id);
  console.log("specificVenue:", specificVenue);

  if (isLoading || !specificVenue) {
    return (
      <div>
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <ErrorMessage />
      </div>
    );
  }

  return (
    <div className="mt-20">
      <SpecificVenueCard specificVenue={specificVenue} />
    </div>
  );
};

export default HostSpecificVenue;
