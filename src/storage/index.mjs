
/**
 * Saves data to the local storage.
 * @param {string} key - The key to store the data under.
 * @param {any} value - The value to be stored.
 */
export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("Error saving data", error.message);
  }
}

/**
 * Loads data from the local storage.
 * @param {string} key - The key to retrieve the data from.
 * @returns {any} The retrieved data, or null if the key does not exist.
 */
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log("Error loading data", error.message);
    return null;
  }
}

/**
 * Removes data from the local storage.
 * @param {string} key - The key of the data to be removed.
 */
export function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing data", error.message);
  }
}

/**
 * Clears all data from the local storage.
 */
export function clear() {
  localStorage.clear;
}
