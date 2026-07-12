# TransitOps - Smart Transport Operation Platform

A modern, responsive web application for managing smart transport operations using vanilla HTML, CSS, and JavaScript. TransitOps provides real-time monitoring, vehicle management, route optimization, and comprehensive analytics for transport fleet operations.

## 🚀 Features

- **Real-time Dashboard**: Monitor fleet status, vehicle locations, and operational metrics
- **Vehicle Management**: Track vehicles, driver assignments, maintenance schedules, and operational status
- **Route Optimization**: Manage routes, track performance, and optimize dispatch operations
- **Analytics & Insights**: Comprehensive analytics including fuel efficiency, on-time performance, cost analysis
- **Responsive Design**: Fully responsive UI optimized for desktop and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations and interactive components
- **Real-time Updates**: Live metric updates simulating real-time data

## 📁 Project Structure

```
transport/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Global styles and navigation
│   └── dashboard.css      # Dashboard and page-specific styles
├── js/
│   ├── data.js            # Sample data and app state
│   ├── app.js             # Main application logic
│   ├── dashboard.js       # Dashboard page logic
│   ├── vehicles.js        # Vehicle management logic
│   ├── routes.js          # Route management logic
│   └── analytics.js       # Analytics page logic
└── README.md              # This file
```

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients, flexbox, grid
- **Vanilla JavaScript**: No dependencies, pure JS
- **Responsive Design**: Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required

### Installation

1. Clone or download the repository:
```bash
git clone https://github.com/yourusername/transitops.git
cd transport
```

2. Open in browser:
```bash
# Option 1: Double-click index.html
# Option 2: Use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

## 📖 Usage Guide

### Dashboard
- View real-time fleet metrics
- Monitor active vehicles and completed rides
- Track system alerts and maintenance notifications
- Access quick statistics on operational performance

### Vehicle Management
- View all vehicles in the fleet with detailed information
- Filter vehicles by status (active, idle, maintenance)
- Search vehicles by plate number
- Monitor driver assignments and vehicle locations
- Track last update timestamps
- Add new vehicles to the fleet

### Route Management
- Create and manage transport routes
- View active routes and their status
- Monitor distance and estimated travel time
- Track active vehicles per route
- Edit route details
- View detailed route statistics

### Analytics
- Track key performance indicators (KPIs):
  - Fuel Efficiency (km/L)
  - On-time Performance (%)
  - Cost Per Kilometer
  - Customer Satisfaction Rating
- Analyze peak hour patterns with interactive bar chart
- View daily operational reports:
  - Total Trips
  - Total Distance
  - Average Trip Duration
  - Revenue Generated
  - Operating Cost
  - Net Profit
- Get operational insights and recommendations
- Export analytics reports

## ⌨️ Keyboard & Navigation

### Navigation
- Click on navigation menu to switch between pages
- Active page is highlighted in the navigation bar

### Vehicles Page
- Use status filter dropdown to filter vehicles
- Use search box to find vehicles by plate number
- Click "View" button to see vehicle details
- Vehicles update automatically every 10 seconds

### Routes Page
- Click "New Route" to add a new route
- Click "View Details" to see route information
- Click "Edit" to modify route name
- Routes update every 15 seconds

### Analytics Page
- Hover over bars in peak hours chart to see values
- Metrics update in real-time every 5 seconds
- All charts and reports refresh automatically

## 🎨 Customization

### Change Color Scheme

Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    --dark-bg: #0f0f0f;
    --accent-color: #667eea;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
}
```

### Modify Data

Edit sample data in `js/data.js`:

```javascript
const vehiclesData = [ /* ... */ ];
const routesData = [ /* ... */ ];
const analyticsData = { /* ... */ };
```

### Update Intervals

Change real-time update frequencies in `js/app.js`:

```javascript
setInterval(updateDashboard, 5000);  // Change 5000 to desired ms
setInterval(updateVehicles, 10000);
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Desktop**: 1280px and above
- **Tablet**: 768px to 1279px
- **Mobile**: Below 768px

## 🔧 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 API Integration

To connect with a backend API:

1. Update the `updateDashboard()` function in `app.js`:

```javascript
function updateDashboard() {
    fetch('/api/dashboard')
        .then(res => res.json())
        .then(data => {
            document.getElementById('activeVehicles').textContent = data.activeVehicles;
            // ... update other metrics
        });
}
```

2. Similar patterns for vehicles, routes, and analytics data

## 🚀 Deployment

### Option 1: GitHub Pages
```bash
# Push to GitHub repo
# Enable GitHub Pages in repo settings
# Select main branch as source
```

### Option 2: Netlify
```bash
# Drag and drop index.html to netlify.com
# Or connect GitHub repo
```

### Option 3: Traditional Hosting
```bash
# Upload all files to web server
# Access via domain name
```

### Option 4: Docker
Create `Dockerfile`:
```dockerfile
FROM nginx:latest
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📊 Sample Metrics

- **Fleet Size**: 1,250 vehicles
- **Active Vehicles**: 847 (67.8%)
- **Daily Trips**: 1,247
- **Total Distance**: 8,432 km
- **On-time Rate**: 98.5%
- **Fuel Efficiency**: 8.2 km/L

## 🐛 Troubleshooting

### Page not loading
- Check browser console for errors (F12)
- Ensure all files are in correct directories
- Try clearing cache (Ctrl+Shift+Delete)

### Styles not applying
- Verify CSS files are linked correctly in HTML
- Check file paths are relative to index.html
- Clear browser cache

### JavaScript not working
- Check console for errors (F12)
- Verify script tags load in correct order
- Check for JavaScript errors in console

## 🎯 Future Enhancements

- [ ] Real-time GPS tracking integration
- [ ] WebSocket for live updates
- [ ] Mobile app companion
- [ ] AI-powered route optimization
- [ ] Predictive maintenance system
- [ ] Driver performance analytics
- [ ] Customer mobile app integration
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Advanced reporting and exports
- [ ] User authentication system
- [ ] Database integration

## 📞 Support

For issues and feature requests, please create an issue in the repository.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Made with ❤️ for smart transport operations**

For more information, visit the [TransitOps Documentation](https://github.com/yourusername/transitops)
