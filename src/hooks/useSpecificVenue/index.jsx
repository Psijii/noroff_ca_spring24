import { useEffect, useState, useMemo } from "react";
import { VENUES_URL } from "../../constants";

export function useSpecificVenue(id) {
  const url = useMemo(
    () => `${VENUES_URL}/${id}?_bookings=true&_customer=true`,
    [id]
  );

  const [specificVenue, setSpecificVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function getSpecificVenue(fetchUrl) {
    const controller = new AbortController();
    try {
      setIsLoading(true);
      setIsError(false);

      const response = await fetch(fetchUrl, { signal: controller.signal });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setSpecificVenue({ ...json, bookings: json.bookings });
    } catch (error) {
      if (error.name !== "AbortError") {
        setIsError(true);
        setErrorMessage(
          error.message ||
            "An unexpected error occurred while fetching venue details."
        );
      }
    } finally {
      setIsLoading(false);
    }
    return () => controller.abort();
  }

  useEffect(() => {
    getSpecificVenue(url);
  }, [url]);

  return { specificVenue, isLoading, isError, errorMessage };
}

export default useSpecificVenue;
