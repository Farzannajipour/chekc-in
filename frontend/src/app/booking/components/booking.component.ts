import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloService } from 'src/app/service/apollo.service';
import { catchError, retry, tap } from 'rxjs/operators';
import { IBooking } from '../interfaces/booking.interface';

 
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookingCode: string | null | undefined;
  booking: IBooking | undefined;
  loading = true;
  error: string | undefined;

  constructor(private route: ActivatedRoute, private apolloService: ApolloService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bookingCode = params.get('bookingCode');
      this.getBookingDetails();
    });
  }

toggleAccordion(event: Event) {
  const connectionDetails = (event.target as HTMLElement).nextElementSibling;
  if (connectionDetails) {
    connectionDetails.classList.toggle('open');
  }
}

  

  getBookingDetails() {
    if (this.bookingCode) {
      if (!/^[A-Z2-9]{5,6}$/.test(this.bookingCode)) {
        this.error = 'Booking code is invalid.';
        return;
      }

      this.apolloService.getBookingDetails(this.bookingCode).pipe(
        tap(() => {
          this.loading = true;
        }),
        retry(3),
        catchError(error => {
          console.error('Failed to fetch booking details:', error);
          if (error.status === 404) {
            this.error = 'Booking not found. Please check the booking code and try again.';
          } else {
            this.error = 'Failed to fetch booking details. Please try again.';
          }
          this.loading = false;
          throw error;
        })
      ).subscribe(response => {
        this.booking = response.data.booking;
        this.loading = false; 
      });
    }
  }
}