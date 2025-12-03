// ==================== SCREEN NAVIGATION ====================
function nextScreen(screenNumber) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
        setTimeout(() => {
            if (!screen.classList.contains('active')) {
                screen.style.display = 'none';
            }
        }, 500); // Wait for fade out
    });

    // Show target screen
    const targetScreen = document.getElementById(`screen${screenNumber}`);
    if (targetScreen) {
        targetScreen.style.display = 'flex';
        // Small delay to allow display:flex to apply before adding opacity class
        setTimeout(() => {
            targetScreen.classList.add('active');
        }, 50);
    }

    // Auto-play music on screen 4 (birthday message) only
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');

    if (screenNumber === 4) {
        // Auto-play music
        if (!isPlaying) {
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
            musicBtn.classList.add('music-playing');
            musicBtn.innerHTML = '<span class="music-icon">⏸️</span>';
            isPlaying = true;
        }
    } else {
        // Pause music on other screens
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('music-playing');
            musicBtn.innerHTML = '<span class="music-icon">🎵</span>';
            isPlaying = false;
        }
    }
}

// ==================== NO BUTTON EVASION ====================
function moveButton(btn) {
    // Only move if on desktop (hover works)
    if (window.matchMedia("(hover: hover)").matches) {
        const x = Math.random() * 200 - 100; // -100 to 100
        const y = Math.random() * 200 - 100; // -100 to 100

        btn.style.transform = `translate(${x}px, ${y}px)`;
    }
}

// ==================== MUSIC CONTROL ====================
let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('music-playing');
        musicBtn.innerHTML = '<span class="music-icon">🎵</span>';
    } else {
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        musicBtn.classList.add('music-playing');
        musicBtn.innerHTML = '<span class="music-icon">⏸️</span>';
    }
    isPlaying = !isPlaying;
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Ensure screen 1 is visible
    nextScreen(1);

    // Add touch event for mobile "No ty" button evasion
    const noBtn = document.getElementById('noBtn');
    if (noBtn) {
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent click
            const x = Math.random() * 150 - 75;
            const y = Math.random() * 150 - 75;
            noBtn.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    console.log("Snoopy Website Initialized! 🐶");
});
