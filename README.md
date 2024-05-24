# Holidaze Spring 2024
Holidaze is a venue management site where guests can book their venues and accomdations,
whereas the admins can manage their venues and bookings.

Created by Siw Elin Årolilja Iversen/@Psijii at GitHub.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Installation
Instructions on how to install and set up your own copy of the project. This might include software prerequisites, environment setup, and dependency installation.
```
git clone https://yourprojectrepository.com 
npm install
```

## Usage
How to use the application after installation.

`npm start`

OR

```
npm run dev
npm run build
npm run preview
```



Navigate to `http://localhost:3000` to interact with the application.
OR click on the local hosts links in Terminal.

## Components
Descriptions of key components of the application.

### `VenueDetails`
Shows detailed information about a venue, including services and bookings. Located in `src/components/VenueDetails.jsx`.

### `BookingForm`
Allows users to book a venue. Validates user input before submission. Located in `src/components/BookingForm.jsx`.

### `SpecificVenue`
Fetches and displays information about a specific venue. Uses the `useApi` custom hook for data fetching. Located in `src/pages/SpecificVenue.jsx`.

### `useApi`
A custom React hook that simplifies fetching data from the API. Handles API requests and state management of the fetched data. Located in `src/hooks/useApi.js`.

## API Endpoints
Explanation about the critical API endpoints used in the project.

- **GET `/venues/{id}`** - Retrieves detailed information about a venue.
- **POST `/bookings`** - Creates a new booking.
- **DELETE `/venues/{id}`** - Deletes a specific venue.

## Authentication
Details on how authentication is handled in the project, explaining the use of authentication tokens, and how `authFetch` is used to integrate it seamlessly.

## Error Handling
Describe how errors are handled in the project, how errors from the API are processed, and how they are displayed to the user.

## Contributing
Guide for how potential contributors can help develop the project.

1. Fork the repository.
2. Create a new branch (`git checkout -b improve-feature`).
3. Make the appropriate changes in the files.
4. Add changes (`git add .`), commit (`git commit -am 'Add some feature'`) and push (`git push origin improve-feature`).
5. Create a Pull Request.

## License
This is a school project, created for Noroff Front End Development Course, Spring 2024.
