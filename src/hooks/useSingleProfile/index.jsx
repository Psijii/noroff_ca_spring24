import { useEffect, useState, useMemo } from "react";
import { authFetch } from "../../helper/authorization";
import { PROFILE_URL } from "../../constants";

export function useSingleProfile(name) {
  const url = useMemo(() => {
    return `${PROFILE_URL}${name}?_bookings=true&_venues=true&sortOrder=desc&sort=created`;
  }, [name]);

  const [singleProfile, setSingleProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");

  async function getSingleProfile(fetchUrl) {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await authFetch(fetchUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setSingleProfile(json);
    } catch (error) {
      setIsError(true);
      setErrorDetails(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSingleProfile(url);
  }, [url]);

  return { singleProfile, isLoading, isError, errorDetails };
}

export default useSingleProfile;
