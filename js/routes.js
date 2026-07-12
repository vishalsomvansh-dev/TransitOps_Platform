// Routes page logic

function renderRoutes() {
    const container = document.getElementById('routesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    routesData.forEach(route => {
        const statusIcon = getStatusIcon(route.status);
        const card = document.createElement('div');
        card.className = `route-card ${route.status}`;
        card.innerHTML = `
            <div class="route-header">
                <h3>${route.name}</h3>
                <span class="route-status">${statusIcon} ${route.status.toUpperCase()}</span>
            </div>

            <div class="route-details">
                <div class="detail-item">
                    <span class="label">Route ID:</span>
                    <span class="value">${route.id}</span>
                </div>
                <div class="detail-item">
                    <span class="label">From:</span>
                    <span class="value">${route.startPoint}</span>
                </div>
                <div class="detail-item">
                    <span class="label">To:</span>
                    <span class="value">${route.endPoint}</span>
                </div>
            </div>

            <div class="route-stats">
                <div class="stat">
                    <p class="stat-label">Distance</p>
                    <p class="stat-value">${route.distance} km</p>
                </div>
                <div class="stat">
                    <p class="stat-label">Est. Time</p>
                    <p class="stat-value">${route.estimatedTime} min</p>
                </div>
                <div class="stat">
                    <p class="stat-label">Active Vehicles</p>
                    <p class="stat-value">${route.activeVehicles}</p>
                </div>
            </div>

            <div class="route-actions">
                <button class="route-btn primary" onclick="viewRouteDetails('${route.id}')">View Details</button>
                <button class="route-btn secondary" onclick="editRoute('${route.id}')">Edit</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function updateRoutesSummary() {
    const total = routesData.length;
    const active = routesData.filter(r => r.status === 'active').length;
    const delayed = routesData.filter(r => r.status === 'delayed').length;
    const totalDistance = routesData.reduce((sum, r) => sum + r.distance, 0);
    
    document.getElementById('summaryTotal').textContent = total;
    document.getElementById('summaryActive').textContent = active;
    document.getElementById('summaryDelayed').textContent = delayed;
    document.getElementById('summaryDistance').textContent = totalDistance + ' km';
}

function getStatusIcon(status) {
    switch(status) {
        case 'active': return '✅';
        case 'completed': return '✓';
        case 'delayed': return '⚠️';
        default: return '⚡';
    }
}

function viewRouteDetails(routeId) {
    const route = routesData.find(r => r.id === routeId);
    if (route) {
        alert(`Route: ${route.name}\n\nFrom: ${route.startPoint}\nTo: ${route.endPoint}\nDistance: ${route.distance} km\nEstimated Time: ${route.estimatedTime} minutes\nActive Vehicles: ${route.activeVehicles}\nStatus: ${route.status}`);
    }
}

function editRoute(routeId) {
    const route = routesData.find(r => r.id === routeId);
    if (route) {
        const newName = prompt('Edit route name:', route.name);
        if (newName) {
            route.name = newName;
            renderRoutes();
            showNotification(`Route ${routeId} updated successfully!`);
        }
    }
}

function addNewRoute() {
    const routeName = prompt('Enter route name:');
    if (routeName) {
        const newRoute = {
            id: `R${routesData.length + 1}`,
            name: routeName,
            startPoint: 'Start Point',
            endPoint: 'End Point',
            distance: 20.0,
            estimatedTime: 40,
            activeVehicles: 3,
            status: 'active',
        };
        routesData.push(newRoute);
        renderRoutes();
        updateRoutesSummary();
        showNotification(`Route "${routeName}" added successfully!`);
    }
}

// Export functions
window.renderRoutes = renderRoutes;
window.updateRoutesSummary = updateRoutesSummary;
window.viewRouteDetails = viewRouteDetails;
window.editRoute = editRoute;
window.addNewRoute = addNewRoute;
