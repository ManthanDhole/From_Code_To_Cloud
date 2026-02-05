# SkyBooker - Flight Booking Website

A futuristic Angular-based flight booking website with dark/golden theme and airplane animations.

## Features

- **Modern UI**: Dark theme with golden accents and futuristic design
- **Flight Booking**: Book domestic and international flights from/to India
- **Animated Elements**: Floating airplanes and smooth transitions
- **Responsive Design**: Works on desktop and mobile devices
- **Flight Management**: View available flights with filtering options

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/           # Landing page with hero section
│   │   ├── booking/        # Flight booking form
│   │   └── flight-list/    # Available flights display
│   ├── services/
│   │   └── flight.service.ts  # Flight data management
│   ├── app.component.*     # Main app component
│   └── app.routes.ts       # Routing configuration
├── styles.scss             # Global styles
└── index.html             # Main HTML file
```

## Available Routes

- `/` - Home page with hero section
- `/booking` - Flight booking form
- `/flights` - List of available flights

## Flight Data

The application includes sample data for:
- **Domestic Flights**: Delhi, Mumbai, Bangalore, Chennai, Kolkata, etc.
- **International Flights**: London, Dubai, Singapore, New York, Paris, etc.

## Technologies Used

- Angular 17+ (Standalone Components)
- SCSS for styling
- TypeScript
- Responsive CSS Grid/Flexbox
- CSS Animations

## Design Features

- **Dark Theme**: Black background with golden accents
- **Futuristic Fonts**: Orbitron and Exo 2 font families
- **Animations**: Floating planes, rotating orbits, glowing effects
- **Glass Morphism**: Translucent cards with backdrop blur
- **Gradient Effects**: Golden gradients for highlights

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+