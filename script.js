let timer;
let isRunning = 'inactive';
let currentMode = 'pomodoro'; 
let timeLeft = 25 * 60; 

const modes = {
    pomodoro: { time: 25 * 60, button: document.getElementById('pomodoro') },
    break: { time: 5 * 60, button: document.getElementById('break') }
};

const displayTime = document.getElementById('pomodoro-time');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    displayTime.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function setTimerState(state) {
    isRunning = state;
    startButton.textContent = state === 'active' ? 'stop' : 'start';
}

function startTimer() {
    if (isRunning === 'inactive') {
        setTimerState('active');
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                resetTimer();
            }
        }, 1000);
    } else {
        setTimerState('inactive');
        clearInterval(timer);
    }
}

function resetTimer() {
    setTimerState('inactive');
    timeLeft = modes[currentMode].time; 
    updateDisplay();
    clearInterval(timer);
}

function switchMode(mode) {
    currentMode = mode;
    resetTimer();
    updateActiveButtons();
}

function updateActiveButtons() {
    for (const key in modes) {
        modes[key].button.classList.toggle('active', key === currentMode);
    }
}

modes.pomodoro.button.addEventListener('click', () => switchMode('pomodoro'));
modes.break.button.addEventListener('click', () => switchMode('break'));
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();