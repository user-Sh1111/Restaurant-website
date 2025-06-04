const restaurantName = "Granada";

// Mock news data as fallback
const mockNewsData = [
    {
        id: 1,
        title: "Art Party from Michael Art",
        body: "We invite you to spend with us the brightest and most exclusive event of this year from the Michael Art studio.\n\nWhen? April 6 at 17:00\nWhere? Restaurant Granada\nAddress: Kabanbay Batyr str. 49\n\nSign up on Instagram or at ticket sites. Cost: 19,000 tenge",
        date: "2025-03-14"
    },
    {
        id: 2,
        title: "Iftar Menu",
        body: "We invite you to spend iftar in our restaurant, where you will find delicious food and a cozy atmosphere.\n\nWhen? Every day during Ramadan\nWhere? Restaurant Granada\nAddress: Kabanbay Batyr str. 49",
        date: "2025-03-11"
    }
];

// Play click sound for interactive elements
function playClickSound() {
    const clickSound = document.getElementById("clickSound");
    if (clickSound) {
        clickSound.play();
    }
}

// Fetch and display news from local JSON with fallback
function fetchNews() {
    const newsContainer = document.getElementById("newsContainer");
    if (!newsContainer) return;

    newsContainer.innerHTML = '<p>Loading news...</p>';

    fetch('news.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load news.json');
            }
            return response.json();
        })
        .then(data => {
            newsContainer.innerHTML = '';
            data.forEach(post => {
                const newsItem = document.createElement('article');
                newsItem.className = 'news1_item';
                newsItem.innerHTML = `
                    <div class="news1_frame">
                        <img src="images/news_${post.id}.png" alt="${post.title}" class="news1_image" loading="lazy">
                        <div class="news_content">
                            <h3>${post.title}</h3>
                            <p>${post.body.replace(/\n/g, '<br>')}</p>
                            <p class="little_text_for_news">Event at ${restaurantName}</p>
                            <p class="news_date">Published: ${post.date}</p>
                        </div>
                    </div>
                `;
                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
            // Fallback to mockNewsData
            newsContainer.innerHTML = '';
            mockNewsData.forEach(post => {
                const newsItem = document.createElement('article');
                newsItem.className = 'news1_item';
                newsItem.innerHTML = `
                    <div class="news1_frame">
                        <img src="images/news_${post.id}.png" alt="${post.title}" class="news1_image" loading="lazy">
                        <div class="news_content">
                            <h3>${post.title}</h3>
                            <p>${post.body.replace(/\n/g, '<br>')}</p>
                            <p class="little_text_for_news">Event at ${restaurantName}</p>
                            <p class="news_date">Published: ${post.date}</p>
                        </div>
                    </div>
                `;
                newsContainer.appendChild(newsItem);
            });
        });
}

// Validate banquet form inputs
function validateForm() {
    const form = document.getElementById("banquetForm");
    if (!form) return;

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let isValid = true;

        const fullName = document.getElementById("fullName");
        const guests = document.getElementById("guests");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const banquetType = document.getElementById("banquetType");
        const date = document.getElementById("date");
        const startTime = document.getElementById("startTime");
        const endTime = document.getElementById("endTime");

        const setError = (element, message) => {
            const errorElement = document.getElementById(`${element.id}Error`);
            errorElement.textContent = message;
            isValid = false;
        };

        const clearErrors = () => {
            document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
        };

        clearErrors();

        if (!fullName.value.match(/^[A-Za-z\s]+$/)) {
            setError(fullName, "Only letters and spaces allowed");
        }
        if (guests.value < 1 || guests.value > 120) {
            setError(guests, "Must be between 1 and 120");
        }
        if (!email.value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            setError(email, "Enter a valid email");
        }
        if (!phone.value.match(/\+?[0-9]{10,12}/)) {
            setError(phone, "Enter a valid phone number (10-12 digits)");
        }
        if (!banquetType.value) {
            setError(banquetType, "Please select a banquet type");
        }
        if (!date.value || new Date(date.value) < new Date("2025-06-04")) {
            setError(date, "Select a valid future date");
        }
        if (!startTime.value) {
            setError(startTime, "Select a start time");
        }
        if (!endTime.value) {
            setError(endTime, "Select an end time");
        }

        if (isValid) {
            alert("Banquet request submitted successfully!");
            form.reset();
        }
    });
}

// Update UI based on login status
function updateAccountUI() {
    const username = localStorage.getItem("username");
    const accountBtn = document.querySelector(".account-btn");
    const logoutBtn = document.querySelector(".logout-btn");
    const accountGreeting = document.getElementById("accountGreeting");

    if (username) {
        accountBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        accountGreeting.style.display = "inline-block";
        accountGreeting.textContent = `Welcome, ${username}`;
    } else {
        accountBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
        accountGreeting.style.display = "none";
    }
}

// Initialize event listeners on page load
document.addEventListener('DOMContentLoaded', function() {
    const toggleSectionBtn = document.getElementById("toggleSectionBtn");
    const newsSection = document.getElementById("newsSection");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("nav ul");
    const accountBtn = document.querySelector(".account-btn");
    const logoutBtn = document.querySelector(".logout-btn");
    const modal = document.querySelector(".modal");
    const closeModal = document.querySelector(".close-modal");
    const loginBtn = document.querySelector(".login-btn");
    const registerBtn = document.querySelector(".register-btn");
    const viewMenuBtn = document.getElementById("viewMenuBtn");

    // Toggle news section
    if (toggleSectionBtn && newsSection) {
        toggleSectionBtn.addEventListener("click", function() {
            newsSection.style.display = newsSection.style.display === "none" ? "block" : "none";
            playClickSound();
        });
    }

    // Toggle hamburger menu
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function() {
            navMenu.classList.toggle("open");
            document.body.classList.toggle("menu-open");
            playClickSound();
        });
    }

    // Open login/register modal
    if (accountBtn && modal) {
        accountBtn.addEventListener("click", function() {
            modal.style.display = "flex";
            playClickSound();
        });
    }

    // Close modal
    if (closeModal && modal) {
        closeModal.addEventListener("click", function() {
            modal.style.display = "none";
            playClickSound();
        });
    }

    // Handle login
    if (loginBtn && modal) {
        loginBtn.addEventListener("click", function() {
            const username = document.querySelector("#login-username").value;
            const password = document.querySelector("#login-password").value;
            const storedPassword = localStorage.getItem(`password_${username}`);
            if (username && password && storedPassword === password) {
                localStorage.setItem("username", username);
                updateAccountUI();
                modal.style.display = "none";
                alert(`Welcome back, ${username}!`);
                playClickSound();
            } else if (username && password) {
                alert("Invalid username or password");
            } else {
                alert("Please fill in both username and password");
            }
        });
    }

    // Handle registration
    if (registerBtn && modal) {
        registerBtn.addEventListener("click", function() {
            const username = document.querySelector("#login-username").value;
            const password = document.querySelector("#login-password").value;
            if (username && password) {
                if (localStorage.getItem(`password_${username}`)) {
                    alert("Username already exists");
                } else {
                    localStorage.setItem(`password_${username}`, password);
                    localStorage.setItem("username", username);
                    updateAccountUI();
                    modal.style.display = "none";
                    alert(`Registered successfully, ${username}!`);
                    playClickSound();
                }
            } else {
                alert("Please fill in both username and password");
            }
        });
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            localStorage.removeItem("username");
            updateAccountUI();
            playClickSound();
        });
    }

    // Placeholder for menu button
    if (viewMenuBtn) {
        viewMenuBtn.addEventListener("click", function() {
            alert("Full menu coming soon!");
            playClickSound();
        });
    }

    validateForm();
    updateAccountUI();
    fetchNews();
});