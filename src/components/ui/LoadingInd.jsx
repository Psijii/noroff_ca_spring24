import { BeatLoader } from "react-spinners";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="white" size={15} />
    </div>
  );
};

export default LoadingIndicator;
