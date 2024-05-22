import AllVenues from "./AllVenues";
import Breadcrumb from "../../components/ui/Breadcrumb";

const VenuesPage = () => {
  const paths = [
    { name: "Home", path: "/" },
    { name: "Venues", path: "/venues" },
  ];

  return (
    <div className="mx-auto mt-40 max-w-7xl">
      <Breadcrumb paths={paths} />
      <AllVenues />
    </div>
  );
};

export default VenuesPage;
