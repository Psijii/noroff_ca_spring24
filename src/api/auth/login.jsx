import { LOGIN_URL } from "../../constants/index.jsx";
import { useAuth } from "../../context/utils.mjs";

const method = "post";

export function useLogin() {
  const auth = useAuth();

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
