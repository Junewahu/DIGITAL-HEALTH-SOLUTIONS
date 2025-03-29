document.addEventListener('DOMContentLoaded', function() {
    const healthForm = document.getElementById('health-form');
    const resultsContainer = document.getElementById('results');
    const riskLevelEl = document.getElementById('risk-level');
    const bmiResultEl = document.getElementById('bmi-result');
    const bpResultEl = document.getElementById('bp-result');
    const lifestyleResultEl = document.getElementById('lifestyle-result');
    const recommendationsEl = document.getElementById('recommendations');
    const newAssessmentBtn = document.getElementById('new-assessment');

    healthForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseInt(document.getElementById('height').value);
        const bpSystolic = parseInt(document.getElementById('bp-systolic').value);
        const bpDiastolic = parseInt(document.getElementById('bp-diastolic').value);
        const smoking = document.getElementById('smoking').value;
        const activity = document.getElementById('activity').value;

        // Calculate BMI
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        const bmiCategory = getBMICategory(bmi);

        // Assess Blood Pressure
        const bpCategory = getBPCategory(bpSystolic, bpDiastolic);

        // Assess Lifestyle Factors
        const lifestyleRisk = assessLifestyle(smoking, activity);

        // Determine Overall Risk Level
        const overallRisk = determineOverallRisk(bmiCategory, bpCategory, lifestyleRisk);

        // Display Results
        displayResults(name, bmi, bmiCategory, bpSystolic, bpDiastolic, bpCategory, lifestyleRisk, overallRisk);

        // Show results container
        resultsContainer.style.display = 'block';
        healthForm.reset();
    });

    newAssessmentBtn.addEventListener('click', function() {
        resultsContainer.style.display = 'none';
        healthForm.reset();
    });

    function getBMICategory(bmi) {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal weight";
        if (bmi < 30) return "Overweight";
        return "Obese";
    }

    function getBPCategory(systolic, diastolic) {
        if (systolic < 120 && diastolic < 80) return "Normal";
        if (systolic < 130 && diastolic < 80) return "Elevated";
        if (systolic < 140 || diastolic < 90) return "Stage 1 Hypertension";
        return "Stage 2 Hypertension";
    }

    function assessLifestyle(smoking, activity) {
        let risk = 0;
        
        if (smoking === "yes") risk += 2;
        
        if (activity === "sedentary") risk += 2;
        else if (activity === "moderate") risk += 1;
        
        return risk;
    }

    function determineOverallRisk(bmiCategory, bpCategory, lifestyleRisk) {
        let riskScore = 0;
        
        // BMI contribution
        if (bmiCategory === "Overweight") riskScore += 1;
        if (bmiCategory === "Obese") riskScore += 2;
        
        // BP contribution
        if (bpCategory === "Elevated") riskScore += 1;
        if (bpCategory === "Stage 1 Hypertension") riskScore += 2;
        if (bpCategory === "Stage 2 Hypertension") riskScore += 3;
        
        // Lifestyle contribution
        riskScore += lifestyleRisk;
        
        // Determine overall risk
        if (riskScore <= 2) return "Low";
        if (riskScore <= 4) return "Moderate";
        return "High";
    }

    function displayResults(name, bmi, bmiCategory, bpSystolic, bpDiastolic, bpCategory, lifestyleRisk, overallRisk) {
        // Risk Level
        riskLevelEl.textContent = `${name}'s Health Risk: ${overallRisk}`;
        riskLevelEl.className = `risk-level ${overallRisk.toLowerCase()}`;
        
        // BMI Results
        bmiResultEl.innerHTML = `
            <h3><i class="fas fa-weight"></i> BMI Assessment</h3>
            <p>Your BMI: <strong>${bmi.toFixed(1)}</strong></p>
            <p>Category: <strong>${bmiCategory}</strong></p>
            ${bmiCategory !== "Normal weight" ? "<p class='warning'>Consider consulting a healthcare provider about weight management.</p>" : ""}
        `;
        
        // Blood Pressure Results
        bpResultEl.innerHTML = `
            <h3><i class="fas fa-heartbeat"></i> Blood Pressure Assessment</h3>
            <p>Your Blood Pressure: <strong>${bpSystolic}/${bpDiastolic} mmHg</strong></p>
            <p>Category: <strong>${bpCategory}</strong></p>
            ${bpCategory !== "Normal" ? "<p class='warning'>Elevated blood pressure may indicate cardiovascular risk.</p>" : ""}
        `;
        
        // Lifestyle Results
        let lifestyleMessage = "";
        if (lifestyleRisk >= 3) {
            lifestyleMessage = "<p class='warning'>High-risk lifestyle factors detected.</p>";
        } else if (lifestyleRisk >= 1) {
            lifestyleMessage = "<p>Moderate lifestyle risk factors.</p>";
        } else {
            lifestyleMessage = "<p>Healthy lifestyle factors.</p>";
        }
        
        lifestyleResultEl.innerHTML = `
            <h3><i class="fas fa-running"></i> Lifestyle Assessment</h3>
            ${lifestyleMessage}
        `;
        
        // Recommendations
        let recommendations = [];
        
        if (bmiCategory !== "Normal weight") {
            recommendations.push("Consider dietary changes and increased physical activity for weight management.");
        }
        
        if (bpCategory !== "Normal") {
            recommendations.push("Monitor blood pressure regularly and consider lifestyle modifications.");
        }
        
        if (lifestyleRisk >= 2) {
            recommendations.push("Address smoking and increase physical activity to reduce health risks.");
        }
        
        if (recommendations.length === 0) {
            recommendations.push("No specific recommendations. Maintain healthy habits!");
        }
        
        recommendationsEl.innerHTML = `
            <h3><i class="fas fa-stethoscope"></i> Recommendations</h3>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
            ${overallRisk !== "Low" ? "<p><strong>Consider scheduling a consultation with a healthcare provider.</strong></p>" : ""}
        `;
    }
});