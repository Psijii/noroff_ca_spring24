import useSingleProfile from "../../hooks/useSingleProfile/index.jsx";
import retrieveProfileName from "../../helper/retrieveProfileName";
import DisplayProfile from "./displayUserProfile/index.jsx";
import LoadingIndicator from "../../components/ui/LoadingInd.jsx";
import ErrorMessage from "../../components/ui/ErrorMsg.jsx";

const ProfilePage = () => {
  const profileName = retrieveProfileName();

  const { singleProfile, isLoading, isError } = useSingleProfile(profileName);

  if (isLoading)
    return (
      <div>
        <LoadingIndicator />
      </div>
    );

  if (isError)
    return (
      <ErrorMessage message="An error occurred while fetching data. Please try again later." />
    );

  return (
    <>
      <div className="mt-20">
        {" "}
        <DisplayProfile profile={singleProfile} />
      </div>
    </>
  );
};

export default ProfilePage;
