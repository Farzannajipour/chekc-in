import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloService } from 'src/app/service/apollo.service';
import { CheckInComponent } from './check-in.component';
import { of, throwError } from 'rxjs';
import { HeaderComponent } from 'src/app/header/header.component';

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;
  let mockApolloService: jasmine.SpyObj<ApolloService>;

  beforeEach(async () => {
    mockApolloService = jasmine.createSpyObj('ApolloService', ['login']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [CheckInComponent, HeaderComponent],
      providers: [{ provide: ApolloService, useValue: mockApolloService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the error message if there are errors retrieving the booking', () => {
    const errorMessage = 'Error retrieving booking. Please check your booking code and last name and try again.';
    const errorResponse = { errors: [{ message: errorMessage }] };

    mockApolloService.login.and.returnValue(throwError(() => errorResponse));

    component.retrieveBooking();

    expect(component.errorMessage).toEqual(errorMessage);
  });

  it('should handle successful login', () => {
    const bookingCode = 'ABC123';
    const lastName = 'Doe';

    component.checkinForm.patchValue({ bookingCode, lastName });

    const routerSpy = spyOn(component.getRouter(), 'navigate');

    mockApolloService.login.and.returnValue(of({}));

    component.retrieveBooking();

    expect(routerSpy).toHaveBeenCalledWith(['/booking', bookingCode]);
  });
});
