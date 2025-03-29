// Enhanced first aid emergency database
const emergencies = [
    {
        id: 1,
        title: "Cardiac Arrest",
        description: "When someone's heart stops beating",
        category: "medical",
        severity: "critical",
        symptoms: [
            "Unresponsive",
            "Not breathing or only gasping",
            "No pulse",
            "Pale or blueish skin"
        ],
        steps: [
            {
                text: "Call emergency services immediately (or ask someone to call)",
                important: true
            },
            {
                text: "Check if the person is responsive and breathing normally",
                important: true
            },
            {
                text: "Begin CPR: Push hard and fast in the center of the chest at 100-120 compressions per minute",
                important: true,
                details: "Push at least 2 inches deep for adults, allow full chest recoil between compressions"
            },
            {
                text: "If an AED is available, turn it on and follow the voice instructions",
                important: true,
                details: "Attach pads to bare chest as shown in diagram, ensure no one is touching the person during analysis/shock"
            },
            {
                text: "Continue CPR until emergency responders arrive or the person starts breathing normally",
                important: true
            }
        ],
        donts: [
            "Don't stop CPR unless the person starts breathing normally",
            "Don't delay CPR to look for a pulse if unsure",
            "Don't use an AED on a person who is conscious and breathing normally"
        ],
        medicalHelp: "Immediate medical attention is required for cardiac arrest. Continue CPR until professional help arrives.",
        image: "https://images.pexels.com/photos/28271058/pexels-photo-28271058/free-photo-of-cpr-first-aid-cardiopulmonary-resuscitation-adult-pierwsza-pomoc-ratowanie-zycia.jpeg?auto=compress&cs=tinysrgb&w=600",
        alert: "Cardiac arrest is life-threatening! Begin CPR immediately and use an AED if available."
    },
    {
        id: 2,
        title: "Choking (Adult/Child)",
        description: "When someone can't breathe due to airway obstruction",
        category: "medical",
        severity: "critical",
        symptoms: [
            "Clutching throat (universal choking sign)",
            "Unable to speak or cough",
            "High-pitched sounds when breathing",
            "Blue lips or skin",
            "Loss of consciousness if blockage continues"
        ],
        steps: [
            {
                text: "Ask 'Are you choking?' If they can cough or speak, encourage them to keep coughing",
                important: false
            },
            {
                text: "If they can't breathe, speak, or cough, stand behind them and give up to 5 back blows between the shoulder blades",
                important: true,
                details: "Use the heel of your hand, deliver firm blows"
            },
            {
                text: "If the object isn't dislodged, perform abdominal thrusts (Heimlich maneuver)",
                important: true,
                details: "Make a fist above the navel, grasp with other hand, pull inward and upward"
            },
            {
                text: "Continue alternating 5 back blows and 5 abdominal thrusts until the object is expelled or the person becomes unconscious",
                important: true
            },
            {
                text: "If they become unconscious, begin CPR starting with chest compressions",
                important: true
            }
        ],
        donts: [
            "Don't perform abdominal thrusts on infants under 1 year",
            "Don't slap the person on the back if they're coughing effectively",
            "Don't perform blind finger sweeps in the mouth"
        ],
        medicalHelp: "Seek medical help even after successful relief as internal injuries may have occurred. Call emergency services if the person becomes unconscious.",
        image: "https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2017/09/22/17/06/composite-five-and-five-heimlich-8col.jpg",
        alert: "Complete airway obstruction requires immediate action! Alternate between back blows and abdominal thrusts."
    },
    {
        id: 3,
        title: "Severe Bleeding",
        description: "When someone is bleeding heavily",
        category: "trauma",
        severity: "high",
        symptoms: [
            "Blood flowing continuously from wound",
            "Blood soaking through clothing or bandages quickly",
            "Pale, cool, clammy skin",
            "Weak or rapid pulse",
            "Confusion or loss of consciousness"
        ],
        steps: [
            {
                text: "Call emergency services if bleeding is severe",
                important: true
            },
            {
                text: "Put on gloves if available to protect yourself from bloodborne pathogens",
                important: false
            },
            {
                text: "Apply direct pressure to the wound with a clean cloth or bandage",
                important: true,
                details: "Use your palm if nothing else is available"
            },
            {
                text: "If blood soaks through, do not remove the first bandage - add more on top",
                important: true
            },
            {
                text: "Elevate the injured area above heart level if possible",
                important: false
            },
            {
                text: "If bleeding doesn't stop, apply pressure to the nearest arterial pressure point",
                important: true,
                details: "For arm wounds: brachial artery. For leg wounds: femoral artery"
            },
            {
                text: "As a last resort, apply a tourniquet 2-3 inches above the wound",
                important: true,
                details: "Note the time the tourniquet was applied"
            }
        ],
        donts: [
            "Don't remove embedded objects - stabilize them in place",
            "Don't use a tourniquet unless absolutely necessary",
            "Don't check the wound repeatedly as this may disrupt clotting"
        ],
        medicalHelp: "Seek immediate medical attention for severe bleeding, especially if signs of shock appear (pale skin, rapid breathing, confusion).",
        image: "https://medlineplus.gov/ency/images/ency/fullsize/1067.jpg",
        alert: "Severe blood loss can lead to shock and death within minutes! Maintain pressure on the wound."
    },
    {
        id: 4,
        title: "Burns",
        description: "Thermal, chemical, or electrical burns",
        category: "trauma",
        severity: "medium",
        symptoms: [
            "Red, blistered, or charred skin",
            "Pain (except in severe burns where nerves are damaged)",
            "Swelling",
            "Shock symptoms in severe cases"
        ],
        steps: [
            {
                text: "Remove the person from the source of the burn",
                important: true,
                details: "For electrical burns, ensure power is off before touching the person"
            },
            {
                text: "Cool the burn with cool (not cold) running water for 10-15 minutes",
                important: true,
                details: "Don't use ice as it can cause further tissue damage"
            },
            {
                text: "Remove any jewelry or tight clothing near the burned area before swelling begins",
                important: false
            },
            {
                text: "Cover the burn loosely with a sterile non-stick bandage or clean cloth",
                important: false
            },
            {
                text: "For chemical burns, flush with large amounts of water and call poison control",
                important: true,
                details: "Continue flushing for at least 20 minutes"
            },
            {
                text: "Monitor for signs of shock in severe burns",
                important: true
            }
        ],
        donts: [
            "Don't apply butter, oil, or other home remedies",
            "Don't break blisters",
            "Don't remove clothing stuck to burned skin",
            "Don't give anything by mouth if the person has severe burns"
        ],
        medicalHelp: "Seek immediate medical attention for: burns larger than 3 inches, burns on face/hands/feet/genitals, chemical/electrical burns, or signs of infection.",
        image: "https://cdn.prod.website-files.com/63723fe799096ad12312edc2/63c04c51e8db54c11e6efc9a_Chemical%20Burns%20First%20Aid%20Treatment%20and%20Prevention%20Tips.png",
        alert: "For chemical burns, flush continuously with water for at least 20 minutes!"
    },
    {
        id: 5,
        title: "Fractures",
        description: "Broken bones from accidents or falls",
        category: "trauma",
        severity: "medium",
        symptoms: [
            "Intense pain at injury site",
            "Visible deformity or abnormal positioning",
            "Swelling and bruising",
            "Inability to move or bear weight on the area",
            "Bone protruding through skin in open fractures"
        ],
        steps: [
            {
                text: "Call emergency services if the fracture is severe (compound fracture, visible bone)",
                important: true
            },
            {
                text: "Keep the person still and calm",
                important: false
            },
            {
                text: "Immobilize the injured area with a splint or sling if possible",
                important: true,
                details: "Use any rigid material (magazines, boards) padded with soft material"
            },
            {
                text: "Apply ice wrapped in cloth to reduce swelling and pain",
                important: false
            },
            {
                text: "Do not attempt to realign the bone",
                important: true
            },
            {
                text: "If it's an open fracture, cover the wound with a clean dressing but don't push on protruding bones",
                important: true
            },
            {
                text: "Treat for shock if necessary (keep warm, elevate legs if no lower body injuries)",
                important: true
            }
        ],
        donts: [
            "Don't move the person unnecessarily if spinal injury is suspected",
            "Don't attempt to push a protruding bone back in",
            "Don't give food or drink in case surgery is needed"
        ],
        medicalHelp: "All fractures require medical attention. Seek immediate help for open fractures, suspected spinal injuries, or fractures with numbness/tingling.",
        image: "https://www.vitalfourmedical.com.my/image/vitalfourmedical/image/data/First%20Aid%20Fracture-07.jpg",
        alert: "For suspected spinal injuries, keep the person still and call emergency services immediately!"
    },
    {
        id: 6,
        title: "Chemical Exposure",
        description: "When hazardous chemicals contact skin or eyes",
        category: "environmental",
        severity: "high",
        symptoms: [
            "Burning sensation on skin/eyes",
            "Redness, blistering, or peeling skin",
            "Difficulty breathing if inhaled",
            "Blurred vision or eye pain",
            "Nausea or dizziness"
        ],
        steps: [
            {
                text: "Call emergency services and poison control if serious exposure",
                important: true
            },
            {
                text: "Move the person to fresh air if inhaled",
                important: true
            },
            {
                text: "For skin contact, remove contaminated clothing and rinse skin with water for 15-20 minutes",
                important: true,
                details: "Use safety shower if available, avoid spreading chemical to unaffected areas"
            },
            {
                text: "For eye exposure, flush eyes with clean water for at least 15 minutes",
                important: true,
                details: "Hold eyelids open, irrigate from inner to outer corner"
            },
            {
                text: "Identify the chemical if possible and follow specific first aid instructions on the SDS",
                important: true
            },
            {
                text: "Monitor breathing and be prepared to perform CPR if needed",
                important: true
            }
        ],
        donts: [
            "Don't induce vomiting unless instructed by poison control",
            "Don't attempt to neutralize chemicals (no baking soda for acids, etc.)",
            "Don't rub affected eyes",
            "Don't remove contact lenses before flushing eyes (except with alkali exposures)"
        ],
        medicalHelp: "Seek immediate medical attention for any significant chemical exposure, especially if affecting eyes, airways, or large skin areas.",
        image: "https://valleyoccupationalmedcenter.wordpress.com/wp-content/uploads/2013/12/rinse-eye.jpg?w=640",
        alert: "For chemical burns, continuous flushing is critical! Continue for at least 15-20 minutes."
    },
    {
        id: 7,
        title: "Electric Shock",
        description: "When someone receives an electrical injury",
        category: "environmental",
        severity: "high",
        symptoms: [
            "Visible burns at entry/exit points",
            "Irregular heartbeat or cardiac arrest",
            "Muscle pain or contractions",
            "Numbness or tingling",
            "Loss of consciousness",
            "Difficulty breathing"
        ],
        steps: [
            {
                text: "Do not touch the person if they're still in contact with the electrical source",
                important: true
            },
            {
                text: "Turn off the power source if possible",
                important: true,
                details: "Use a non-conductive object (wooden broom) to separate person from source if needed"
            },
            {
                text: "Call emergency services immediately",
                important: true
            },
            {
                text: "Once the person is clear of the electrical source, check for breathing and pulse",
                important: true
            },
            {
                text: "Begin CPR if needed",
                important: true
            },
            {
                text: "Look for entry and exit burns and treat as thermal burns",
                important: false
            },
            {
                text: "Keep the person lying down and warm until help arrives",
                important: false
            }
        ],
        donts: [
            "Don't use bare hands to pull someone from an electrical source",
            "Don't move the person unless absolutely necessary (potential spinal injury)",
            "Don't underestimate low-voltage shocks - internal injuries may exist"
        ],
        medicalHelp: "All electrical injuries require medical evaluation, even if no visible injury exists. Internal damage may be severe.",
        image: "https://surefirecpr.com/wp-content/uploads/how-to-perform-basic-first-aid-for-electric-shock.jpg",
        alert: "High voltage shocks can cause cardiac arrest! Be prepared to perform CPR."
    },
    {
        id: 8,
        title: "Heat Stroke",
        description: "When body temperature rises dangerously high",
        category: "environmental",
        severity: "critical",
        symptoms: [
            "High body temperature (104°F/40°C or higher)",
            "Altered mental state (confusion, agitation, slurred speech)",
            "Hot, dry skin (though may be moist from exertion)",
            "Nausea and vomiting",
            "Flushed skin",
            "Rapid breathing",
            "Racing heart rate",
            "Headache",
            "Loss of consciousness"
        ],
        steps: [
            {
                text: "Call emergency services immediately",
                important: true
            },
            {
                text: "Move the person to a cooler environment",
                important: true
            },
            {
                text: "Remove excess clothing",
                important: false
            },
            {
                text: "Cool the person with whatever means available (cool water, ice packs to neck/groin/armpits)",
                important: true,
                details: "Immerse in cool water if possible, or wet skin and fan vigorously"
            },
            {
                text: "Monitor body temperature and continue cooling until temperature drops to 101-102°F (38.3-38.9°C)",
                important: true
            },
            {
                text: "If conscious and able to swallow, provide cool water to drink",
                important: false
            }
        ],
        donts: [
            "Don't give fluids if the person is unconscious",
            "Don't use alcohol rubs",
            "Don't give medications to reduce fever",
            "Don't leave the person unattended"
        ],
        medicalHelp: "Heat stroke is a medical emergency! Even after cooling, the person needs hospital evaluation for potential complications.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSArDnUq_renUZpSRSPUp81u-3I7OBpI-24XQ&s",
        alert: "Heat stroke can be fatal! Rapid cooling is essential while waiting for emergency services."
    }
];

// DOM elements
const emergencyListEl = document.getElementById('emergency-list');
const emergencyDetailsEl = document.getElementById('emergency-details');
const detailTitleEl = document.getElementById('detail-title');
const emergencyTagEl = document.getElementById('emergency-tag');
const alertBannerEl = document.getElementById('alert-banner');
const symptomsListEl = document.getElementById('symptoms-list');
const stepsContainerEl = document.getElementById('steps-container');
const dontsListEl = document.getElementById('donts-list');
const medicalHelpEl = document.getElementById('medical-help');
const emergencyImageEl = document.getElementById('emergency-image');
const backBtn = document.getElementById('back-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const emergencyBtn = document.getElementById('emergency-btn');
const emergencyModal = document.getElementById('emergency-modal');
const closeModalBtn = document.querySelector('.close-btn');
const printContactsBtn = document.getElementById('print-contacts-btn');

// Initialize the app
function init() {
    renderEmergencyList(emergencies);
    
    // Set up search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    // Set up back button
    backBtn.addEventListener('click', () => {
        emergencyDetailsEl.style.display = 'none';
        emergencyListEl.style.display = 'grid';
    });
    
    // Set up filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterEmergencies(btn.dataset.filter);
        });
    });
    
    // Set up emergency contacts modal
    emergencyBtn.addEventListener('click', () => {
        emergencyModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    closeModalBtn.addEventListener('click', () => {
        emergencyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === emergencyModal) {
            emergencyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Set up print contacts button
    printContactsBtn.addEventListener('click', () => {
        window.print();
    });
}

// Render the list of emergencies
function renderEmergencyList(emergenciesToRender) {
    emergencyListEl.innerHTML = '';
    
    if (emergenciesToRender.length === 0) {
        emergencyListEl.innerHTML = '<p class="no-results">No emergencies found matching your search.</p>';
        return;
    }
    
    emergenciesToRender.forEach(emergency => {
        const emergencyItem = document.createElement('div');
        emergencyItem.className = 'emergency-item';
        
        // Determine tag class based on category
        let tagClass = '';
        switch(emergency.category) {
            case 'medical':
                tagClass = 'tag-medical';
                break;
            case 'trauma':
                tagClass = 'tag-trauma';
                break;
            case 'environmental':
                tagClass = 'tag-environmental';
                break;
        }
        
        emergencyItem.innerHTML = `
            <span class="emergency-tag ${tagClass}">${emergency.category}</span>
            <h3>${emergency.title}</h3>
            <p>${emergency.description}</p>
            <div class="severity-indicator">Severity: ${emergency.severity}</div>
        `;
        
        emergencyItem.addEventListener('click', () => showEmergencyDetails(emergency));
        
        emergencyListEl.appendChild(emergencyItem);
    });
}

// Show details for a specific emergency
function showEmergencyDetails(emergency) {
    emergencyListEl.style.display = 'none';
    emergencyDetailsEl.style.display = 'block';
    
    detailTitleEl.textContent = emergency.title;
    
    // Set emergency tag
    let tagClass = '';
    switch(emergency.category) {
        case 'medical':
            tagClass = 'tag-medical';
            break;
        case 'trauma':
            tagClass = 'tag-trauma';
            break;
        case 'environmental':
            tagClass = 'tag-environmental';
            break;
    }
    emergencyTagEl.className = `emergency-tag ${tagClass}`;
    emergencyTagEl.textContent = emergency.category;
    
    // Set alert banner if exists
    if (emergency.alert) {
        alertBannerEl.textContent = emergency.alert;
        alertBannerEl.style.display = 'block';
    } else {
        alertBannerEl.style.display = 'none';
    }
    
    // Set symptoms
    symptomsListEl.innerHTML = '';
    emergency.symptoms.forEach(symptom => {
        const li = document.createElement('li');
        li.textContent = symptom;
        symptomsListEl.appendChild(li);
    });
    
    // Set steps
    stepsContainerEl.innerHTML = '';
    emergency.steps.forEach((step, index) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'step';
        
        const stepNumber = document.createElement('div');
        stepNumber.className = 'step-number';
        stepNumber.textContent = index + 1;
        
        const stepContent = document.createElement('div');
        stepContent.className = 'step-content';
        stepContent.innerHTML = `<strong>${step.text}</strong>`;
        
        if (step.details) {
            const details = document.createElement('div');
            details.className = 'step-details';
            details.textContent = step.details;
            stepContent.appendChild(details);
        }
        
        if (step.important) {
            stepContent.innerHTML += ' <span class="important-marker">(Important!)</span>';
        }
        
        stepEl.appendChild(stepNumber);
        stepEl.appendChild(stepContent);
        stepsContainerEl.appendChild(stepEl);
    });
    
    // Set don'ts
    dontsListEl.innerHTML = '';
    emergency.donts.forEach(dont => {
        const li = document.createElement('li');
        li.textContent = dont;
        dontsListEl.appendChild(li);
    });
    
    // Set medical help info
    medicalHelpEl.innerHTML = `<p>${emergency.medicalHelp}</p>`;
    
    // Set image
    if (emergency.image) {
        emergencyImageEl.innerHTML = `<img src="${emergency.image}" alt="${emergency.title}">`;
    } else {
        emergencyImageEl.innerHTML = '';
    }
    
    // Scroll to top of details
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Filter emergencies by category
function filterEmergencies(filter) {
    let filteredEmergencies = [];
    
    if (filter === 'all') {
        filteredEmergencies = emergencies;
    } else {
        filteredEmergencies = emergencies.filter(emergency => emergency.category === filter);
    }
    
    renderEmergencyList(filteredEmergencies);
    
    // Clear search input when filtering
    searchInput.value = '';
}

// Handle search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        // If search is empty, show all emergencies of the current filter
        const currentFilter = document.querySelector('.filter-btn.active').dataset.filter;
        filterEmergencies(currentFilter);
        return;
    }
    
    const filteredEmergencies = emergencies.filter(emergency => 
        emergency.title.toLowerCase().includes(searchTerm) ||
        emergency.description.toLowerCase().includes(searchTerm) ||
        emergency.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm)) ||
        emergency.steps.some(step => step.text.toLowerCase().includes(searchTerm)) ||
        emergency.donts.some(dont => dont.toLowerCase().includes(searchTerm)) ||
        emergency.medicalHelp.toLowerCase().includes(searchTerm)
    );
    
    renderEmergencyList(filteredEmergencies);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);