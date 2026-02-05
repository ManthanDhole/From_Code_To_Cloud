import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService, Flight } from '../../services/flight.service';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flights-container">
      <div class="flights-header">
        <h1 class="page-title">Available Flights</h1>
        <div class="filter-controls">
          <button 
            class="filter-btn" 
            [class.active]="activeFilter === 'all'"
            (click)="setFilter('all')">
            All Flights
          </button>
          <button 
            class="filter-btn" 
            [class.active]="activeFilter === 'domestic'"
            (click)="setFilter('domestic')">
            Domestic
          </button>
          <button 
            class="filter-btn" 
            [class.active]="activeFilter === 'international'"
            (click)="setFilter('international')">
            International
          </button>
        </div>
      </div>

      <div class="flights-grid">
        <div 
          *ngFor="let flight of filteredFlights; trackBy: trackByFlightId" 
          class="flight-card glass-card"
          [class.international]="flight.type === 'international'">
          
          <div class="flight-header">
            <div class="airline-info">
              <h3 class="airline-name">{{flight.airline}}</h3>
              <span class="flight-number">{{flight.flightNumber}}</span>
            </div>
            <div class="flight-type-badge" [class]="flight.type">
              {{flight.type | titlecase}}
            </div>
          </div>

          <div class="flight-route">
            <div class="departure">
              <div class="city">{{flight.from}}</div>
              <div class="time">{{flight.departure}}</div>
            </div>
            <div class="route-visual">
              <div class="route-line">
                <div class="plane-icon">✈</div>
              </div>
              <div class="duration">{{flight.duration}}</div>
            </div>
            <div class="arrival">
              <div class="city">{{flight.to}}</div>
              <div class="time">{{flight.arrival}}</div>
            </div>
          </div>

          <div class="flight-details">
            <div class="aircraft">
              <span class="label">Aircraft:</span>
              <span class="value">{{flight.aircraft}}</span>
            </div>
            <div class="price">
              <span class="currency">₹</span>
              <span class="amount">{{flight.price | number}}</span>
            </div>
          </div>

          <div class="flight-actions">
            <button class="futuristic-btn primary" (click)="selectFlight(flight)">
              Select Flight
            </button>
          </div>
        </div>
      </div>

      <div class="no-flights" *ngIf="filteredFlights.length === 0">
        <div class="empty-state">
          <div class="empty-icon">✈</div>
          <h3>No flights found</h3>
          <p>Try adjusting your filters to see more flights.</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {
  flights: Flight[] = [];
  filteredFlights: Flight[] = [];
  activeFilter: 'all' | 'domestic' | 'international' = 'all';

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.flights = this.flightService.getFlights();
    this.filteredFlights = this.flights;
  }

  setFilter(filter: 'all' | 'domestic' | 'international'): void {
    this.activeFilter = filter;
    
    switch (filter) {
      case 'all':
        this.filteredFlights = this.flights;
        break;
      case 'domestic':
        this.filteredFlights = this.flightService.getDomesticFlights();
        break;
      case 'international':
        this.filteredFlights = this.flightService.getInternationalFlights();
        break;
    }
  }

  selectFlight(flight: Flight): void {
    console.log('Selected flight:', flight);
    alert(`Flight ${flight.flightNumber} selected! Redirecting to booking...`);
  }

  trackByFlightId(index: number, flight: Flight): string {
    return flight.id;
  }
}