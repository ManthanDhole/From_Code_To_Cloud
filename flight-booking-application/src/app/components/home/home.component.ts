import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="hero-section">
      <div class="hero-content">
        <div class="floating-planes">
          <div class="plane plane-1">✈</div>
          <div class="plane plane-2">✈</div>
          <div class="plane plane-3">✈</div>
        </div>
        <h1 class="hero-title">
          <span class="title-line">Discover the</span>
          <span class="title-line gold">Future of Flight</span>
        </h1>
        <p class="hero-subtitle">Book domestic and international flights across India with our futuristic booking platform</p>
        <div class="hero-actions">
          <button class="futuristic-btn primary" routerLink="/booking">Book Now</button>
          <button class="futuristic-btn secondary" routerLink="/flights">View Flights</button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="orbit-container">
          <div class="orbit orbit-1">
            <div class="planet"></div>
          </div>
          <div class="orbit orbit-2">
            <div class="planet"></div>
          </div>
          <div class="orbit orbit-3">
            <div class="planet"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="features-section">
      <div class="container">
        <h2 class="section-title">Why Choose SkyBooker?</h2>
        <div class="features-grid">
          <div class="feature-card glass-card">
            <div class="feature-icon">🌍</div>
            <h3>Global Destinations</h3>
            <p>Connect to 100+ destinations across India and internationally</p>
          </div>
          <div class="feature-card glass-card">
            <div class="feature-icon">⚡</div>
            <h3>Instant Booking</h3>
            <p>Book your flights in seconds with our advanced booking system</p>
          </div>
          <div class="feature-card glass-card">
            <div class="feature-icon">💎</div>
            <h3>Premium Experience</h3>
            <p>Enjoy luxury travel with our premium flight services</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}