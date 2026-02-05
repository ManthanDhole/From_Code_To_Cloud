import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService, BookingData } from '../../services/flight.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="booking-container">
      <div class="booking-header">
        <h1 class="page-title">Book Your Flight</h1>
        <div class="flight-type-selector">
          <button 
            class="type-btn" 
            [class.active]="bookingData.flightType === 'domestic'"
            (click)="setFlightType('domestic')">
            Domestic
          </button>
          <button 
            class="type-btn" 
            [class.active]="bookingData.flightType === 'international'"
            (click)="setFlightType('international')">
            International
          </button>
        </div>
      </div>

      <div class="booking-form-container">
        <form class="booking-form glass-card" (ngSubmit)="onSubmit()" #bookingForm="ngForm">
          <div class="form-section">
            <h3 class="section-title">Passenger Details</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  [(ngModel)]="bookingData.passengerName" 
                  name="passengerName"
                  required
                  class="form-input">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  [(ngModel)]="bookingData.email" 
                  name="email"
                  required
                  class="form-input">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  [(ngModel)]="bookingData.phone" 
                  name="phone"
                  required
                  class="form-input">
              </div>
              <div class="form-group">
                <label>Passengers</label>
                <select [(ngModel)]="bookingData.passengers" name="passengers" class="form-input">
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">Flight Details</h3>
            <div class="form-row">
              <div class="form-group">
                <label>From</label>
                <select [(ngModel)]="bookingData.from" name="from" required class="form-input">
                  <option value="">Select departure city</option>
                  <option *ngFor="let city of availableCities" [value]="city">{{city}}</option>
                </select>
              </div>
              <div class="form-group">
                <label>To</label>
                <select [(ngModel)]="bookingData.to" name="to" required class="form-input">
                  <option value="">Select destination</option>
                  <option *ngFor="let city of destinationCities" [value]="city">{{city}}</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Departure Date</label>
                <input 
                  type="date" 
                  [(ngModel)]="bookingData.departureDate" 
                  name="departureDate"
                  required
                  class="form-input">
              </div>
              <div class="form-group">
                <label>Return Date (Optional)</label>
                <input 
                  type="date" 
                  [(ngModel)]="bookingData.returnDate" 
                  name="returnDate"
                  class="form-input">
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="futuristic-btn primary" [disabled]="!bookingForm.valid">
              Search Flights
            </button>
          </div>
        </form>

        <div class="booking-visual">
          <div class="plane-animation">
            <div class="plane-path">
              <div class="animated-plane">✈</div>
            </div>
          </div>
          <div class="destination-info glass-card" *ngIf="bookingData.from && bookingData.to">
            <h4>Flight Route</h4>
            <div class="route">
              <span class="city">{{bookingData.from}}</span>
              <span class="arrow">→</span>
              <span class="city">{{bookingData.to}}</span>
            </div>
            <div class="flight-type-badge">
              {{bookingData.flightType | titlecase}} Flight
            </div>
          </div>
        </div>
      </div>

      <div class="booking-success" *ngIf="bookingResult" class="glass-card">
        <div class="success-icon">✅</div>
        <h3>Booking Successful!</h3>
        <p>Your booking ID is: <strong>{{bookingResult.bookingId}}</strong></p>
        <button class="futuristic-btn" (click)="resetForm()">Book Another Flight</button>
      </div>
    </div>
  `,
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  bookingData: BookingData = {
    passengerName: '',
    email: '',
    phone: '',
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    flightType: 'domestic'
  };

  bookingResult: { success: boolean; bookingId?: string } | null = null;

  constructor(private flightService: FlightService) {}

  get availableCities(): string[] {
    return this.bookingData.flightType === 'domestic' 
      ? this.flightService.getIndianCities()
      : this.flightService.getIndianCities();
  }

  get destinationCities(): string[] {
    if (this.bookingData.flightType === 'domestic') {
      return this.flightService.getIndianCities().filter(city => city !== this.bookingData.from);
    } else {
      return this.flightService.getInternationalCities();
    }
  }

  setFlightType(type: 'domestic' | 'international'): void {
    this.bookingData.flightType = type;
    this.bookingData.from = '';
    this.bookingData.to = '';
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.bookingResult = this.flightService.bookFlight(this.bookingData);
    }
  }

  isFormValid(): boolean {
    return !!(this.bookingData.passengerName && 
             this.bookingData.email && 
             this.bookingData.phone && 
             this.bookingData.from && 
             this.bookingData.to && 
             this.bookingData.departureDate);
  }

  resetForm(): void {
    this.bookingData = {
      passengerName: '',
      email: '',
      phone: '',
      from: '',
      to: '',
      departureDate: '',
      returnDate: '',
      passengers: 1,
      flightType: 'domestic'
    };
    this.bookingResult = null;
  }
}