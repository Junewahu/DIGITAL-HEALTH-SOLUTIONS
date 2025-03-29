// Enhanced drug database
const drugDatabase = [
    { name: "Warfarin", category: "Anticoagulant" },
    { name: "Aspirin", category: "NSAID" },
    { name: "Citalopram", category: "SSRI" },
    { name: "Simvastatin", category: "Statin" },
    { name: "Metformin", category: "Antidiabetic" },
    { name: "Amoxicillin", category: "Antibiotic" },
    { name: "Omeprazole", category: "PPI" },
    { name: "Ibuprofen", category: "NSAID" },
    { name: "Lisinopril", category: "ACE Inhibitor" },
    { name: "Furosemide", category: "Diuretic" },
    { name: "Digoxin", category: "Cardiac Glycoside" },
    { name: "Sertraline", category: "SSRI" },
    { name: "Atorvastatin", category: "Statin" },
    { name: "Losartan", category: "ARB" },
    { name: "Prednisone", category: "Corticosteroid" },
    { name: "Levothyroxine", category: "Thyroid Hormone" },
    { name: "Insulin", category: "Antidiabetic" },
    { name: "Metoprolol", category: "Beta Blocker" },
    { name: "Diazepam", category: "Benzodiazepine" },
    { name: "Paracetamol", category: "Analgesic" }
];

// Enhanced interaction database
const interactions = {
    "Warfarin": {
        "Aspirin": {
            severity: "severe",
            description: "Combining warfarin with aspirin significantly increases bleeding risk due to dual antiplatelet and anticoagulant effects.",
            mechanism: "Warfarin inhibits vitamin K-dependent clotting factors (II, VII, IX, X). Aspirin irreversibly inhibits platelet COX-1, reducing thromboxane A2 production. Together they impair hemostasis through multiple pathways.",
            management: "Avoid combination unless absolutely necessary (e.g., mechanical heart valve). If combined, use lowest effective aspirin dose (75-100mg/day) and maintain INR at lower end of therapeutic range. Monitor for bleeding.",
            references: "1. Johnson SG, et al. Ann Pharmacother. 2006;40(12):2054-9. 2. ACCP Guidelines (2012)"
        },
        "Citalopram": {
            severity: "moderate",
            description: "SSRIs like citalopram may increase bleeding risk when combined with warfarin through multiple mechanisms.",
            mechanism: "Citalopram impairs platelet serotonin uptake and may inhibit CYP2C19 (affecting warfarin metabolism). The combination leads to increased bleeding tendency.",
            management: "Monitor INR more frequently when starting or stopping citalopram. Educate patient about bleeding signs. Consider alternative antidepressants with lower bleeding risk if appropriate.",
            references: "1. Schalekamp T, et al. Br J Clin Pharmacol. 2008;66(3):322-9."
        },
        "Simvastatin": {
            severity: "moderate",
            description: "Simvastatin may potentiate warfarin's anticoagulant effect, increasing INR and bleeding risk.",
            mechanism: "Simvastatin inhibits CYP2C9 and CYP3A4 enzymes that metabolize warfarin, particularly the more potent S-warfarin isomer.",
            management: "Monitor INR closely when starting or stopping simvastatin. Adjust warfarin dose as needed. Consider alternative statins with less CYP interaction potential (e.g., pravastatin).",
            references: "1. FDA Drug Safety Communication (2011)"
        }
    },
    "Aspirin": {
        "Ibuprofen": {
            severity: "moderate",
            description: "Concurrent NSAID use may decrease aspirin's cardioprotective effects and increase GI bleeding risk.",
            mechanism: "Ibuprofen may competitively block aspirin's irreversible COX-1 inhibition in platelets. Both drugs reduce protective gastric prostaglandins.",
            management: "If cardioprotection needed, take aspirin 2 hours before ibuprofen. Consider alternative analgesics (e.g., paracetamol) or gastroprotection with PPI.",
            references: "1. Catella-Lawson F, et al. N Engl J Med. 2001;345(25):1809-17."
        }
    },
    "Citalopram": {
        "Omeprazole": {
            severity: "moderate",
            description: "Omeprazole may increase citalopram levels, potentially increasing QT prolongation risk.",
            mechanism: "Omeprazole inhibits CYP2C19, which metabolizes citalopram. This may lead to increased citalopram concentrations.",
            management: "Limit citalopram dose to 20mg/day when combined. Monitor for QT prolongation. Consider alternative PPIs (e.g., pantoprazole) with less CYP2C19 inhibition.",
            references: "1. FDA Drug Safety Communication (2011)"
        }
    },
    "Metformin": {
        "Furosemide": {
            severity: "moderate",
            description: "Furosemide may increase risk of metformin-associated lactic acidosis in predisposed patients.",
            mechanism: "Furosemide can cause volume depletion and pre-renal azotemia, reducing metformin clearance. It may also increase blood glucose levels.",
            management: "Monitor renal function and blood glucose. Ensure adequate hydration. Temporarily discontinue metformin if dehydration or acute kidney injury occurs.",
            references: "1. ADA Standards of Medical Care in Diabetes (2022)"
        }
    }
};

// DOM elements
const drug1Input = document.getElementById('drug1');
const drug2Input = document.getElementById('drug2');
const resultSection = document.getElementById('result');
const resultTitle = document.getElementById('result-title');
const severityBadge = document.getElementById('severity-badge');
const descriptionElement = document.getElementById('interaction-description');
const mechanismElement = document.getElementById('mechanism-text');
const managementElement = document.getElementById('management-text');
const referencesElement = document.getElementById('references-text');
const recentSearchesSection = document.getElementById('recent-searches');
const recentListElement = document.getElementById('recent-list');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');

// Initialize datalist options
const drugsList = document.getElementById('drugs-list');
drugDatabase.forEach(drug => {
    const option = document.createElement('option');
    option.value = drug.name;
    drugsList.appendChild(option);
});

// Load recent searches from localStorage
let recentSearches = JSON.parse(localStorage.getItem('recentDrugSearches')) || [];

function updateRecentSearchesDisplay() {
    if (recentSearches.length > 0) {
        recentSearchesSection.classList.remove('hidden');
        recentListElement.innerHTML = '';
        
        recentSearches.forEach(search => {
            const item = document.createElement('div');
            item.className = 'recent-item';
            item.innerHTML = `<i class="fas fa-pills"></i> ${search.drug1} + ${search.drug2}`;
            item.addEventListener('click', () => {
                drug1Input.value = search.drug1;
                drug2Input.value = search.drug2;
                checkInteraction();
            });
            recentListElement.appendChild(item);
        });
    } else {
        recentSearchesSection.classList.add('hidden');
    }
}

function addToRecentSearches(drug1, drug2) {
    // Remove duplicates
    recentSearches = recentSearches.filter(
        search => !(search.drug1 === drug1 && search.drug2 === drug2) && 
                 !(search.drug1 === drug2 && search.drug2 === drug1)
    );
    
    // Add new search
    recentSearches.unshift({ drug1, drug2 });
    
    // Keep only last 5 searches
    if (recentSearches.length > 5) {
        recentSearches = recentSearches.slice(0, 5);
    }
    
    // Save to localStorage
    localStorage.setItem('recentDrugSearches', JSON.stringify(recentSearches));
    
    // Update display
    updateRecentSearchesDisplay();
}

function checkInteraction() {
    const drug1 = drug1Input.value.trim();
    const drug2 = drug2Input.value.trim();
    
    if (!drug1 || !drug2) {
        showAlert("Please enter two drugs to check");
        return;
    }
    
    if (drug1 === drug2) {
        showResult({
            severity: "none",
            title: "Same Drug Entered",
            description: "You've entered the same drug twice. There is no interaction with itself.",
            mechanism: "A drug cannot interact with itself.",
            management: "No action needed.",
            references: "N/A"
        });
        return;
    }
    
    // Check if drugs exist in our database
    const drug1Exists = drugDatabase.some(drug => drug.name.toLowerCase() === drug1.toLowerCase());
    const drug2Exists = drugDatabase.some(drug => drug.name.toLowerCase() === drug2.toLowerCase());
    
    if (!drug1Exists || !drug2Exists) {
        const missingDrugs = [];
        if (!drug1Exists) missingDrugs.push(drug1);
        if (!drug2Exists) missingDrugs.push(drug2);
        
        showResult({
            severity: "none",
            title: "Drug Not Found",
            description: `${missingDrugs.join(" and ")} ${missingDrugs.length > 1 ? 'are' : 'is'} not in our database.`,
            mechanism: "Please check the spelling or consult a comprehensive drug reference.",
            management: "Consider alternative medications that are in our database.",
            references: "N/A"
        });
        return;
    }
    
    // Check both directions (A+B and B+A)
    const interaction = interactions[drug1]?.[drug2] || interactions[drug2]?.[drug1];
    
    if (interaction) {
        showResult({
            severity: interaction.severity,
            title: `${drug1} + ${drug2} Interaction`,
            description: interaction.description,
            mechanism: interaction.mechanism,
            management: interaction.management,
            references: interaction.references
        });
    } else {
        showResult({
            severity: "none",
            title: "No Known Interaction",
            description: `No significant interaction found between ${drug1} and ${drug2} in our database.`,
            mechanism: "These drugs work through different pathways with no known pharmacokinetic or pharmacodynamic interactions.",
            management: "Monitor as usual. Always be alert for unexpected effects when combining medications.",
            references: "N/A"
        });
    }
    
    // Add to recent searches
    addToRecentSearches(drug1, drug2);
}

function showResult(result) {
    resultSection.classList.remove('hidden');
    resultTitle.textContent = result.title;
    descriptionElement.textContent = result.description;
    mechanismElement.textContent = result.mechanism;
    managementElement.textContent = result.management;
    referencesElement.textContent = result.references;
    
    // Set severity badge
    severityBadge.className = 'severity-badge';
    severityBadge.innerHTML = ''; // Clear existing content
    
    let icon, text;
    switch(result.severity) {
        case 'mild':
            severityBadge.classList.add('severity-mild');
            icon = '<i class="fas fa-exclamation-circle"></i>';
            text = 'Mild Interaction';
            break;
        case 'moderate':
            severityBadge.classList.add('severity-moderate');
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            text = 'Moderate Interaction';
            break;
        case 'severe':
            severityBadge.classList.add('severity-severe');
            icon = '<i class="fas fa-skull-crossbones"></i>';
            text = 'Severe Interaction';
            break;
        default:
            severityBadge.classList.add('severity-none');
            icon = '<i class="fas fa-check-circle"></i>';
            text = 'No Interaction';
    }
    
    severityBadge.innerHTML = `${icon} ${text}`;
    
    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

function showAlert(message) {
    // Create a nice toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    document.body.appendChild(toast);
    
    // Show and then remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }, 100);
}

function clearSearch() {
    drug1Input.value = '';
    drug2Input.value = '';
    resultSection.classList.add('hidden');
    drug1Input.focus();
}

// Event listeners
checkBtn.addEventListener('click', checkInteraction);
clearBtn.addEventListener('click', clearSearch);

// Allow pressing Enter to check interaction
drug1Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') drug2Input.focus();
});

drug2Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkInteraction();
});

// Initialize recent searches display
updateRecentSearchesDisplay();

// Add animation to check button on hover
checkBtn.addEventListener('mouseenter', () => {
    checkBtn.innerHTML = '<i class="fas fa-search"></i> Checking...';
});

checkBtn.addEventListener('mouseleave', () => {
    checkBtn.innerHTML = '<i class="fas fa-search"></i> Check Interaction';
});