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
