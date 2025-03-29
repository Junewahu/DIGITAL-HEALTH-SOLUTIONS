// Initialize all charts for the application
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('incident-types-chart')) {
        initIncidentTypesChart();
    }
    
    if (document.getElementById('health-trend-chart')) {
        initHealthTrendChart();
    }
    
    if (document.getElementById('department-comparison-chart')) {
        initDepartmentComparisonChart();
    }
});

function initIncidentTypesChart() {
    const ctx = document.getElementById('incident-types-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Musculoskeletal', 'Respiratory', 'Chemical Exposure', 'Trauma', 'Other'],
            datasets: [{
                data: [35, 20, 15, 10, 20],
                backgroundColor: [
                    'rgba(58, 123, 213, 0.7)',
                    'rgba(0, 210, 255, 0.7)',
                    'rgba(244, 67, 54, 0.7)',
                    'rgba(247, 151, 30, 0.7)',
                    'rgba(108, 117, 125, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Incident Types Distribution',
                    font: {
                        size: 14
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function initHealthTrendChart() {
    const ctx = document.getElementById('health-trend-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Musculoskeletal',
                    data: [12, 9, 15, 11, 14, 10],
                    borderColor: 'rgba(58, 123, 213, 1)',
                    backgroundColor: 'rgba(58, 123, 213, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Respiratory',
                    data: [5, 4, 7, 3, 6, 2],
                    borderColor: 'rgba(0, 210, 255, 1)',
                    backgroundColor: 'rgba(0, 210, 255, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Health Incident Trends',
                    font: {
                        size: 14
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function initDepartmentComparisonChart() {
    const ctx = document.getElementById('department-comparison-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Manufacturing', 'Warehouse', 'Laboratory', 'Office', 'Maintenance'],
            datasets: [
                {
                    label: 'Injury Rate (per 100)',
                    data: [12, 8, 5, 2, 6],
                    backgroundColor: 'rgba(58, 123, 213, 0.7)'
                },
                {
                    label: 'Illness Rate (per 100)',
                    data: [4, 3, 7, 1, 2],
                    backgroundColor: 'rgba(0, 210, 255, 0.7)'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Department Health Metrics',
                    font: {
                        size: 14
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}