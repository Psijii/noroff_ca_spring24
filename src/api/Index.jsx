import { useState, createContext } from 'react';
import { remove } from '../utils/LocalStorage';
export const AuthContext = createContext();

const ApiProvider = ({ children }) => {
  const [dataLogin, setDataLogin] = useState(false);
  const [viewBookings, setBookings] = useState([]);
  const [viewVenues, setVenues] = useState([]);

  const logout = () => {
    remove('token');
    remove('user');
    remove('avatar');
    remove('venueManger');
    setDataLogin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        dataLogin,
        setDataLogin,
        logout,
        viewBookings,
        setBookings,
        viewVenues,
        setVenues,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default ApiProvider;
