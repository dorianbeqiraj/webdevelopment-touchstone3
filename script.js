// 1. DATA STRUCTURES (Array of Objects - Meets requirement for 2 Data Structures)
const availableClasses = [
    { id: 1, name: "Morning Yoga & Stretch", category: "Wellness", duration: "45 mins" },
    { id: 2, name: "HIIT Cardio Blast", category: "Fitness", duration: "60 mins" },
    { id: 3, name: "Full Body Strength", category: "Gym", duration: "50 mins" },
    { id: 4, name: "Evening Pilates", category: "Wellness", duration: "45 mins" }
];

let savedFavorites = [];

// Load stored data when the page finishes loading
document.addEventListener("DOMContentLoaded", function() {
    renderClassList();
    loadStoredFavorites();
    setupFormValidation();
});

// 2. INTERACTIVE FEATURE (Display and Save User Preferences)
function renderClassList() {
    const container = document.getElementById("class-list-container");
    if (!container) return;

    container.innerHTML = "";

    availableClasses.forEach(function(item) {
        const card = document.createElement("div");
        card.className = "class-card";
        
        // Check if the current class is already saved as a favorite
        const isSaved = savedFavorites.some(fav => fav.id === item.id);
        
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Category:</strong> ${item.category} | <strong>Duration:</strong> ${item.duration}</p>
            <button class="fav-btn" onclick="toggleFavorite(${item.id})">
                ${isSaved ? "❤️ Saved to Favorites" : "🤍 Save to Favorites"}
            </button>
        `;
        container.appendChild(card);
    });

    renderFavoritesList();
}

function toggleFavorite(classId) {
    const selectedClass = availableClasses.find(item => item.id === classId);
    const index = savedFavorites.findIndex(fav => fav.id === classId);
    
    if (index === -1) {
        // Add item to favorites if not already saved
        savedFavorites.push(selectedClass);
    } else {
        // Remove item from favorites if clicked again
        savedFavorites.splice(index, 1);
    }

    saveFavoritesToStorage();
    renderClassList();
}

function renderFavoritesList() {
    const favContainer = document.getElementById("favorites-container");
    if (!favContainer) return;

    if (savedFavorites.length === 0) {
        favContainer.innerHTML = "<p>No favorite classes saved yet.</p>";
        return;
    }

    favContainer.innerHTML = "<h4>Your Saved Favorites:</h4><ul>" + 
        savedFavorites.map(item => `<li>${item.name} (${item.duration})</li>`).join('') + 
        "</ul>";
}

// 3. BROWSER STORAGE (localStorage)
function saveFavoritesToStorage() {
    localStorage.setItem("userFavoriteClasses", JSON.stringify(savedFavorites));
}

function loadStoredFavorites() {
    const storedData = localStorage.getItem("userFavoriteClasses");
    if (storedData) {
        savedFavorites = JSON.parse(storedData);
        renderClassList();
    }
}

// 4. FORM VALIDATION (Inline Error Feedback)
function setupFormValidation() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function(event) {
        let isValid = true;

        const nameInput = document.getElementById("username");
        const emailInput = document.getElementById("useremail");
        const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");

        // Clear previous error messages
        nameError.textContent = "";
        emailError.textContent = "";

        // Check 1: Required Name & Minimum Length
        if (nameInput.value.trim() === "") {
            nameError.textContent = "Please enter your name.";
            isValid = false;
        } else if (nameInput.value.trim().length < 3) {
            name
