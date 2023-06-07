import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckInComponent } from './components/check-in.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckInRoutingModule } from './check-in-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  declarations: [
    CheckInComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CheckInRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class CheckInModule { }
