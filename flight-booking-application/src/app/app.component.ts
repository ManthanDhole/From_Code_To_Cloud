import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <span class="logo-text">SkyBooker</span>
          <div class="plane-icon">✈</div>
        </div>
        <ul class="nav-menu">
          <li><a routerLink="/" routerLinkActive="active">Home</a></li>
          <li><a routerLink="/booking" routerLinkActive="active">Book Flight</a></li>
          <li><a routerLink="/flights" routerLinkActive="active">Flights</a></li>
        </ul>
      </div>
    </nav>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SkyBooker';
}