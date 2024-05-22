import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);

  function getProfile() {
    return profile;
  }

  function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function load(key) {
    try {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
    } catch (error) {
      console.log("Error loading from local storage", error);
      return null;
    }
  }

  function remove(key) {
    localStorage.removeItem(key);
  }

  function clear() {
    localStorage.clear();
  }

  function isLogged() {
    return !!load("token");
  }

  function getAccessToken() {
    return load("token");
  }

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
