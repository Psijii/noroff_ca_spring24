/**
 * Creates a new venue.
 * @param {Object} formData - The data of the venue to be created.
 * @returns {Promise<Object>} - A promise that resolves to the created venue data.
 * @throws {Error} - If there is an error creating the venue.
 */
import { VENUES_URL } from "../../../constants/Index";
import { authFetch } from "../../../helper/authorization";

export async function createVenue(formData) {
  //eslint-disable-next-line
  const accessToken = localStorage.getItem("token");

  const url = `${VENUES_URL}`;

  try {
    const response = await authFetch(url, {
      method: "POST",

      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorMessage = `Failed to create venue. Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Create venue error", error.message);
    throw error;
  }
}
