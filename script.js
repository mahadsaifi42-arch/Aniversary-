// --- Global Variables ---
let currentPage = 1;
const totalPages = 8; // Update this if you add/remove pages

// --- Page Navigation Functions ---
function showPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageNumber;
        // Scroll to top of container when page changes for better mobile experience
        const container = document.querySelector('.container');
        if (container) {
            container.scrollTop = 0;
        }
    }

    // Special handling for game pages if needed on display
    if (pageNumber === 6) {
        resetGame(); // Reset the catch hearts game when navigated to
    }
}

// --- Emoji Guessing Game (Page 2) ---
function revealAnswer(button, answerText) {
    const answerElement = button.nextElementSibling; // Get the <p class="answer"> next to the button
    if (answerElement) {
        answerElement.textContent = answerText;
        answerElement.style.display = 'block';
        button.style.display = 'none'; // Hide the reveal button
    }
}

// --- Hidden Heart Surprise (Page 5) ---
function showHiddenHeartSurprise() {
    alert("Surprise! You found it! 🎉 You're the best at finding treasures, just like you found your way into my heart. 😉");
    // Optionally change the heart's style after clicking
    const hiddenHeart = document.getElementById('hidden-heart');
    if (hiddenHeart) {
        hiddenHeart.style.color = '#8a2be2'; // Change color to purple
        hiddenHeart.style.transform = 'scale(1.5)';
    }
}

// --- Catch the Hearts Game (Page 6) ---
const canvas = document.getElementById('heartGameCanvas');
const ctx = canvas.getContext('2d');
const gameScoreElement = document.getElementById('gameScore');
const startGameBtn = document.getElementById('startGameBtn');
const gameNextBtn = document.getElementById('gameNextBtn');

let score = 0;
let hearts = [];
let bucket = { x: canvas.width / 2 - 25, y: canvas.height - 30, width: 50, height: 20 }; // Adjusted bucket size
let gameInterval;
let heartSpawnInterval;
let gameRunning = false;
const targetScore = 15;

function resetGame() {
    score = 0;
    hearts = [];
    gameRunning = false;
    gameScoreElement.textContent = `sᴄᴏʀᴇ: 0 / ${targetScore}`;
    startGameBtn.style.display = 'inline-block';
    gameNextBtn.style.display = 'none';
    clearInterval(gameInterval);
    clearInterval(heartSpawnInterval);
    drawGame(); // Clear canvas and draw initial state
}


function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw hearts
    ctx.font = '20px Arial';
    hearts.forEach(heart => {
        ctx.fillStyle = heart.color;
        ctx.fillText('❤️', heart.x, heart.y); // Use emoji heart
    });

    // Draw bucket
    ctx.fillStyle = '#ff69b4';
    ctx.fillRect(bucket.x, bucket.y, bucket.width, bucket.height);
    ctx.strokeStyle = '#c71585';
    ctx.lineWidth = 2;
    ctx.strokeRect(bucket.x, bucket.y, bucket.width, bucket.height);

    // Draw bucket handle/details
    ctx.beginPath();
    ctx.arc(bucket.x + bucket.width / 2, bucket.y + bucket.height / 2, bucket.width / 3, 0, Math.PI, true);
    ctx.strokeStyle = '#c71585';
    ctx.stroke();
}

function updateGame() {
    // Move hearts
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].y += hearts[i].speed;

        // Check for collision with bucket
        if (
            hearts[i].y + 20 > bucket.y && // Heart's bottom touches bucket's top
            hearts[i].x + 10 > bucket.x && // Heart's right edge past bucket's left
            hearts[i].x < bucket.x + bucket.width // Heart's left edge before bucket's right
        ) {
            score++;
            gameScoreElement.textContent = `sᴄᴏʀᴇ: ${score} / ${targetScore}`;
            hearts.splice(i, 1); // Remove caught heart
            i--;

            if (score >= targetScore) {
                endGame();
                return; // Stop updating if game ends
            }
        }

        // Remove hearts that go off-screen
        if (hearts[i] && hearts[i].y > canvas.height) {
            hearts.splice(i, 1);
            i--;
        }
    }

    drawGame();
}

function spawnHeart() {
    if (!gameRunning) return;
    const x = Math.random() * (canvas.width - 20);
    const speed = 1 + Math.random() * 2; // Random speed
    const color = `hsl(${Math.random() * 360}, 70%, 60%)`; // Random color
    hearts.push({ x: x, y: 0, speed: speed, color: color });
}

function endGame() {
    gameRunning = false;
    clearInterval(gameInterval);
    clearInterval(heartSpawnInterval);
    alert(`ʏᴏᴜ ᴄᴀᴜɢʜᴛ ${score} ʜᴇᴀʀᴛs! ɢʀᴇᴀᴛ ᴊᴏʙ, ᴍʏ ʟᴏᴠᴇ! ✨`);
    gameNextBtn.style.display = 'inline-block'; // Show the next page button
    startGameBtn.style.display = 'none'; // Hide start button
}

function startGame() {
    if (gameRunning) return; // Prevent multiple starts
    score = 0;
    hearts = [];
    gameRunning = true;
    gameScoreElement.textContent = `sᴄᴏʀᴇ: 0 / ${targetScore}`;
    startGameBtn.style.display = 'none'; // Hide the start button
    gameNextBtn.style.display = 'none'; // Hide next button until game is won

    gameInterval = setInterval(updateGame, 1000 / 60); // 60 FPS
    heartSpawnInterval = setInterval(spawnHeart, 1000); // Spawn a heart every second

    // Make canvas focusable for keyboard controls
    canvas.focus();
}

// Keyboard controls for bucket
canvas.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    const bucketSpeed = 20;
    if (e.key === 'ArrowLeft' && bucket.x > 0) {
        bucket.x -= bucketSpeed;
    } else if (e.key === 'ArrowRight' && bucket.x < canvas.width - bucket.width) {
        bucket.x += bucketSpeed;
    }
    drawGame(); // Redraw bucket position immediately
});

// Touch/Mouse controls for bucket (Drag)
let isDragging = false;
canvas.addEventListener('mousedown', (e) => {
    if (!gameRunning) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    if (mouseX > bucket.x && mouseX < bucket.x + bucket.width && e.clientY - rect.top > bucket.y) {
        isDragging = true;
        canvas.style.cursor = 'grabbing';
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!gameRunning || !isDragging) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    bucket.x = mouseX - bucket.width / 2; // Center bucket on mouse

    // Keep bucket within canvas bounds
    if (bucket.x < 0) bucket.x = 0;
    if (bucket.x > canvas.width - bucket.width) bucket.x = canvas.width - bucket.width;
    drawGame();
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
    canvas.style.cursor = 'grab';
});

canvas.addEventListener('mouseleave', () => { // Stop dragging if mouse leaves canvas
    isDragging = false;
    canvas.style.cursor = 'grab';
});

// Touch events for mobile
canvas.addEventListener('touchstart', (e) => {
    if (!gameRunning) return;
    const rect = canvas.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    if (touchX > bucket.x && touchX < bucket.x + bucket.width && e.touches[0].clientY - rect.top > bucket.y) {
        isDragging = true;
    }
    e.preventDefault(); // Prevent scrolling
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
    if (!gameRunning || !isDragging) return;
    const rect = canvas.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    bucket.x = touchX - bucket.width / 2;

    if (bucket.x < 0) bucket.x = 0;
    if (bucket.x > canvas.width - bucket.width) bucket.x = canvas.width - bucket.width;
    drawGame();
    e.preventDefault(); // Prevent scrolling
}, { passive: false });

canvas.addEventListener('touchend', () => {
    isDragging = false;
});

// Initialize game on page load for the first time
document.addEventListener('DOMContentLoaded', () => {
    drawGame(); // Draw initial empty game state
});


// --- Heart Rain Animation ---
function createHeartRain() {
    const heartRainContainer = document.querySelector('.heart-rain-container');
    const numberOfHearts = 30; // Number of hearts to fall simultaneously

    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖'; // Use the emoji heart
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 5}s`; // 5 to 8 seconds
        heart.style.animationDelay = `${Math.random() * 5}s`; // Stagger delays
        heart.style.setProperty('--fall-direction', `${Math.random() * 100 - 50}px`); // Slight horizontal drift
        heartRainContainer.appendChild(heart);
    }
}

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    showPage(1); // Show the first page when the document loads
    createHeartRain(); // Start the heart rain animation
});