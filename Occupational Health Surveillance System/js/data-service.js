// Mock data service for occupational health dashboard
class DataService {
    static getIncidents() {
        return [
            {
                id: 'INC-2023-015',
                date: '2023-06-15',
                employee: 'John D.',
                department: 'Warehouse',
                type: 'Back Injury',
                category: 'Musculoskeletal',
                severity: 'High',
                status: 'Investigating'
            },
            // More medical incident data
        ];
    }

    static getEmployeeHealthStats() {
        return {
            totalEmployees: 50,
            vaccinated: 42,
            highRisk: 3,
            pendingClearance: 8,
            vaccinationRate: 0.87
        };
    }

    static getComplianceStatus() {
        return {
            overall: 0.88,
            categories: [
                { name: 'OSHA Recordkeeping', value: 1.0 },
                { name: 'Medical Surveillance', value: 0.95 },
                { name: 'PPE Compliance', value: 0.82 },
                { name: 'Training Completion', value: 0.75 }
            ]
        };
    }

    static getPreventiveActions() {
        return [
            {
                action: 'Safety Training - Chemical Handling',
                department: 'Laboratory',
                type: 'Training',
                startDate: '2023-06-01',
                dueDate: '2023-06-30',
                status: 'Completed',
                impact: 'High'
            },
            // More medical preventive actions
        ];
    }
}

export default DataService;