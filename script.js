// Countdown Timer
function updateCountdown() {
    // Get today's date
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Set birthday to today (for demonstration)
    const birthdayDate = new Date(currentYear, today.getMonth(), today.getDate());
    
    // If birthday has passed, set to next year
    if (birthdayDate < today) {
        birthdayDate.setFullYear(currentYear + 1);
    }
    
    // If today is the birthday
    if (today.toDateString() === birthdayDate.toDateString()) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }
    
    const now = today.getTime();
    const birthday = birthdayDate.getTime();
    const difference = birthday - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Enter Gift Function
function enterGift() {
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('giftSection').style.display = 'block';
}

// Song Player
let currentlyPlaying = null;

function toggleSong(element) {
    const audio = element.querySelector('audio');
    const playBtn = element.querySelector('.play-btn');

    // Stop currently playing song
    if (currentlyPlaying && currentlyPlaying !== element) {
        const prevAudio = currentlyPlaying.querySelector('audio');
        const prevBtn = currentlyPlaying.querySelector('.play-btn');
        prevAudio.pause();
        prevBtn.textContent = '▶';
        currentlyPlaying.classList.remove('playing');
    }

    // Play/pause current song
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸';
        element.classList.add('playing');
        currentlyPlaying = element;
    } else {
        audio.pause();
        playBtn.textContent = '▶';
        element.classList.remove('playing');
        currentlyPlaying = null;
    }
}

// Balloon Pop Game
const balloonMessages = [
    '🎉 Keep smiling!',
    '✨ You rock!',
    '🌟 Stay happy!',
    '💫 Enjoy today!',
    '🎊 Be amazing!',
    '💝 You deserve it!'
];

let poppedBalloons = 0;

function popBalloon(element) {
    if (element.classList.contains('popped')) return;
    
    element.classList.add('popped');
    poppedBalloons++;
    
    // Show message
    const messageIndex = poppedBalloons - 1;
    if (messageIndex < balloonMessages.length) {
        showFloatingMessage(balloonMessages[messageIndex], element);
    }
    
    // Check if all balloons are popped
    if (poppedBalloons === 6) {
        setTimeout(() => {
            createConfetti();
            alert('🎉 Amazing! You popped all the balloons! The party begins! 🎉');
        }, 500);
    }
}

function showFloatingMessage(message, element) {
    const rect = element.getBoundingClientRect();
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.position = 'fixed';
    messageEl.style.left = rect.left + rect.width / 2 + 'px';
    messageEl.style.top = rect.top + 'px';
    messageEl.style.transform = 'translateX(-50%)';
    messageEl.style.background = 'rgba(0, 0, 0, 0.8)';
    messageEl.style.color = 'white';
    messageEl.style.padding = '10px 15px';
    messageEl.style.borderRadius = '8px';
    messageEl.style.fontSize = '0.9rem';
    messageEl.style.fontWeight = 'bold';
    messageEl.style.zIndex = '1001';
    messageEl.style.animation = 'float-up 2s ease-out forwards';
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => messageEl.remove(), 2000);
}

// Confetti Generator
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#FF6B9D', '#FFC75F', '#845EC2', '#26A69A', '#667eea'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.delay = (Math.random() * 0.5) + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
        confetti.style.transform = 'rotateZ(' + Math.random() * 360 + 'deg)';
        
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Add float-up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-100px);
        }
    }
`;
document.head.appendChild(style);
