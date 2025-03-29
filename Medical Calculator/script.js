// Tab functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

// BMI Calculator
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // convert cm to m
    
    if (isNaN(weight) || isNaN(height) || height === 0) {
        alert("Please enter valid weight and height");
        return;
    }
    
    const bmi = weight / (height * height);
    const resultElement = document.querySelector('#bmi-result .result-value');
    const categoryElement = document.getElementById('bmi-category');
    
    resultElement.textContent = bmi.toFixed(1);
    
    let category = '';
    let categoryClass = '';
    if (bmi < 18.5) {
        category = 'Underweight';
        categoryClass = 'underweight';
    } else if (bmi < 25) {
        category = 'Normal weight';
        categoryClass = 'normal';
    } else if (bmi < 30) {
        category = 'Overweight';
        categoryClass = 'overweight';
    } else {
        category = 'Obese';
        categoryClass = 'obese';
    }
    
    categoryElement.textContent = category;
    categoryElement.className = `result-category ${categoryClass}`;
}

// GFR Calculator
function calculateGFR() {
    const age = parseFloat(document.getElementById('age-gfr').value);
    const sex = document.getElementById('sex-gfr').value;
    const creatinine = parseFloat(document.getElementById('creatinine').value);
    
    if (isNaN(age) || isNaN(creatinine) || creatinine === 0) {
        alert("Please enter valid values");
        return;
    }
    
    // CKD-EPI formula (simplified)
    let gfr;
    if (sex === 'male') {
        gfr = 141 * Math.min(Math.pow(creatinine/80, -0.411), 1) * Math.pow(0.993, age);
    } else {
        gfr = 144 * Math.min(Math.pow(creatinine/80, -0.329), 1) * Math.pow(0.993, age);
    }
    
    const resultElement = document.querySelector('#gfr-result .result-value');
    const stageElement = document.getElementById('gfr-stage');
    
    resultElement.textContent = Math.round(gfr);
    
    let stage = '';
    let stageClass = '';
    if (gfr >= 90) {
        stage = 'Stage 1: Normal';
        stageClass = 'stage1';
    } else if (gfr >= 60) {
        stage = 'Stage 2: Mild';
        stageClass = 'stage2';
    } else if (gfr >= 45) {
        stage = 'Stage 3a: Moderate';
        stageClass = 'stage3';
    } else if (gfr >= 30) {
        stage = 'Stage 3b: Moderate';
        stageClass = 'stage3';
    } else if (gfr >= 15) {
        stage = 'Stage 4: Severe';
        stageClass = 'stage4';
    } else {
        stage = 'Stage 5: Kidney failure';
        stageClass = 'stage5';
    }
    
    stageElement.textContent = stage;
    stageElement.className = `result-category ${stageClass}`;
}

// MDRD GFR Calculator
function calculateMDRD() {
    const age = parseFloat(document.getElementById('age-mdrd').value);
    const sex = document.getElementById('sex-mdrd').value;
    const race = document.getElementById('race-mdrd').value;
    const creatinine = parseFloat(document.getElementById('creatinine-mdrd').value);
    
    if (isNaN(age) || isNaN(creatinine) || creatinine === 0) {
        alert("Please enter valid values");
        return;
    }
    
    // Convert creatinine from μmol/L to mg/dL
    const creatinineMgDl = creatinine / 88.4;
    
    // MDRD formula
    let gfr = 175 * Math.pow(creatinineMgDl, -1.154) * Math.pow(age, -0.203);
    
    // Adjust for sex and race
    if (sex === 'female') {
        gfr *= 0.742;
    }
    if (race === 'black') {
        gfr *= 1.212;
    }
    
    const resultElement = document.querySelector('#mdrd-result .result-value');
    const stageElement = document.getElementById('mdrd-stage');
    
    resultElement.textContent = Math.round(gfr);
    
    let stage = '';
    let stageClass = '';
    if (gfr >= 90) {
        stage = 'Stage 1: Normal';
        stageClass = 'stage1';
    } else if (gfr >= 60) {
        stage = 'Stage 2: Mild';
        stageClass = 'stage2';
    } else if (gfr >= 30) {
        stage = 'Stage 3: Moderate';
        stageClass = 'stage3';
    } else if (gfr >= 15) {
        stage = 'Stage 4: Severe';
        stageClass = 'stage4';
    } else {
        stage = 'Stage 5: Kidney failure';
        stageClass = 'stage5';
    }
    
    stageElement.textContent = stage;
    stageElement.className = `result-category ${stageClass}`;
}

// Wells Score Calculator
function calculateWells() {
    const dvt = document.getElementById('wells-dvt').checked ? 3 : 0;
    const diagnosis = document.getElementById('wells-diagnosis').checked ? 3 : 0;
    const hr = document.getElementById('wells-hr').checked ? 1.5 : 0;
    const immobilization = document.getElementById('wells-immobilization').checked ? 1.5 : 0;
    const history = document.getElementById('wells-history').checked ? 1.5 : 0;
    const hemoptysis = document.getElementById('wells-hemoptysis').checked ? 1 : 0;
    const malignancy = document.getElementById('wells-malignancy').checked ? 1 : 0;
    
    const score = dvt + diagnosis + hr + immobilization + history + hemoptysis + malignancy;
    
    const resultElement = document.querySelector('#wells-result .result-value');
    const riskElement = document.getElementById('wells-risk');
    
    resultElement.textContent = score;
    
    let risk = '';
    let riskClass = '';
    if (score <= 4) {
        risk = 'PE unlikely';
        riskClass = 'normal';
    } else if (score < 6) {
        risk = 'PE likely';
        riskClass = 'overweight';
    } else {
        risk = 'High probability';
        riskClass = 'obese';
    }
    
    riskElement.textContent = risk;
    riskElement.className = `result-category ${riskClass}`;
}

// CHADS₂ Score Calculator
function calculateCHADS() {
    const chf = document.getElementById('chads-chf').checked ? 1 : 0;
    const htn = document.getElementById('chads-htn').checked ? 1 : 0;
    const age = document.getElementById('chads-age').checked ? 1 : 0;
    const diabetes = document.getElementById('chads-diabetes').checked ? 1 : 0;
    const stroke = document.getElementById('chads-stroke').checked ? 2 : 0;
    
    const score = chf + htn + age + diabetes + stroke;
    
    const resultElement = document.querySelector('#chads-result .result-value');
    const riskElement = document.getElementById('chads-risk');
    
    resultElement.textContent = score;
    
    let risk = '';
    let riskClass = '';
    if (score === 0) {
        risk = 'Low risk (1.9%/year)';
        riskClass = 'normal';
    } else if (score === 1) {
        risk = 'Moderate risk (2.8%/year)';
        riskClass = 'stage2';
    } else if (score === 2) {
        risk = 'High risk (4.0%/year)';
        riskClass = 'stage3';
    } else {
        risk = 'Very high risk (≥5.9%/year)';
        riskClass = 'stage5';
    }
    
    riskElement.textContent = risk;
    riskElement.className = `result-category ${riskClass}`;
}