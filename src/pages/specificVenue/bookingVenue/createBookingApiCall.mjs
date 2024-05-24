

/**
 * Creates a booking by sending a POST request to the server.
 * @param {Object} formData - The data for the booking.
 * @returns {Promise<Object>} - A promise that resolves to the created booking data.
 * @throws {Error} - If there is an error creating the booking.
 */
import { BASE_URL } from "../../../constants";
import { authFetch } from "../../../helper/authorization";

export async function createBooking(formData) {
  console.log("Sending booking data:", formData);
  const endpoint = "/bookings";
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await authFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorMessage = `Failed to create booking. Status: ${response.status}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Booking created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error while creating booking:", error.message);
    throw new Error("Error creating booking: " + error.message);
  }
}
