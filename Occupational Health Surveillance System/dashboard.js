document.addEventListener('DOMContentLoaded', function() {
    // Initialize date range picker
    const datePicker = flatpickr("#dashboard-date-range", {
        mode: "range",
        dateFormat: "Y-m-d",
        defaultDate: [new Date().setDate(new Date().getDate() - 30), new Date()],
        onChange: function(selectedDates, dateStr) {
            updateDashboardData(selectedDates);
        }
    });

    // Initialize charts
    initCharts();

    // Set active nav item based on current page
    setActiveNavItem();

    // Project info modal
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
    
    // Close modal when clicking outside
    projectInfoModal.addEventListener('click', function(e) {
        if (e.target === projectInfoModal) {
            projectInfoModal.classList.remove('active');
        }
    });

    // Sample data update function
    function updateDashboardData(dateRange) {
        console.log("Updating dashboard for date range:", dateRange);
        // In a real app, you would fetch data based on the date range
        // and update the charts and statistics
    }

    // Initialize Chart.js charts
    function initCharts() {
        // Health Overview Chart
        const healthCtx = document.getElementById('health-chart').getContext('2d');
        new Chart(healthCtx, {
            type: 'doughnut',
            data: {
                labels: ['Healthy', 'Needs Clearance', 'High Risk', 'Pending Tests'],
                datasets: [{
                    data: [72, 8, 3, 17],
                    backgroundColor: [
                        'rgba(56, 239, 125, 0.7)',
                        'rgba(247, 151, 30, 0.7)',
                        'rgba(244, 67, 54, 0.7)',
                        'rgba(108, 117, 125, 0.7)'
                    ],
                    borderColor: [
                        'rgba(56, 239, 125, 1)',
                        'rgba(247, 151, 30, 1)',
                        'rgba(244, 67, 54, 1)',
                        'rgba(108, 117, 125, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                cutout: '70%'
            }
        });

        // Incident Trends Chart
        const incidentsCtx = document.getElementById('incidents-chart').getContext('2d');
        new Chart(incidentsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Incidents',
                    data: [5, 8, 6, 9, 12, 7],
                    borderColor: '#3a7bd5',
                    backgroundColor: 'rgba(58, 123, 213, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Injuries by Department Chart
        const deptCtx = document.getElementById('injuries-by-department').getContext('2d');
        new Chart(deptCtx, {
            type: 'bar',
            data: {
                labels: ['Production', 'Warehouse', 'Maintenance', 'Office', 'Lab'],
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
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Injuries by Department',
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

        // Health Trends Chart
        const trendCtx = document.getElementById('health-trends').getContext('2d');
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [
                    {
                        label: 'Musculoskeletal',
                        data: [15, 12, 18, 14],
                        borderColor: 'rgba(58, 123, 213, 1)',
                        backgroundColor: 'transparent',
                        tension: 0.1
                    },
                    {
                        label: 'Respiratory',
                        data: [8, 5, 7, 4],
                        borderColor: 'rgba(0, 210, 255, 1)',
                        backgroundColor: 'transparent',
                        tension: 0.1
                    },
                    {
                        label: 'Chemical Exposure',
                        data: [3, 2, 5, 2],
                        borderColor: 'rgba(244, 67, 54, 1)',
                        backgroundColor: 'transparent',
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Health Trends by Quarter',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        });
    }

    // Set active nav item based on current page
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
});