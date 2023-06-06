const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Read the mock.json file
const mockData = JSON.parse(fs.readFileSync(path.join(__dirname, './mock.json'), 'utf8'));

// Define the GraphQL schema
const typeDefs = gql`
  ${fs.readFileSync(path.join(__dirname, './types.graphql'), 'utf8')}
`;

// Define the resolvers
const resolvers = {
  Query: {
    booking: (_, args) => {
      console.log(args);
      const { bookingCode } = args;
      if (mockData.bookingCode !== bookingCode) {
        throw new Error('Invalid booking code');
      }
      return mockData;
    },
  },
  Mutation: {
    login: (_, args) => {
      const { bookingCode, lastName } = args.input;

      // Validate booking code length and format
      if (
        bookingCode.length < 5 ||
        bookingCode.length > 6 ||
        !/^[1-9A-Z]+$/.test(bookingCode)
      ) {
        throw new Error(
          'Booking code must have a length between 5 and 6 characters and contain only uppercase letters A-Z and numbers 2-9'
        );
      }

      // Validate family name length
      if (lastName.length < 2 || lastName.length > 30) {
        throw new Error('Family name must have a length between 2 and 30 characters');
      }

      // Search for passenger with matching booking code and last name
      const passenger = mockData.passengers.find(
        (passenger) => passenger.lastName === lastName && mockData.bookingCode === bookingCode
      );

      if (!passenger) {
        throw new Error('Invalid booking code or family name');
      }

      // Login is successful
      return {
        success: true,
        message: 'Login successful',
        passenger: {
          id: passenger.id,
          firstName: passenger.firstName,
          lastName: passenger.lastName,
        },
      };
    },
    checkin: (_, args) => {
      const { bookingCode, lastName, firstName } = args.input;

      // Validate booking code length and format
      if (
        bookingCode.length < 5 ||
        bookingCode.length > 6 ||
        !/^[1-9A-Z]+$/.test(bookingCode)
      ) {
        throw new Error(
          'Booking code must have a length between 5 and 6 characters and contain only uppercase letters A-Z and numbers 2-9'
        );
      }

      // Validate family name length
      if (lastName.length < 2 || lastName.length > 30) {
        throw new Error('Family name must have a length between 2 and 30 characters');
      }

      // Search for passenger with matching booking code and last name
      const passenger = mockData.passengers;

      if (mockData.bookingCode !== bookingCode || passenger.lastName !== lastName) {
        throw new Error('Invalid booking code or family name');
      }

      if (!passenger) {
        throw new Error('Invalid booking code or family name');
      }

      // Check-in is successful
      return {
        bookingCode: [bookingCode],
        passengers: [passenger],
        itinerary: mockData.itinerary,
      };
    },
  },
};

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const app = express();

  await server.start();

  app.use('/api', createProxyMiddleware({ target: 'http://localhost:3000/api', changeOrigin: true }));

  app.use(cors());

  server.applyMiddleware({ app });

  const port = 4000;

  app.listen({ port }, () => {
    console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();
