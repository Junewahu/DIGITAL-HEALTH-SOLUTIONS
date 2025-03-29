// Utility functions for occupational health dashboard
class Utils {
    static formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    static calculatePercentage(part, whole) {
        return Math.round((part / whole) * 100);
    }

    static getSeverityClass(severity) {
        switch (severity.toLowerCase()) {
            case 'high': return 'danger';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return '';
        }
    }

    static getStatusClass(status) {
        switch (status.toLowerCase()) {
            case 'completed': return 'success';
            case 'in progress': return 'warning';
            case 'overdue': return 'danger';
            case 'investigating': return 'warning';
            case 'resolved': return 'success';
            default: return '';
        }
    }
}

export default Utils;