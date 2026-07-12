// Analytics page logic

function renderBarChart() {
    const barChart = document.getElementById('barChart');
    if (!barChart) return;
    
    barChart.innerHTML = '';
    
    analyticsData.peakHours.forEach((value, index) => {
        const barGroup = document.createElement('div');
        barGroup.className = 'bar-group';
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        const heightPercent = (value / 200) * 100;
        bar.style.height = heightPercent + '%';
        bar.innerHTML = `<span class="bar-value">${value}</span>`;
        
        const label = document.createElement('span');
        label.className = 'bar-label';
        label.textContent = analyticsData.hours[index];
        
        barGroup.appendChild(bar);
        barGroup.appendChild(label);
        barChart.appendChild(barGroup);
    });
}

function updateAnalyticsMetrics() {
    // Simulate real-time metric updates
    analyticsData.fuelConsumption = (analyticsData.fuelConsumption + (Math.random() - 0.5) * 0.5).toFixed(2);
    analyticsData.onTimePercentage = Math.min(100, Math.max(0, analyticsData.onTimePercentage + (Math.random() - 0.5) * 2)).toFixed(1);
    analyticsData.costPerKm = (analyticsData.costPerKm + (Math.random() - 0.5) * 0.5).toFixed(2);
    
    // Update KPI cards
    if (document.getElementById('kpiFuel')) {
        document.getElementById('kpiFuel').textContent = analyticsData.fuelConsumption + ' km/L';
    }
    if (document.getElementById('kpiOnTime')) {
        document.getElementById('kpiOnTime').textContent = analyticsData.onTimePercentage + '%';
    }
    if (document.getElementById('kpiCost')) {
        document.getElementById('kpiCost').textContent = '₹' + analyticsData.costPerKm;
    }
}

function exportAnalyticsReport() {
    const report = `
TransitOps Analytics Report
===========================

Generated: ${new Date().toLocaleString()}

Key Performance Indicators:
- Fuel Efficiency: ${analyticsData.fuelConsumption} km/L
- On-Time Performance: ${analyticsData.onTimePercentage}%
- Cost Per KM: ₹${analyticsData.costPerKm}
- Customer Satisfaction: 4.7/5.0

Peak Hours Data:
${analyticsData.hours.map((hour, i) => `${hour}: ${analyticsData.peakHours[i]} vehicles`).join('\n')}

Daily Summary:
- Total Trips: 1,247
- Total Distance: 8,432 km
- Avg Trip Duration: 28 min
- Revenue: ₹1,32,750
- Operating Cost: ₹48,250
- Net Profit: ₹84,500

Operational Insights:
- Route 5 shows highest occupancy at 87%
- Vehicle TRN-045 has best fuel efficiency
- Average wait time within SLA
- Driver training showing positive impact
    `;
    
    console.log(report);
    alert('Report generated successfully! Check console for details.');
}

// Initialize analytics on page load
function initializeAnalytics() {
    renderBarChart();
    updateAnalyticsMetrics();
    setInterval(updateAnalyticsMetrics, 5000);
}

// Export functions
window.renderBarChart = renderBarChart;
window.updateAnalyticsMetrics = updateAnalyticsMetrics;
window.exportAnalyticsReport = exportAnalyticsReport;
window.initializeAnalytics = initializeAnalytics;
