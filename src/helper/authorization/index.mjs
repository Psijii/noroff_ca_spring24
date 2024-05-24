

import { load } from "../../storage";

/**
 * Creates an authorization header object with the token loaded from storage.
 * @returns {Object|null} The authorization header object or null if token is not found.
 */
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

/**
 * Performs an authenticated fetch with the provided URL and options.
 * @param {string} url - The URL to fetch.
 * @param {Object} [options={}] - The fetch options.
 * @returns {Promise<Response>} A promise that resolves to the fetch response.
 * @throws {Error} If the authentication token is not available or the network response is not ok.
 */
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
