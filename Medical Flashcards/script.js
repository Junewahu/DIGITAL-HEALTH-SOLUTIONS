// Flashcard database
const flashcardSets = {
    "Anatomy": [
        {
            question: "What is the largest organ in the human body?",
            answer: "The skin (integumentary system)"
        },
        {
            question: "Which bone is commonly known as the collarbone?",
            answer: "Clavicle"
        },
        {
            question: "What structure connects muscles to bones?",
            answer: "Tendons (ligaments connect bone to bone)"
        },
        {
            question: "Which part of the brain is responsible for coordination and balance?",
            answer: "Cerebellum"
        },
        {
            question: "What is the name of the artery that supplies blood to the heart muscle itself?",
            answer: "Coronary arteries"
        }
    ],
    "Pharmacology": [
        {
            question: "What is the mechanism of action of beta-blockers?",
            answer: "They block β-adrenergic receptors, reducing effects of adrenaline/noradrenaline, decreasing heart rate and blood pressure."
        },
        {
            question: "Which class of drugs is commonly used as first-line treatment for hypertension?",
            answer: "ACE inhibitors or thiazide diuretics"
        },
        {
            question: "What is the antidote for opioid overdose?",
            answer: "Naloxone"
        },
        {
            question: "Which antibiotic class is associated with tendon rupture risk?",
            answer: "Fluoroquinolones (e.g., ciprofloxacin)"
        },
        {
            question: "What is the therapeutic use of warfarin?",
            answer: "Anticoagulation to prevent and treat thromboembolic disorders"
        }
    ],
    "Pathology": [
        {
            question: "What are the hallmark microscopic features of malignant cells?",
            answer: "1. Pleomorphism (variation in size/shape)<br>2. Hyperchromatic nuclei<br>3. Increased nuclear-to-cytoplasmic ratio<br>4. Mitotic figures<br>5. Loss of polarity"
        },
        {
            question: "What is the most common cause of myocardial infarction?",
            answer: "Atherosclerosis with acute thrombosis (rupture of atherosclerotic plaque)"
        },
        {
            question: "Which pathological process is characterized by caseating granulomas?",
            answer: "Tuberculosis"
        },
        {
            question: "What are the four cardinal signs of inflammation?",
            answer: "Rubor (redness), Tumor (swelling), Calor (heat), Dolor (pain)"
        },
        {
            question: "Which tumor marker is associated with hepatocellular carcinoma?",
            answer: "Alpha-fetoprotein (AFP)"
        }
    ],
    "Clinical Skills": [
        {
            question: "What are the components of a complete history taking?",
            answer: "1. Presenting complaint<br>2. History of presenting complaint<br>3. Past medical history<br>4. Drug history/allergies<br>5. Family history<br>6. Social history<br>7. Systems review"
        },
        {
            question: "How do you calculate the anion gap?",
            answer: "Anion Gap = (Na+) - (Cl- + HCO3-). Normal range: 8-12 mEq/L"
        },
        {
            question: "What are the diagnostic criteria for diabetes mellitus?",
            answer: "Any of:<br>1. Fasting glucose ≥7.0 mmol/L (126 mg/dL)<br>2. Random glucose ≥11.1 mmol/L (200 mg/dL) with symptoms<br>3. HbA1c ≥6.5% (48 mmol/mol)<br>4. 2h post 75g OGTT ≥11.1 mmol/L (200 mg/dL)"
        },
        {
            question: "What are the signs of meningeal irritation?",
            answer: "1. Neck stiffness<br>2. Kernig's sign (pain on knee extension with hip flexed)<br>3. Brudzinski's sign (hip flexion when neck is flexed)"
        },
        {
            question: "How do you interpret arterial blood gas (ABG) results?",
            answer: "ROME method:<br>Respiratory Opposite (pH & pCO2 move opposite directions)<br>Metabolic Equal (pH & HCO3 move same direction)"
        }
    ]
};

// App state
let currentState = {
    mode: null, // 'memorize' or 'test'
    category: null,
    currentCardIndex: 0,
    shuffledCards: [],
    masteredCards: [],
    bookmarkedCards: [],
    cardRatings: {} // Stores difficulty ratings for spaced repetition
};

// DOM elements
const modeSelectionEl = document.getElementById('mode-selection');
const categorySelectionEl = document.getElementById('category-selection');
const flashcardContainerEl = document.getElementById('flashcard-container');
const bookmarksViewEl = document.getElementById('bookmarks-view');
const categoryOptionsEl = document.getElementById('category-options');
const flashcardEl = document.getElementById('flashcard');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const currentCategoryEl = document.getElementById('current-category');
const progressFillEl = document.getElementById('progress-fill');
const progressTextEl = document.getElementById('progress-text');
const remainingCountEl = document.getElementById('remaining-count');
const masteredCountEl = document.getElementById('mastered-count');
const bookmarkedCountEl = document.getElementById('bookmarked-count');
const bookmarksListEl = document.getElementById('bookmarks-list');
const bookmarkBtn = document.getElementById('bookmark-btn');

// Initialize the app
function init() {
    // Set up mode selection
    document.getElementById('memorize-mode').addEventListener('click', () => {
        currentState.mode = 'memorize';
        showCategorySelection();
    });
    
    document.getElementById('test-mode').addEventListener('click', () => {
        currentState.mode = 'test';
        showCategorySelection();
    });
    
    // Set up back buttons
    document.getElementById('back-to-modes').addEventListener('click', showModeSelection);
    document.getElementById('back-to-categories').addEventListener('click', showCategorySelection);
    document.getElementById('back-from-bookmarks').addEventListener('click', showFlashcardView);
    
    // Set up navigation buttons
    document.getElementById('prev-btn').addEventListener('click', showPreviousCard);
    document.getElementById('next-btn').addEventListener('click', showNextCard);
    document.getElementById('shuffle-btn').addEventListener('click', shuffleCards);
    
    // Set up bookmark button
    bookmarkBtn.addEventListener('click', toggleBookmark);
    
    // Set up difficulty rating buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => rateCardDifficulty(parseInt(btn.dataset.rating)));
    });
    
    // Initialize category selection
    initCategorySelection();
    
    // Start with mode selection
    showModeSelection();
}

function initCategorySelection() {
    categoryOptionsEl.innerHTML = '';
    
    Object.keys(flashcardSets).forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = category;
        btn.addEventListener('click', () => startFlashcardSession(category));
        categoryOptionsEl.appendChild(btn);
    });
}

function showModeSelection() {
    modeSelectionEl.style.display = 'block';
    categorySelectionEl.style.display = 'none';
    flashcardContainerEl.style.display = 'none';
    bookmarksViewEl.style.display = 'none';
}

function showCategorySelection() {
    modeSelectionEl.style.display = 'none';
    categorySelectionEl.style.display = 'block';
    flashcardContainerEl.style.display = 'none';
    bookmarksViewEl.style.display = 'none';
}

function showFlashcardView() {
    modeSelectionEl.style.display = 'none';
    categorySelectionEl.style.display = 'none';
    flashcardContainerEl.style.display = 'block';
    bookmarksViewEl.style.display = 'none';
}

function showBookmarksView() {
    modeSelectionEl.style.display = 'none';
    categorySelectionEl.style.display = 'none';
    flashcardContainerEl.style.display = 'none';
    bookmarksViewEl.style.display = 'block';
    renderBookmarks();
}

function startFlashcardSession(category) {
    currentState.category = category;
    currentState.currentCardIndex = 0;
    currentState.shuffledCards = [...flashcardSets[category]];
    
    if (currentState.mode === 'test') {
        shuffleArray(currentState.shuffledCards);
    }
    
    showFlashcardView();
    updateCurrentCard();
    updateStats();
}

function updateCurrentCard() {
    const currentCard = currentState.shuffledCards[currentState.currentCardIndex];
    
    if (!currentCard) {
        // No cards in this category (shouldn't happen)
        questionEl.textContent = "No cards available";
        answerEl.textContent = "";
        return;
    }
    
    questionEl.textContent = currentCard.question;
    answerEl.innerHTML = currentCard.answer;
    currentCategoryEl.textContent = currentState.category;
    
    // Reset card to front
    flashcardEl.classList.remove('flipped');
    
    // Update bookmark button
    const isBookmarked = currentState.bookmarkedCards.some(
        card => card.question === currentCard.question && card.category === currentState.category
    );
    bookmarkBtn.innerHTML = isBookmarked ? '<i class="fas fa-bookmark"></i>' : '<i class="far fa-bookmark"></i>';
    bookmarkBtn.classList.toggle('active', isBookmarked);
    
    // Update progress
    const progress = ((currentState.currentCardIndex + 1) / currentState.shuffledCards.length) * 100;
    progressFillEl.style.width = `${progress}%`;
    progressTextEl.textContent = `${currentState.currentCardIndex + 1}/${currentState.shuffledCards.length}`;
}

function showNextCard() {
    if (currentState.currentCardIndex < currentState.shuffledCards.length - 1) {
        currentState.currentCardIndex++;
        updateCurrentCard();
    } else {
        // Reached end of deck
        if (currentState.mode === 'memorize') {
            // In memorize mode, start from beginning
            currentState.currentCardIndex = 0;
            updateCurrentCard();
        } else {
            // In test mode, show completion message
            questionEl.textContent = "You've completed this deck!";
            answerEl.textContent = `You mastered ${currentState.masteredCards.length} out of ${currentState.shuffledCards.length} cards.`;
            flashcardEl.classList.remove('flipped');
        }
    }
}

function showPreviousCard() {
    if (currentState.currentCardIndex > 0) {
        currentState.currentCardIndex--;
        updateCurrentCard();
    }
}

function shuffleCards() {
    shuffleArray(currentState.shuffledCards);
    currentState.currentCardIndex = 0;
    updateCurrentCard();
}

function toggleBookmark() {
    const currentCard = currentState.shuffledCards[currentState.currentCardIndex];
    const bookmarkIndex = currentState.bookmarkedCards.findIndex(
        card => card.question === currentCard.question && card.category === currentState.category
    );
    
    if (bookmarkIndex === -1) {
        // Add bookmark
        currentState.bookmarkedCards.push({
            ...currentCard,
            category: currentState.category
        });
        bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
    } else {
        // Remove bookmark
        currentState.bookmarkedCards.splice(bookmarkIndex, 1);
        bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
    }
    
    bookmarkBtn.classList.toggle('active');
    updateStats();
}

function rateCardDifficulty(rating) {
    const currentCard = currentState.shuffledCards[currentState.currentCardIndex];
    const cardKey = `${currentState.category}-${currentCard.question}`;
    
    currentState.cardRatings[cardKey] = rating;
    
    if (rating === 3) { // Easy - consider mastered
        if (!currentState.masteredCards.some(
            card => card.question === currentCard.question && card.category === currentState.category
        )) {
            currentState.masteredCards.push({
                ...currentCard,
                category: currentState.category
            });
        }
    }
    
    updateStats();
    showNextCard();
}

function updateStats() {
    remainingCountEl.textContent = currentState.shuffledCards.length - currentState.masteredCards.length;
    masteredCountEl.textContent = currentState.masteredCards.length;
    bookmarkedCountEl.textContent = currentState.bookmarkedCards.length;
}

function renderBookmarks() {
    bookmarksListEl.innerHTML = '';
    
    if (currentState.bookmarkedCards.length === 0) {
        bookmarksListEl.innerHTML = '<p>No bookmarked cards yet.</p>';
        return;
    }
    
    // Group by category
    const bookmarksByCategory = {};
    currentState.bookmarkedCards.forEach(card => {
        if (!bookmarksByCategory[card.category]) {
            bookmarksByCategory[card.category] = [];
        }
        bookmarksByCategory[card.category].push(card);
    });
    
    // Render each category
    Object.entries(bookmarksByCategory).forEach(([category, cards]) => {
        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = category;
        bookmarksListEl.appendChild(categoryHeader);
        
        cards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = 'bookmark-card';
            cardEl.innerHTML = `
                <h3>${card.question}</h3>
                <p>${card.answer}</p>
                <span class="category">${category}</span>
            `;
            bookmarksListEl.appendChild(cardEl);
        });
    });
}

// Utility function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);