import { VENUES_URL } from "../../../constants/Index";
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
