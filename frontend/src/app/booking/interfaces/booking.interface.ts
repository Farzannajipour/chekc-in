export interface IBooking {
    bookingCode: string;
    contactDetails: Contact[];
    itinerary: Itinerary;
    passengers: Passenger[];
  }
  
  interface Contact {
    address: string;
  }
  
  interface Itinerary {
    type: string;
    connections: Connection[];
  }
  
  interface Connection {
    id: number;
    duration: string;
    origin: Location;
    destination: Location;
    segments: Segment[];
  }
  
  interface Location {
    IATACode: string;
    name: string;
    city: City;
  }
  
  interface City {
    IATACode: string;
    name: string;
    country: Country;
  }
  
  interface Country {
    code: string;
    name: string;
  }
  
  interface Segment {
    id: number;
    type: string;
    informational: boolean;
    departFrom: Location;
    arriveOn: Location;
    marketingFlight: Flight;
  }
  
  interface Flight {
    number: string;
    carrier: Carrier;
    status: Status;
    numberOfStops: number;
    sellingClass: SellingClass;
    operatingFlight: OperatingFlight;
  }
  
  interface Carrier {
    code: string;
    name: string;
  }
  
  interface Status {
    code: string;
    name: string;
  }
  
  interface SellingClass {
    code: string;
    name: string;
  }
  
  interface OperatingFlight {
    number: string;
    carrier: Carrier;
    duration: string;
    flown: boolean;
    checkInStart: string;
    localCheckInStart: string;
    checkInEnd: string;
    localCheckInEnd: string;
    scheduledArrival: string;
    localScheduledArrival: string;
    scheduledDeparture: string;
    localScheduledDeparture: string;
    arrivalTerminal: Terminal;
    cabin: Cabin;
    equipment: Equipment;
  }
  
  interface Terminal {
    name: string;
  }
  
  interface Cabin {
    code: string;
    name: string;
  }
  
  interface Equipment {
    code: string;
    name: string;
  }
  
  interface Passenger {
    id: number;
    firstName: string;
    lastName: string;
    title: Title;
  }
  
  interface Title {
    code: string;
    name: string;
  }
