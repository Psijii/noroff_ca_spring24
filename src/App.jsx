

/**
 * The main component of the application.
 * Renders the appropriate page based on the current URL path.
 *
 * @returns {JSX.Element} The rendered application.
 */
import { Route, Routes } from "react-router-dom";
// Pages

import HomePage from "./pages/home/index";
import SignUpPage from "./pages/signUp/Index";
import LoginPage from "./pages/logIn/Index";
import VenuesPage from "./pages/venues/Index";
import SpecificVenue from "./pages/specificVenue/index.jsx";
import ErrorPage from "./pages/notFoundPage/Index";
import HostSpecificVenue from "./pages/venueCreatedByHost/index.jsx";
import ProfilePage from "./pages/profile/Index";


// Layout

import BaseLayout from "./components/layouts/MainLayout";

// Authentication

import { AuthProvider } from "./context/AuthProvider";
import { VenueProvider } from "./context/VenueProvider";

function App() {
  return (
    <AuthProvider>
      <VenueProvider>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/logIn" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/venues" element={<VenuesPage />} />
            <Route path="/venues/:id" element={<SpecificVenue />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/venueCreatedByHost/:id"
              element={<HostSpecificVenue />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </VenueProvider>
    </AuthProvider>
  );
}

export default App;
