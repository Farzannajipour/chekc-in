import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/service/apollo.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  checkinForm: FormGroup = new FormGroup({
    bookingCode: new FormControl('', [Validators.required, Validators.pattern('^[A-Z2-9]{5,6}$')]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)])
  });
  errorMessage: string = '';

  constructor(private router: Router, private apolloService: ApolloService) {}

  ngOnInit() {}

  getRouter() {
    return this.router;
  }

  retrieveBooking() {
    const bookingCode = this.checkinForm.get('bookingCode')!.value;
    const lastName = this.checkinForm.get('lastName')!.value;
    this.apolloService.login(bookingCode, lastName).subscribe(
      (result) => {
        if (result.errors) {
          this.errorMessage = result.errors[0].message;
        } else {
          // handle successful login here
          this.router.navigate(['/booking', bookingCode]);
        }
      },
      (error) => {
        // handle error here
        this.errorMessage =
          'Error retrieving booking. Please check your booking code and last name and try again.';
      }
    );
  }

  getBookingCodeErrorMessage(): string {
    const bookingCode = this.checkinForm.get('bookingCode');
    if (bookingCode?.hasError('required')) {
      return 'Booking code is required.';
    }
    if (bookingCode?.hasError('pattern')) {
      return 'Booking code must have a length between 5 and 6 characters and contain only uppercase letters A-Z and numbers 2-9.';
    }
    return '';
  }

  getLastNameErrorMessage(): string {
    const lastName = this.checkinForm.get('lastName');
    if (lastName?.hasError('required')) {
      return 'Last name is required.';
    }
    if (lastName?.hasError('minlength')) {
      return 'Last name must be at least 2 characters long.';
    }
    if (lastName?.hasError('maxlength')) {
      return 'Last name cannot exceed 30 characters.';
    }
    return '';
  }
}
