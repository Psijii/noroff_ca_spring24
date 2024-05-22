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
