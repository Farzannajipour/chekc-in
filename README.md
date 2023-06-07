# Flight Check-in

The project is called `FlightBooking`. It is an Angular web application with a NodeJS GraphQL backend server that allows users to check-in for flights and view their booking details.

## Table of Contents

- [Flight Check-in](#flight-check-in)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Features](#features)
  - [Improvements](#improvements)


## Getting Started

To get started with the project, follow the steps below:

1. Clone the source code
   
2. Install the dependencies: 
   ```
    cd flight-booking
    cd frontend
    npm install
    cd ..
    cd backend
    npm install
    ```
3. Start the mock API server:
   ```   
   cd backend
   node mock-api-server.js
   ```   
4. Start the backend server:
   ```   
    cd backend
    node server.js
   ```      
5. Start the frontend application:
   ```   
    cd frontend
    ng serve
   ```      
6. Open the application in your browser: 
   
    `http://localhost:4200`


## Features

The `FlightBooking` application has the following features:

- Check-in page: allows users to check in for flights by providing their booking code and last name.
- Booking page: displays the booking details for the user's flight, including itinerary, passenger information, and flight status.
- Authentication: verifies the user's login information against the mock API server.
- Advanced resolvers: uses more advanced resolvers in GraphQL to retrieve data from the mock API server.
- Extendable/reusable: the application is designed to be extendable and reusable so that new features can be added by a product owner in the future.

## Improvements

The following improvements are suggested for the FlightBooking application:

- Implement a guard to only allow navigation to the booking page from the check-in page.
- Increase the quantity of tests to ensure comprehensive test coverage.
- Enhance accessibility (a11y) by adding appropriate aria labels and ensuring the application meets accessibility standards.
- Utilize the trackBy function when rendering lists to improve performance by efficiently updating and re-rendering list items.
