

import { LOGIN_URL } from "../../constants/index.jsx";
import { useAuth } from "../../context/utils.mjs";

const method = "post";

/**
 * Custom hook for logging in a user.
 * @returns {Object} An object containing the logIn function.
 */
export function useLogin() {
  const auth = useAuth();

  /**
   * Logs in a user with the provided credentials.
   * @param {Object} credentials - The user's login credentials.
   * @param {string} credentials.username - The user's username.
   * @param {string} credentials.password - The user's password.
   * @throws {Error} If the login request fails or the credentials are incorrect.
   */
  async function logIn(credentials) {
    try {
      const userToLoginObject = {
        headers: {
          "Content-Type": "application/json",
        },
        method,
        body: JSON.stringify(credentials),
      };

      const response = await fetch(LOGIN_URL, userToLoginObject);

      if (response.ok) {
        const { accessToken, ...profileDetails } = await response.json();

        // Save the token and profile using auth functions
        auth.save("token", accessToken);
        auth.save("profile", profileDetails);
      } else {
        throw new Error("Incorrect username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  return { logIn };
}
