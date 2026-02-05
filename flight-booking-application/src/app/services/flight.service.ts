import { Injectable } from '@angular/core';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  type: 'domestic' | 'international';
  aircraft: string;
}

export interface BookingData {
  passengerName: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  flightType: 'domestic' | 'international';
}

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private flights: Flight[] = [
    // Domestic Flights
    {
      id: 'AI101',
      airline: 'Air India',
      flightNumber: 'AI-101',
      from: 'Delhi (DEL)',
      to: 'Mumbai (BOM)',
      departure: '06:00',
      arrival: '08:15',
      duration: '2h 15m',
      price: 8500,
      type: 'domestic',
      aircraft: 'Boeing 737'
    },
    {
      id: 'SG201',
      airline: 'SpiceJet',
      flightNumber: 'SG-201',
      from: 'Bangalore (BLR)',
      to: 'Chennai (MAA)',
      departure: '14:30',
      arrival: '15:45',
      duration: '1h 15m',
      price: 4200,
      type: 'domestic',
      aircraft: 'Boeing 737'
    },
    {
      id: 'UK301',
      airline: 'Vistara',
      flightNumber: 'UK-301',
      from: 'Kolkata (CCU)',
      to: 'Delhi (DEL)',
      departure: '09:15',
      arrival: '11:45',
      duration: '2h 30m',
      price: 7800,
      type: 'domestic',
      aircraft: 'Airbus A320'
    },
    // International Flights
    {
      id: 'AI501',
      airline: 'Air India',
      flightNumber: 'AI-501',
      from: 'Delhi (DEL)',
      to: 'London (LHR)',
      departure: '02:15',
      arrival: '07:30',
      duration: '8h 45m',
      price: 65000,
      type: 'international',
      aircraft: 'Boeing 787'
    },
    {
      id: 'EK601',
      airline: 'Emirates',
      flightNumber: 'EK-601',
      from: 'Mumbai (BOM)',
      to: 'Dubai (DXB)',
      departure: '03:45',
      arrival: '06:15',
      duration: '3h 30m',
      price: 28000,
      type: 'international',
      aircraft: 'Airbus A380'
    },
    {
      id: 'SQ701',
      airline: 'Singapore Airlines',
      flightNumber: 'SQ-701',
      from: 'Bangalore (BLR)',
      to: 'Singapore (SIN)',
      departure: '11:20',
      arrival: '18:45',
      duration: '4h 25m',
      price: 35000,
      type: 'international',
      aircraft: 'Boeing 777'
    }
  ];

  private indianCities = [
    'Delhi (DEL)', 'Mumbai (BOM)', 'Bangalore (BLR)', 'Chennai (MAA)',
    'Kolkata (CCU)', 'Hyderabad (HYD)', 'Pune (PNQ)', 'Ahmedabad (AMD)',
    'Jaipur (JAI)', 'Kochi (COK)', 'Goa (GOI)', 'Lucknow (LKO)'
  ];

  private internationalCities = [
    'London (LHR)', 'Dubai (DXB)', 'Singapore (SIN)', 'New York (JFK)',
    'Paris (CDG)', 'Tokyo (NRT)', 'Bangkok (BKK)', 'Sydney (SYD)',
    'Frankfurt (FRA)', 'Amsterdam (AMS)'
  ];

  getFlights(): Flight[] {
    return this.flights;
  }

  getDomesticFlights(): Flight[] {
    return this.flights.filter(flight => flight.type === 'domestic');
  }

  getInternationalFlights(): Flight[] {
    return this.flights.filter(flight => flight.type === 'international');
  }

  getIndianCities(): string[] {
    return this.indianCities;
  }

  getInternationalCities(): string[] {
    return this.internationalCities;
  }

  searchFlights(from: string, to: string, type: 'domestic' | 'international'): Flight[] {
    return this.flights.filter(flight => 
      flight.from === from && 
      flight.to === to && 
      flight.type === type
    );
  }

  bookFlight(bookingData: BookingData): { success: boolean; bookingId?: string } {
    // Simulate booking process
    const bookingId = 'BK' + Date.now().toString().slice(-6);
    console.log('Booking confirmed:', { ...bookingData, bookingId });
    return { success: true, bookingId };
  }
}