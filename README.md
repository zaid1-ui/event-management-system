# Eventra — Event Management System

Eventra is a React-based event management application that allows users to explore upcoming events, search and filter listings, view event details, and manage their event registrations.

## Features

- Browse events using the Ticketmaster Discovery API.
- Search events by keyword and filter by category.
- View event details, dates, venues, and locations.
- Register and log in with a simulated authentication system.
- Access protected pages after logging in.
- Register for events and cancel registrations.
- View registered events on the My Events page.
- Persist authentication and registration data using local storage.
- Responsive interface for desktop and mobile screens.

## Technologies Used

- React
- Vite
- JavaScript
- Redux Toolkit
- React Redux
- React Router
- Ticketmaster Discovery API
- CSS

## Getting Started

### Prerequisites

- Node.js and npm
- A Ticketmaster Discovery API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zaid1-ui/event-management-system.git
   ```

2. Open the project directory:

   ```bash
   cd event-management-system
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and add your API key:

   ```env
   VITE_TICKETMASTER_API_KEY=your_api_key_here
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL displayed in the terminal.

## Authentication

Eventra uses a simulated authentication flow for demonstration purposes. Authentication is not connected to a production backend, and the login system should not be used for real user accounts.

## Data Storage

Authentication state and event registrations are persisted in the browser's local storage.

## API

Event listings are retrieved from the Ticketmaster Discovery API. A valid API key is required to load event data.

## Future Improvements

- Add backend authentication and database storage.
- Improve event recommendations and filtering.
- Add automated tests.
- Introduce production-ready account security.

## Author

Developed as an academic web development project.
