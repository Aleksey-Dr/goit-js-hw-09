// import libraries
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

// Find elements
const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysE = document.querySelector('[data-days]');
const hoursE = document.querySelector('[data-hours]');
const minutesE = document.querySelector('[data-minutes]');
const secondsE = document.querySelector('[data-seconds]');

// Create a variable
let inputDate = null;
let intervalId = null;

// Blocking button startBtn before coosing future time
startBtn.disabled = true;
startBtn.addEventListener('click', onStartTimer);

// Add flatpickr
// Add argument for flatpickr
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        onSelectingValidDate(selectedDates[0]);
        console.log(selectedDates[0]);
    },
  };

flatpickr(input, options);

function onSelectingValidDate(selectedDates) {
    inputDate = selectedDates.getTime();
    if (inputDate < Date.now()) {
            // Blocking button startBtn
            startBtn.disabled = true;
            Report.failure('Please choose a date in the future');
            return;
    }
        // Unblocking button startBtn
        startBtn.disabled = false;
};

function onStartTimer() {
    intervalId = setInterval(startTimer, 1000);
    startBtn.disabled = true;
};

function startTimer() {
    const deltaTime = inputDate - Date.now();
    const timeComponents = convertMs(deltaTime);
    updateClockface(timeComponents);
    if (secondsE.textContent === '00' && minutesE.textContent === '00'
        && hoursE.textContent === '00' && daysE.textContent === '00') {
        Report.success('Time is over!');
        clearInterval(intervalId);
        // Unblocking button startBtn
        startBtn.disabled = false;
    }
};

function updateClockface({ days, hours, minutes, seconds }) {
    secondsE.textContent = addLeadingZero(seconds);
    minutesE.textContent = addLeadingZero(minutes);
    hoursE.textContent = addLeadingZero(hours);
  if (days > 99) {
    daysE.textContent = days;
  }
  daysE.textContent = addLeadingZero(days);
};

function addLeadingZero(value){
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };