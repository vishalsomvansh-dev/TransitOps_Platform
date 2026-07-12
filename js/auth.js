// Authentication Logic

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple validation
    if (email === 'user@transitops.com' && password === 'password123') {
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('userEmail', email);
        showDashboard();
        showNotification('Login successful!', 'success');
    } else {
        showNotification('Invalid credentials. Try user@transitops.com / password123', 'error');
    }
}

function handleAdminLogin(event) {
    event.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const adminKey = document.getElementById('adminKey').value;

    if (email === 'admin@transitops.com' && password === 'admin123' && adminKey === 'admin123') {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userEmail', email);
        showDashboard();
        showNotification('Admin login successful!', 'success');
    } else {
        showNotification('Invalid admin credentials. Try admin@transitops.com / admin123 / admin@123', 'error');
    }
}

function switchToAdminLogin() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('adminLoginPage').classList.add('active');
}

function switchToUserLogin() {
    document.getElementById('adminLoginPage').classList.remove('active');
    document.getElementById('loginPage').classList.add('active');
}

function handleLogout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    location.reload();
}

function showDashboard() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminLoginPage').style.display = 'none';
    document.getElementById('navbar').style.display = 'block';
    document.getElementById('mainContent').style.display = 'block';
    updateDashboardMetrics();
    loadAllData();
}

function isLoggedIn() {
    return localStorage.getItem('userRole') !== null;
}

function isAdmin() {
    return localStorage.getItem('userRole') === 'admin';
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', function() {
    if (isLoggedIn()) {
        showDashboard();
    }
});

// Export functions
window.handleLogin = handleLogin;
window.handleAdminLogin = handleAdminLogin;
window.switchToAdminLogin = switchToAdminLogin;
window.switchToUserLogin = switchToUserLogin;
window.handleLogout = handleLogout;
window.showDashboard = showDashboard;
window.isLoggedIn = isLoggedIn;
window.isAdmin = isAdmin;
