// charts.js - Consolidated Chart.js implementation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initAllCharts();
    
    // Date picker functionality
    initDatePickers();
    
    // Set active nav item based on current page
    setActiveNavItem();
    
    // Initialize project info modal
    initProjectModal();
});

function initAllCharts() {
    // Health Trends Chart (used in index.html)
    initHealthTrendChart();
    
    // Injuries by Department Chart (used in index.html)
    initInjuriesByDepartmentChart();
    
    // Incident Trends Chart (used in index.html)
    initIncidentTrendsChart();
}

function initHealthTrendChart() {
    const ctx = document.getElementById('health-trends');
    if (!ctx) return;

    new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Musculoskeletal',
                    data: [15, 12, 18, 14, 16, 13],
                    borderColor: '#3a7bd5',
                    backgroundColor: 'rgba(58, 123, 213, 0.1)',
                    tension: 0.3,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Respiratory',
                    data: [8, 5, 7, 4, 6, 3],
                    borderColor: '#00d2ff',
                    backgroundColor: 'rgba(0, 210, 255, 0.1)',
                    tension: 0.3,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Chemical Exposure',
                    data: [3, 2, 5, 2, 4, 1],
                    borderColor: '#f44336',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    tension: 0.3,
                    fill: true,
                    borderWidth: 2
                }
            ]
        },
        options: getDefaultChartOptions('Health Incident Trends')
    });
}

function initInjuriesByDepartmentChart() {
    const ctx = document.getElementById('injuries-by-department');
    if (!ctx) return;

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Manufacturing', 'Warehouse', 'Laboratory', 'Office', 'Maintenance'],
            datasets: [{
                label: 'Injuries',
                data: [12, 8, 5, 2, 3],
                backgroundColor: [
                    'rgba(58, 123, 213, 0.7)',
                    'rgba(0, 210, 255, 0.7)',
                    'rgba(106, 17, 203, 0.7)',
                    'rgba(247, 151, 30, 0.7)',
                    'rgba(244, 67, 54, 0.7)'
                ],
                borderColor: [
                    'rgba(58, 123, 213, 1)',
                    'rgba(0, 210, 255, 1)',
                    'rgba(106, 17, 203, 1)',
                    'rgba(247, 151, 30, 1)',
                    'rgba(244, 67, 54, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            ...getDefaultChartOptions('Injuries by Department'),
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Injuries'
                    }
                }
            },
            plugins: {
                ...getDefaultChartOptions().plugins,
                legend: {
                    display: false
                }
            }
        }
    });
}

function initIncidentTrendsChart() {
    const ctx = document.getElementById('incidents-chart');
    if (!ctx) return;

    new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Incidents',
                data: [5, 8, 6, 9, 12, 7],
                borderColor: '#3a7bd5',
                backgroundColor: 'rgba(58, 123, 213, 0.1)',
                tension: 0.3,
                fill: true,
                borderWidth: 2
            }]
        },
        options: {
            ...getDefaultChartOptions(),
            plugins: {
                ...getDefaultChartOptions().plugins,
                legend: {
                    display: false
                }
            }
        }
    });
}

function getDefaultChartOptions(title = '') {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: !!title,
                text: title,
                font: { size: 14 }
            },
            tooltip: {
                mode: 'index',
                intersect: false
            },
            legend: {
                position: 'bottom'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };
}

function initDatePickers() {
    if (document.getElementById('dashboard-date-range')) {
        flatpickr("#dashboard-date-range", {
            mode: "range",
            dateFormat: "Y-m-d",
            defaultDate: [new Date().setDate(new Date().getDate() - 30), new Date()],
            onChange: function(selectedDates) {
                console.log("Date range selected:", selectedDates);
            }
        });
    }
}

function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav li').forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                item.classList.add('active');
            }
        }
    });
}

function initProjectModal() {
    const projectInfoModal = document.getElementById('project-info-modal');
    const projectInfoBtn = document.querySelector('.project-info');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    
    if (projectInfoBtn) {
        projectInfoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            projectInfoModal.classList.add('active');
        });
    }
    
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            projectInfoModal.classList.remove('active');
        });
    });
    
    if (projectInfoModal) {
        projectInfoModal.addEventListener('click', function(e) {
            if (e.target === projectInfoModal) {
                projectInfoModal.classList.remove('active');
            }
        });
    }
}