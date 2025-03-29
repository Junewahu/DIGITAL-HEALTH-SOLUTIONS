// Sample Data
const patients = [
    {
      id: "P-1001",
      name: "John Doe",
      dob: "1985-05-15",
      gender: "Male",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown",
      lastVisit: "2023-05-12"
    },
    {
      id: "P-1002",
      name: "Jane Smith",
      dob: "1978-08-22",
      gender: "Female",
      phone: "(555) 987-6543",
      address: "456 Oak Ave, Somewhere",
      lastVisit: "2023-05-10"
    }
  ];
  
  // Initialize the app
  document.addEventListener('DOMContentLoaded', function() {
    // Common functionality for all pages
    initSidebar();
    
    // Page-specific initialization
    if (document.querySelector('.card-grid')) {
      initDashboard();
    }
    
    if (document.querySelector('#patients-table')) {
      initPatientsPage();
    }
  });
  
  function initSidebar() {
    // Highlight current page in sidebar
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === currentPage) {
        item.classList.add('active');
      }
    });
  }
  
  function initDashboard() {
    // Update stats cards
    document.querySelector('.card:nth-child(1) .card-value').textContent = patients.length;
    // More dashboard-specific code...
  }
  
  function initPatientsPage() {
    // Patient search functionality
    const searchInput = document.querySelector('input[placeholder="Search patients..."]');
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const rows = document.querySelectorAll('#patients-table tbody tr');
      
      rows.forEach(row => {
        const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        row.style.display = name.includes(searchTerm) ? '' : 'none';
      });
    });
    
    // Add patient modal would go here
  }