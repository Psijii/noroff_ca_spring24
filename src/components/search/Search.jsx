

import { useState } from "react";
import PropTypes from "prop-types";
import { BsSearch, BsXCircleFill } from "react-icons/bs";

/**
 * SearchVenues component for searching venues.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onSearch - The function to be called when searching.
 * @returns {JSX.Element} - The rendered component.
 */
const SearchVenues = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  /**
   * Handles the search input change.
   *
   * @param {Object} e - The event object.
   */
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    onSearch(searchTerm);
  };

  /**
   * Handles clearing the search input.
   */
  const handleClearSearch = () => {
    setSearch("");
    onSearch("");
  };

  return (
    <div className="container max-w-7xl mx-auto mt-10">
      <div className="max-w-md rounded overflow-hidden mx-auto p-1 font-pins text-fontcolor">
        <div className="flex flex-col items-center sm:flex-row sm:items-center w-full max-w-lg pb-3 pt-3 px-6 bg-quaternary last:rounded-sm text-primary-darker mb-10">
          <h1 className="text-xl font-bold text-white text-center sm:text-left sm:mr-4 mb-4 sm:mb-0">
            Find your accommodation
          </h1>
          <form
            className="flex items-center border-2 bg-white rounded-sm py-2 px-2 w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="search" className="sr-only">
              Search Venues
            </label>
            <input
              id="search"
              className="appearance-none w-full pl-4 pr-10 py-2 leading-tight focus:outline-none bg-white"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
            />
            {search.length > 0 ? (
              <BsXCircleFill
                className="w-6 h-6 text-gray-700 cursor-pointer"
                onClick={handleClearSearch}
                aria-label="Clear search"
              />
            ) : (
              <BsSearch className="w-6 h-6 text-primary-lighter" />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

SearchVenues.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchVenues;
