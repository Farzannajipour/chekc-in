import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {
  constructor(private apollo: Apollo) {
    apollo.create({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache()
    });
  }

  getBookingDetails(bookingCode: string): Observable<any> {
    const query = gql`
      query GetBookingDetails($bookingCode: String!) {
        booking(bookingCode: $bookingCode) {
          bookingCode
          contactDetails {
            address
          }
          itinerary {
            connections {
              segments {
                id
                departFrom {
                  IATACode
                  name
                  city {
                    IATACode
                    name
                    country {
                      code
                      name
                    }
                  }
                }
                arriveOn {
                  IATACode
                  name
                  city {
                    IATACode
                    name
                    country {
                      code
                      name
                    }
                  }
                }
                marketingFlight {
                  number
                  carrier {
                    code
                    name
                  }
                  status {
                    code
                    name
                  }
                  numberOfStops
                  sellingClass {
                    code
                  }
                  operatingFlight {
                    number
                    carrier {
                      code
                      name
                    }
                    duration
                    flown
                    checkInStart
                    localCheckInStart
                    checkInEnd
                    localCheckInEnd
                    scheduledArrival
                    localScheduledArrival
                    scheduledDeparture
                    localScheduledDeparture
                    arrivalTerminal {
                      name
                    }
                    cabin {
                      code
                      name
                    }
                    equipment {
                      code
                      name
                    }
                  }
                }
              }
            }
          }
          passengers {
            id
            firstName
            lastName
            title {
              code
              name
            }
          }
        }
      }
    `;

    return this.apollo.watchQuery<any>({
      query,
      variables: { bookingCode },
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  login(bookingCode: string, lastName: string): Observable<any> {
    const mutation = gql`
      mutation Login($bookingCode: String!, $lastName: String!) {
        login(input: { bookingCode: $bookingCode, lastName: $lastName }) {
          success
          message
          passenger {
            id
            firstName
            lastName
          }
        }
      }
    `;

    return this.apollo.mutate({
      mutation,
      variables: { bookingCode, lastName },
    });
  }  
}
