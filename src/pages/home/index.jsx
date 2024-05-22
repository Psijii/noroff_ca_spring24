import HeroBanner from "./banner/Index";
import AllVenues from "../venues/AllVenues";

const HomePage = () => {
  return (
    <>
      <div className="mx-auto mt-10 md:mt-32 max-w-7xl">
        <HeroBanner />
        <AllVenues />
      </div>
    </>
  );
};

export default HomePage;
