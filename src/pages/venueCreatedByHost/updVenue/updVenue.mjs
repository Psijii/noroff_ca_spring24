

/**
 * Updates a venue with the provided form data.
 * @param {Object} formData - The form data to update the venue with.
 * @param {string} id - The ID of the venue to update.
 * @returns {Promise<Object>} - A promise that resolves to the updated venue object.
 * @throws {Error} - If an error occurs during the update process.
 */
import { VENUES_URL } from "../../../constants";
import { authFetch } from "../../../helper/authorization";

export async function updateVenue(formData, id) {
  const url = `${VENUES_URL}/${id}`;

  try {
    const response = await authFetch(url, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("An error has occured", response.status);
    }

    const updatedVenue = await response.json();

    return updatedVenue;
  } catch (error) {
    console.log("Register error", error.message);
    throw error;
  }
}
