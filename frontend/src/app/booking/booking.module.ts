import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './components/booking.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    HttpClientModule,
  ]
})
export class BookingModule { }
