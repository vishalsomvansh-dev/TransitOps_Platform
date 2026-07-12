// Main application logic

document.addEventListener('DOMContentLoaded', function() {
    if (isLoggedIn()) {
        loadAllData();
        initializeApp();
        setupEventListeners();
        updateDashboardMetrics();
        renderVehiclesTable();
        renderDriversTable();
        renderTripsTable();
        renderMaintenanceTable();
        renderFuelLogsTable();
        renderExpensesTable();
        populateSelectFields();
    }
});

function initializeApp() {
    console.log('TransitOps Application Initialized');
}

function setupEventListeners() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.getAttribute('data-page');
            navigateToPage(pageName);
            updateCurrentPageData(pageName);
        });
    });
}

function navigateToPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update active nav link
    const activeLink = document.querySelector(`[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function updateCurrentPageData(pageName) {
    switch(pageName) {
        case 'dashboard':
            updateDashboardMetrics();
            break;
        case 'vehicles':
            renderVehiclesTable();
            break;
        case 'drivers':
            renderDriversTable();
            break;
        case 'trips':
            renderTripsTable();
            break;
        case 'maintenance':
            renderMaintenanceTable();
            break;
        case 'fuelLogs':
            renderFuelLogsTable();
            break;
        case 'expenses':
            renderExpensesTable();
            break;
    }
}

function showAddVehicleForm() {
    navigateToPage('addVehicle');
}

function showAddDriverForm() {
    navigateToPage('addDriver');
}

function showCreateTripForm() {
    navigateToPage('createTrip');
    populateSelectFields();
}

function showAddMaintenanceForm() {
    navigateToPage('addMaintenance');
    populateMaintenanceSelects();
}

function showAddFuelLogForm() {
    navigateToPage('addFuelLog');
    populateFuelVehicleSelect();
}

function showAddExpenseForm() {
    navigateToPage('addExpense');
    populateExpenseVehicleSelect();
}

function loadAllData() {
    loadFromLocalStorage();
}

function populateSelectFields() {
    // Populate trip vehicle select
    const tripVehicleSelect = document.getElementById('tripVehicle');
    const tripDriverSelect = document.getElementById('tripDriver');
    
    if (tripVehicleSelect) {
        tripVehicleSelect.innerHTML = '<option>-- Select Vehicle --</option>';
        vehiclesData.forEach(vehicle => {
            tripVehicleSelect.innerHTML += `<option value="${vehicle.id}">${vehicle.plate} - ${vehicle.type}</option>`;
        });
    }

    if (tripDriverSelect) {
        tripDriverSelect.innerHTML = '<option>-- Select Driver --</option>';
        driversData.forEach(driver => {
            tripDriverSelect.innerHTML += `<option value="${driver.id}">${driver.name}</option>`;
        });
    }
}

function populateMaintenanceSelects() {
    const maintenanceVehicleSelect = document.getElementById('maintenanceVehicle');
    if (maintenanceVehicleSelect) {
        maintenanceVehicleSelect.innerHTML = '<option>-- Select Vehicle --</option>';
        vehiclesData.forEach(vehicle => {
            maintenanceVehicleSelect.innerHTML += `<option value="${vehicle.id}">${vehicle.plate}</option>`;
        });
    }
}

function populateFuelVehicleSelect() {
    const fuelVehicleSelect = document.getElementById('fuelVehicle');
    if (fuelVehicleSelect) {
        fuelVehicleSelect.innerHTML = '<option>-- Select Vehicle --</option>';
        vehiclesData.forEach(vehicle => {
            fuelVehicleSelect.innerHTML += `<option value="${vehicle.id}">${vehicle.plate}</option>`;
        });
    }
}

function populateExpenseVehicleSelect() {
    const expenseVehicleSelect = document.getElementById('expenseVehicle');
    if (expenseVehicleSelect) {
        expenseVehicleSelect.innerHTML = '<option>-- All Vehicles --</option>';
        vehiclesData.forEach(vehicle => {
            expenseVehicleSelect.innerHTML += `<option value="${vehicle.id}">${vehicle.plate}</option>`;
        });
    }
}

function showNotification(message, type = 'info') {
    alert(`[${type.toUpperCase()}] ${message}`);
}

// Export functions for use in other modules
window.navigateToPage = navigateToPage;
window.updateCurrentPageData = updateCurrentPageData;
window.showAddVehicleForm = showAddVehicleForm;
window.showAddDriverForm = showAddDriverForm;
window.showCreateTripForm = showCreateTripForm;
window.showAddMaintenanceForm = showAddMaintenanceForm;
window.showAddFuelLogForm = showAddFuelLogForm;
window.showAddExpenseForm = showAddExpenseForm;
window.showNotification = showNotification;
window.loadAllData = loadAllData;
window.populateSelectFields = populateSelectFields;
window.populateMaintenanceSelects = populateMaintenanceSelects;
window.populateFuelVehicleSelect = populateFuelVehicleSelect;
window.populateExpenseVehicleSelect = populateExpenseVehicleSelect;
