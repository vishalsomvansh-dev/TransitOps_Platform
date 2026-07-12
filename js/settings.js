// Settings page logic

function saveAccountSettings() {
    const name = document.getElementById('settingsName').value;
    const email = document.getElementById('settingsEmail').value;
    const phone = document.getElementById('settingsPhone').value;
    
    localStorage.setItem('accountSettings', JSON.stringify({
        name: name,
        email: email,
        phone: phone
    }));
    
    showNotification('Account settings saved successfully!', 'success');
}

function saveCompanySettings() {
    const company = document.getElementById('settingsCompany').value;
    const companyEmail = document.getElementById('settingsCompanyEmail').value;
    const currency = document.getElementById('settingsCurrency').value;
    
    localStorage.setItem('companySettings', JSON.stringify({
        company: company,
        email: companyEmail,
        currency: currency
    }));
    
    showNotification('Company settings saved successfully!', 'success');
}

function saveNotificationSettings() {
    const trips = document.getElementById('notifyTrips').checked;
    const maintenance = document.getElementById('notifyMaintenance').checked;
    const expenses = document.getElementById('notifyExpenses').checked;
    
    localStorage.setItem('notificationSettings', JSON.stringify({
        trips: trips,
        maintenance: maintenance,
        expenses: expenses
    }));
    
    showNotification('Notification settings saved successfully!', 'success');
}

function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        showNotification('Please fill all password fields', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match!', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('Password must be at least 6 characters long!', 'error');
        return;
    }
    
    localStorage.setItem('userPassword', newPassword);
    showNotification('Password changed successfully!', 'success');
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function clearAllData() {
    if (confirm('Are you sure you want to clear ALL data? This action cannot be undone!')) {
        localStorage.removeItem('vehiclesData');
        localStorage.removeItem('driversData');
        localStorage.removeItem('tripsData');
        localStorage.removeItem('maintenanceData');
        localStorage.removeItem('fuelLogsData');
        localStorage.removeItem('expensesData');
        
        // Reset arrays to empty
        vehiclesData = [];
        driversData = [];
        tripsData = [];
        maintenanceData = [];
        fuelLogsData = [];
        expensesData = [];
        
        showNotification('All data cleared!', 'success');
        location.reload();
    }
}

// Export functions
window.saveAccountSettings = saveAccountSettings;
window.saveCompanySettings = saveCompanySettings;
window.saveNotificationSettings = saveNotificationSettings;
window.changePassword = changePassword;
window.clearAllData = clearAllData;
