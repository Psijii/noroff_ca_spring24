import { BeatLoader } from "react-spinners";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="#927345" size={15} />
    </div>
  );
};

export default LoadingIndicator;
