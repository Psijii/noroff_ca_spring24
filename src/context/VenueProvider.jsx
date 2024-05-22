//eslint-disable-next-line
import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const VenueContext = createContext({
  venues: [],
  addVenue: () => {},
  updateVenue: () => {},
  deleteVenue: () => {},
  setAllVenues: () => {},
});

export const VenueProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);

  const addVenue = (venue) => {
    setVenues((prevVenues) => [...prevVenues, venue]);
  };

  const updateVenue = (id, updatedVenue) => {
    setVenues((prevVenues) =>
      prevVenues.map((venue) => (venue.id === id ? updatedVenue : venue))
    );
  };

  const deleteVenue = (id) => {
    setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== id));
  };

  const setAllVenues = (newVenues) => {
    setVenues(newVenues);
  };

  return (
    <VenueContext.Provider
      value={{ venues, addVenue, updateVenue, deleteVenue, setAllVenues }}
    >
      {children}
    </VenueContext.Provider>
  );
};

VenueProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
