// console.log('Hello!');
// Find elements (buttons)
const backgroundBody = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

// Add listeners to elements (buttons)
startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopChangeColor);

// Create a variable for interval id
let switcherColor = null;

// Add callbacks for listeners
function startChangeColor() {
    switcherColor = setInterval(() => {
        // console.log('Change color');
        backgroundBody.style.backgroundColor = getRandomHexColor();
    }, 1000);
    // Blocking button startBtn after click
    startBtn.disabled = true;
};

function stopChangeColor() {
    // console.log('Stop change color');
    clearInterval(switcherColor);
    // Unblocking button startBtn after click to stopBtn
    startBtn.disabled = false;
}

// Add function for generate a random color
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}