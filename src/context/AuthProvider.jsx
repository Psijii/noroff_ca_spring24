

/**
 * @file Provides authentication context for the application.
 * @module AuthProvider
 */

import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

/**
 * Context object for authentication.
 * @type {object}
 * @property {Function} save - Saves a value to local storage.
 * @property {Function} load - Loads a value from local storage.
 * @property {Function} remove - Removes a value from local storage.
 * @property {Function} clear - Clears all values from local storage.
 * @property {Function} isLogged - Checks if the user is logged in.
 * @property {Function} getAccessToken - Retrieves the access token from local storage.
 * @property {Function} getProfile - Retrieves the user profile.
 * @property {Function} getProfileName - Retrieves the user profile name.
 * @property {Function} handleLogout - Handles the logout process.
 */
const AuthContext = createContext();

/**
 * Provides authentication context for the application.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered component.
 */
export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);

  /**
   * Retrieves the user profile.
   * @returns {object} The user profile.
   */
  function getProfile() {
    return profile;
  }

  /**
   * Saves a value to local storage.
   * @param {string} key - The key to save the value under.
   * @param {*} value - The value to save.
   */
  function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Loads a value from local storage.
   * @param {string} key - The key to load the value from.
   * @returns {*} The loaded value.
   */
  function load(key) {
    try {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
    } catch (error) {
      console.log("Error loading from local storage", error);
      return null;
    }
  }

  /**
   * Removes a value from local storage.
   * @param {string} key - The key to remove the value from.
   */
  function remove(key) {
    localStorage.removeItem(key);
  }

  /**
   * Clears all values from local storage.
   */
  function clear() {
    localStorage.clear();
  }

  /**
   * Checks if the user is logged in.
   * @returns {boolean} True if the user is logged in, false otherwise.
   */
  function isLogged() {
    return !!load("token");
  }

  /**
   * Retrieves the access token from local storage.
   * @returns {string|null} The access token, or null if not found.
   */
  function getAccessToken() {
    return load("token");
  }

  /**
   * Retrieves the user profile name.
   * @returns {string|null} The user profile name, or null if not found.
   */
  function getProfileName() {
    const userProfile = load("profile");
    return userProfile ? userProfile.name : null;
  }

  useEffect(() => {
    const storedProfile = load("profile");
    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);

  /**
   * Handles the logout process.
   */
  function handleLogout() {
    clear();
    window.location.href = "/";
  }

  return (
    <AuthContext.Provider
      value={{
        save,
        load,
        remove,
        clear,
        isLogged,
        getAccessToken,
        getProfile,
        getProfileName,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
