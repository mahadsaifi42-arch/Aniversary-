// Rexx ❤️ Fatima - Romantic Web App JavaScript

let currentPage = 1;
let totalPages = 10;
let gameScore = 0;
let gameInterval;
let heartsInterval;

// Teasing dialogues
const teasingDialogues = [
    "Ap itni cute kyu hain Fatima ji 😜?",
    "Aray Rexx, ap to bade badmaash nikle 😳💋",
    "Main badmaash nahi… bas ap pe fida hoon 😚",
    "Fatima, apki aankhon me kya jadoo hai? 💫",
    "Rexx ji, ap to har baat pe blush karwa dete hain 😳",
    "Bas itna pyaar kya zaroori hai? 💞",
    "Ap mere dil me rehte ho, Fatima 💕",
    "Aray, ye kya baat hui? 😚💋",
    "Main to sirf sach bol raha tha 😏",
    "Ap bhi na, itni sharmati hain 😳"
];

// Truth or Dare questions
const truthDareQuestions = [
    "Sach sach batayein, ap ne pehli baat kab socha tha mere baare me 😚?",
    "Ek line likhiye jo Rexx ko blush kara de 💞",
    "Aray Rexx ji, dare hai — 'I love you' likhiye bada bold 😜",
    "Apko sabse zyada kya pasand hai mere andar? 💕",
    "Dare: Apne phone me meri photo set kariye wallpaper pe 😏",
    "Truth: Apne kabhi socha tha ke hum ek din saath honge? 💫",
    "Dare: Mujhe 5 compliments dijiye abhi 😚",
    "Truth: Apko lagta hai main romantic hoon? 💞",
    "Dare: Ek shayari sunaiye mere liye 💕",
    "Truth: Apko kya lagta hai, main perfect boyfriend hoon? 😳"
];

// Fatima bot responses
const fatimaResponses = [
    "Aray Rexx, ap bhi na… blush karwa dete hain 😳💞",
    "Haha, ap to bade cute hain 😚",
    "Main to bas sach bol rahi thi 💕",
    "Ap mere liye perfect hain, Rexx 💞",
    "Ye baat to main bhi sochti hun 😳",
    "Ap itne sweet kyu hain? 💕",
    "Main to bas apki tarah hi hun 😚",
    "Ye to main bhi kehti hun 💞",
    "Ap mere dil me rehte ho 😳💕",
    "Main bhi apko miss karti hun 😚"
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    showPage(1);
    startCountdown();
    startFloatingEmojis();
});

// Page navigation
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}

function showPage(pageNumber) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show current page
    const currentPageElement = document.getElementById(`page${pageNumber}`);
    if (currentPageElement) {
        currentPageElement.classList.add('active');
        
        // Special page initializations
        if (pageNumber === 3) {
            showTeasingDialogue();
        } else if (pageNumber === 4) {
            initHeartGame();
        } else if (pageNumber === 7) {
            updateCountdown();
        }
    }
}

// Teasing dialogues
function showTeasingDialogue() {
    const dialogueText = document.getElementById('dialogue-text');
    if (dialogueText) {
        const randomDialogue = teasingDialogues[Math.floor(Math.random() * teasingDialogues.length)];
        dialogueText.textContent = randomDialogue;
    }
}

function nextTeasingDialogue() {
    showTeasingDialogue();
}

// Heart Bucket Game
function initHeartGame() {
    gameScore = 0;
    updateScore();
    startHeartFall();
    
    // Add keyboard controls
    document.addEventListener('keydown', moveBucket);
    
    // Add touch controls for mobile
    const bucket = document.getElementById('bucket');
    if (bucket) {
        bucket.addEventListener('touchstart', handleTouch);
    }
}

function startHeartFall() {
    heartsInterval = setInterval(createHeart, 1500);
}

function createHeart() {
    const heartsContainer = document.getElementById('hearts-container');
    if (!heartsContainer) return;
    
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 90 + '%';
    heart.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 3000);
}

function moveBucket(e) {
    const bucket = document.getElementById('bucket');
    if (!bucket) return;
    
    const gameArea = bucket.parentElement;
    const bucketWidth = 60; // Approximate bucket width
    const maxLeft = gameArea.offsetWidth - bucketWidth;
    
    let newLeft = bucket.offsetLeft;
    
    if (e.key === 'ArrowLeft' && newLeft > 0) {
        newLeft -= 20;
    } else if (e.key === 'ArrowRight' && newLeft < maxLeft) {
        newLeft += 20;
    }
    
    bucket.style.left = newLeft + 'px';
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const bucket = document.getElementById('bucket');
    const gameArea = bucket.parentElement;
    const rect = gameArea.getBoundingClientRect();
    const newLeft = touch.clientX - rect.left - 30; // Center the bucket
    
    bucket.style.left = Math.max(0, Math.min(newLeft, gameArea.offsetWidth - 60)) + 'px';
}

// Check for heart collision
function checkCollision(heart, bucket) {
    const heartRect = heart.getBoundingClientRect();
    const bucketRect = bucket.getBoundingClientRect();
    
    return heartRect.left < bucketRect.right &&
           heartRect.right > bucketRect.left &&
           heartRect.bottom > bucketRect.top &&
           heartRect.top < bucketRect.bottom;
}

// Update score
function updateScore() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = gameScore;
    }
}

// Truth or Dare
function showTruthOrDare() {
    const questionBox = document.getElementById('question-box');
    if (questionBox) {
        const randomQuestion = truthDareQuestions[Math.floor(Math.random() * truthDareQuestions.length)];
        questionBox.innerHTML = `<p>${randomQuestion}</p>`;
        questionBox.classList.add('fade-in');
    }
}

// Love Letter
function openLetter() {
    const envelope = document.getElementById('envelope');
    const letterContent = document.getElementById('letter-content');
    
    if (envelope && letterContent) {
        envelope.classList.add('opened');
        setTimeout(() => {
            letterContent.style.display = 'block';
            letterContent.classList.add('fade-in');
        }, 500);
    }
}

// Countdown Timer
function startCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const targetDate = new Date('2033-01-01T00:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = targetDate - now;
    
    if (timeLeft > 0) {
        const years = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((timeLeft % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((timeLeft % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        const yearsElement = document.getElementById('years');
        const monthsElement = document.getElementById('months');
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        
        if (yearsElement) yearsElement.textContent = years;
        if (monthsElement) monthsElement.textContent = months;
        if (daysElement) daysElement.textContent = days;
        if (hoursElement) hoursElement.textContent = hours;
    }
}

// Quiz functionality
function selectOption(option) {
    const response = document.getElementById('fatima-response');
    if (response) {
        const randomResponse = fatimaResponses[Math.floor(Math.random() * fatimaResponses.length)];
        response.innerHTML = `<p>Fatima Bot 💬: ${randomResponse}</p>`;
        response.classList.add('fade-in');
    }
}

// Floating emojis animation
function startFloatingEmojis() {
    const emojis = document.querySelectorAll('.floating-emojis .emoji');
    emojis.forEach((emoji, index) => {
        emoji.style.animationDelay = (index * 0.5) + 's';
    });
}

// Restart app
function restartApp() {
    currentPage = 1;
    showPage(1);
    
    // Reset game
    gameScore = 0;
    updateScore();
    
    // Clear intervals
    if (gameInterval) clearInterval(gameInterval);
    if (heartsInterval) clearInterval(heartsInterval);
    
    // Reset letter
    const envelope = document.getElementById('envelope');
    const letterContent = document.getElementById('letter-content');
    if (envelope) envelope.classList.remove('opened');
    if (letterContent) letterContent.style.display = 'none';
}

// Heart collision detection
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('heart')) {
        e.target.classList.add('heart-burst');
        gameScore++;
        updateScore();
        
        // Show game dialogue
        const gameDialogue = document.getElementById('game-dialogue');
        if (gameDialogue) {
            const dialogues = [
                "Fatima: Ap dil chura rahe hain kya Rexx?",
                "Rexx: Nahi Fatima, bas apka dil sambhal raha hoon 💞",
                "Fatima: Ap to bade cute hain! 😚",
                "Rexx: Bas apke liye, meri jaan 💕"
            ];
            const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
            gameDialogue.innerHTML = `<p>${randomDialogue}</p>`;
        }
        
        setTimeout(() => {
            if (e.target.parentNode) {
                e.target.parentNode.removeChild(e.target);
            }
        }, 1000);
    }
});

// Add some romantic sound effects (optional)
function playHeartSound() {
    // You can add actual sound files here
    console.log('💕 Heart sound played!');
}

// Add sparkle effect on button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('romantic-btn')) {
        createSparkles(e.target);
    }
});

function createSparkles(element) {
    const sparkles = ['✨', '💫', '⭐', '🌟'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Add sparkle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Add romantic background music (optional)
function playBackgroundMusic() {
    // You can add actual music file here
    console.log('🎵 Playing romantic background music...');
}

// Initialize background music on first page
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(playBackgroundMusic, 2000);
});

// Add some romantic confetti on page 10
function showConfetti() {
    if (currentPage === 10) {
        const confettiEmojis = ['💕', '💞', '💖', '💗', '💘', '💝', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🖤', '🤎'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-50px';
                confetti.style.fontSize = '2rem';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                confetti.style.animation = 'confettiFall 3s linear forwards';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 3000);
            }, i * 100);
        }
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Show confetti when reaching page 10
const originalNextPage = nextPage;
nextPage = function() {
    originalNextPage();
    if (currentPage === 10) {
        setTimeout(showConfetti, 500);
    }
};