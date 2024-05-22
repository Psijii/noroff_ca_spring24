/**
 * Updates the avatar for the user's profile.
 * @param {string} avatarUrl - The URL of the new avatar image.
 * @returns {Promise<Object>} - A promise that resolves to the updated profile JSON object.
 * @throws {Error} - If an error occurs during the update process.
 */
import { PROFILE_URL } from "../../../constants";
import retrieveProfileName from "../../../helper/retrieveProfileName";
import { authFetch } from "../../../helper/authorization";

export async function updateAvatar(avatarUrl) {
  const profileName = retrieveProfileName();
  const url = `${PROFILE_URL}${profileName}/media`;

  try {
    const response = await authFetch(url, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: avatarUrl }),
    });

    if (!response.ok) {
      throw new Error("An error has occured", response.status);
    }

    const json = await response.json();
    console.log("New URL", json);
    localStorage.setItem("profile", JSON.stringify(json));
    return json;
  } catch (error) {
    console.log("Register error", error.message);
    throw error;
  }
}

export default updateAvatar;
