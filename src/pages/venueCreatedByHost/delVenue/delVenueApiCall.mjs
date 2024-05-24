

/**
 * Deletes a venue by its ID.
 * @param {string} id - The ID of the venue to delete.
 * @returns {Promise<Response>} - A promise that resolves to the response of the delete request.
 * @throws {Error} - If an error occurs during the delete request.
 */
import { VENUES_URL } from "../../../constants";
import { authFetch } from "../../../helper/authorization";

console.log("VENUES_URL:", VENUES_URL);

export async function deleteVenue(id) {
  const url = `${VENUES_URL}/${id}`;

  try {
    const response = await authFetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("Delete error", error.message);
    throw error;
  }
}
