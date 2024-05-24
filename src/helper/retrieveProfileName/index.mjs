

/**
 * Retrieves the profile name from the stored profile data.
 * @returns {string} The profile name.
 */
import { load } from "../../storage/index.mjs";

export const retrieveProfileName = () => {
  const profileData = load("profile");
  console.log("stored profile data", profileData);
  const profileName = profileData.name;
  console.log("stored profile name", profileName);
  return profileName;
};

export default retrieveProfileName;
