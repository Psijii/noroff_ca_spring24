import { load } from "../../storage";

export function createAuthHeader() {
  const token = load("token");
  if (!token) {
    console.error("No token found - ensure user is logged in.");
    return null;
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export function authFetch(url, options = {}) {
  const headers = createAuthHeader();
  if (!headers) {
    return Promise.reject(new Error("Failed to get authentication token."));
  }

  const mergedOptions = {
    ...options,
    headers: {
      ...options.headers,
      ...headers,
    },
  };

  return fetch(url, mergedOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response;
    })
    .catch((error) => {
      console.error("Authenticated fetch failed:", error);
      throw error;
    });
}
