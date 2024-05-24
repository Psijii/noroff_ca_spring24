


/**
 * Sends a sign-up request to the server.
 *
 * @param {Object} formData - The form data containing the user's sign-up information.
 * @returns {Promise<Object>} - A promise that resolves to the response data from the server.
 * @throws {Error} - If an error occurs during the sign-up process.
 */
import { REGISTER_URL } from "../../constants";

export async function signUp(formData) {
  try {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error(
            "Unauthorized: Please check your credentials and try again."
          );
        case 404:
          throw new Error("Resource not found. Please try again later.");
        default:
          throw new Error("An error has occurred. Please try again later.");
      }
    }
    return response.json();
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    throw error;
  }
}
