import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ApolloService } from 'src/app/service/apollo.service';
import { of } from 'rxjs';
import { BookingComponent } from './booking.component';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let activatedRoute: ActivatedRoute;
  let apolloService: ApolloService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'PZIGZ3' }),
          },
        },
        {
          provide: ApolloService,
          useValue: {
            getBookingDetails: jasmine.createSpy('getBookingDetails').and.returnValue(of({ data: { booking: { bookingCode: 'PZIGZ3' } } })),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    apolloService = TestBed.inject(ApolloService);
    fixture.detectChanges();
  });

  it('should initialize booking code and fetch booking details', () => {
    expect(component.bookingCode).toBe('PZIGZ3');
    expect(apolloService.getBookingDetails).toHaveBeenCalledWith('PZIGZ3');
  });

  it('should set booking data on successful response', () => {
    const mockBookingData = {
      bookingCode: 'PZIGZ3',
      itinerary: {},
      contactDetails: [],
      passengers: [],
    };
    spyOn(component, 'getBookingDetails').and.callThrough();
    component.ngOnInit();

    expect(component.getBookingDetails).toHaveBeenCalled();

    component.booking = undefined;
    component.loading = true;
    apolloService.getBookingDetails = jasmine.createSpy('getBookingDetails').and.returnValue(of({ data: { booking: mockBookingData } }));

    component.getBookingDetails();

    expect(component.loading).toBe(false);
    expect(component.error).toBeUndefined();
  });

  
  it('should handle invalid booking code', () => {
    spyOn(component, 'getBookingDetails').and.callThrough();
    component.ngOnInit();
  
    expect(component.getBookingDetails).toHaveBeenCalled();
  
    component.bookingCode = 'ABC123';
    component.getBookingDetails();
  
    expect(component.error).toBe('Booking code is invalid.');
    expect(component.loading).toBe(false);
  });
  
  
});
