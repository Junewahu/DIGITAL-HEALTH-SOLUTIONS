document.addEventListener('DOMContentLoaded', function() {
    // Load saved data from localStorage
    let symptoms = JSON.parse(localStorage.getItem('symptoms')) || [];
    let vitals = JSON.parse(localStorage.getItem('vitals')) || [];
    let medications = JSON.parse(localStorage.getItem('medications')) || [];
    let history = JSON.parse(localStorage.getItem('history')) || [];

    // Update dashboard stats
    updateDashboard();

    // Symptom Form Submission
    document.getElementById('symptom-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const symptom = {
            name: document.getElementById('symptom-name').value,
            severity: document.getElementById('symptom-severity').value,
            notes: document.getElementById('symptom-notes').value,
            date: new Date().toLocaleString()
        };
        
        symptoms.push(symptom);
        localStorage.setItem('symptoms', JSON.stringify(symptoms));
        
        this.reset();
        updateSymptomsList();
        updateDashboard();
    });

    // Vitals Form Submission
    document.getElementById('vitals-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const vital = {
            bloodPressure: document.getElementById('blood-pressure').value,
            heartRate: document.getElementById('heart-rate').value,
            temperature: document.getElementById('temperature').value,
            notes: document.getElementById('vitals-notes').value,
            date: new Date().toLocaleString()
        };
        
        vitals.push(vital);
        localStorage.setItem('vitals', JSON.stringify(vitals));
        
        this.reset();
        updateVitalsList();
        updateDashboard();
    });

    // Medication Form Submission
    document.getElementById('medication-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const medication = {
            name: document.getElementById('med-name').value,
            dosage: document.getElementById('med-dosage').value,
            frequency: document.getElementById('med-frequency').value,
            due: document.getElementById('med-due').value,
            date: new Date().toLocaleString()
        };
        
        medications.push(medication);
        localStorage.setItem('medications', JSON.stringify(medications));
        
        this.reset();
        updateMedicationsList();
        updateDashboard();
    });

    // History Form Submission
    document.getElementById('history-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const record = {
            title: document.getElementById('history-title').value,
            date: document.getElementById('history-date').value,
            notes: document.getElementById('history-notes').value
        };
        
        history.push(record);
        localStorage.setItem('history', JSON.stringify(history));
        
        this.reset();
        updateHistoryList();
    });

    // Initialize lists
    updateSymptomsList();
    updateVitalsList();
    updateMedicationsList();
    updateHistoryList();

    // Update dashboard with latest data
    function updateDashboard() {
        // Recent symptoms
        if (symptoms.length > 0) {
            const recent = symptoms[symptoms.length - 1];
            document.getElementById('recent-symptoms').innerHTML = `
                <strong>${recent.name}</strong> (Severity: ${recent.severity}/10)<br>
                <small>${recent.date}</small>
            `;
        }

        // Latest vitals
        if (vitals.length > 0) {
            const recent = vitals[vitals.length - 1];
            document.getElementById('latest-vitals').innerHTML = `
                BP: <strong>${recent.bloodPressure}</strong> | 
                HR: <strong>${recent.heartRate}</strong> | 
                Temp: <strong>${recent.temperature}°C</strong><br>
                <small>${recent.date}</small>
            `;
        }

        // Medications due
        if (medications.length > 0) {
            const dueMeds = medications.filter(med => new Date(med.due) > new Date());
            if (dueMeds.length > 0) {
                document.getElementById('meds-due').innerHTML = `
                    <strong>${dueMeds[0].name}</strong> at ${new Date(dueMeds[0].due).toLocaleTimeString()}<br>
                    <small>${dueMeds.length} medications scheduled</small>
                `;
            }
        }
    }

    // Update symptoms list
    function updateSymptomsList() {
        const list = document.getElementById('symptoms-list');
        list.innerHTML = '';
        
        symptoms.forEach((symptom, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${symptom.date}</td>
                <td>${symptom.name}</td>
                <td>${symptom.severity}/10</td>
                <td>${symptom.notes || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteSymptom(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            list.appendChild(row);
        });
    }

    // Update vitals list
    function updateVitalsList() {
        const list = document.getElementById('vitals-list');
        list.innerHTML = '';
        
        vitals.forEach((vital, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vital.date}</td>
                <td>${vital.bloodPressure || '-'}</td>
                <td>${vital.heartRate || '-'}</td>
                <td>${vital.temperature || '-'}°C</td>
                <td>${vital.notes || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteVital(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            list.appendChild(row);
        });
    }

    // Update medications list
    function updateMedicationsList() {
        const list = document.getElementById('medications-list');
        list.innerHTML = '';
        
        medications.forEach((med, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${med.name}</td>
                <td>${med.dosage}</td>
                <td>${med.frequency}</td>
                <td>${new Date(med.due).toLocaleString()}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteMedication(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            list.appendChild(row);
        });
    }

    // Update history list
    function updateHistoryList() {
        const list = document.getElementById('history-list');
        list.innerHTML = '';
        
        history.forEach((record, index) => {
            const item = document.createElement('div');
            item.className = 'list-group-item';
            item.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${record.title}</h5>
                    <small>${record.date}</small>
                </div>
                <p class="mb-1">${record.notes}</p>
                <small>
                    <button class="btn btn-sm btn-danger" onclick="deleteHistory(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </small>
            `;
            list.appendChild(item);
        });
    }

    // Delete functions (attached to window for button access)
    window.deleteSymptom = function(index) {
        symptoms.splice(index, 1);
        localStorage.setItem('symptoms', JSON.stringify(symptoms));
        updateSymptomsList();
        updateDashboard();
    };

    window.deleteVital = function(index) {
        vitals.splice(index, 1);
        localStorage.setItem('vitals', JSON.stringify(vitals));
        updateVitalsList();
        updateDashboard();
    };

    window.deleteMedication = function(index) {
        medications.splice(index, 1);
        localStorage.setItem('medications', JSON.stringify(medications));
        updateMedicationsList();
        updateDashboard();
    };

    window.deleteHistory = function(index) {
        history.splice(index, 1);
        localStorage.setItem('history', JSON.stringify(history));
        updateHistoryList();
    };
});