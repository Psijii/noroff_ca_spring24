

import { useState, useEffect } from "react";

/**
 * Custom hook for making API requests.
 * @param {string} url - The URL of the API endpoint.
 * @returns {object} - An object containing the API response data, loading state, error state, and error message.
 */
const useApi = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    /**
     * Fetches data from the API endpoint.
     */
    async function fetchData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(url, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error(
            `API request failed with status ${response.status}: ${response.statusText}`
          );
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        if (error.name !== "AbortError") {
          setIsError(true);
          setErrorMessage(error.message || "Unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isLoading, isError, errorMessage };
};

export default useApi;
