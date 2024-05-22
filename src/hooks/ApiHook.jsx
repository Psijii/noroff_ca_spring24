import { useState, useEffect } from "react";

const useApi = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

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
