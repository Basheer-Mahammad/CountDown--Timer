// Select the countdown elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const messageEl = document.getElementById('message');

// Function to start the countdown
function startCountdown() {
    // Get the date input value and set time to midnight (local timezone)
    const eventDateInput = document.getElementById('event-date').value;

    if (eventDateInput) {
        // Parse the input date and set it to midnight (00:00:00) local time
        const targetDate = new Date(eventDateInput + 'T00:00:00').getTime();
        const now = new Date().getTime();

        // Check if the selected date is in the past
        if (targetDate < now) {
            messageEl.innerText = "Event Expired!";
            clearInterval(countdownInterval);
            resetCountdownDisplay();
        } else {
            // Start the countdown
            updateCountdown(targetDate);
            clearInterval(countdownInterval); // Clear any previous interval
            countdownInterval = setInterval(() => updateCountdown(targetDate), 1000);
        }
    } else {
        messageEl.innerText = "Please select a date.";
    }
}

// Function to update the countdown display
function updateCountdown(targetDate) {
    const now = new Date().getTime();
    const timeDifference = targetDate - now;

    if (timeDifference > 0) {
        // Calculate time in days, hours, minutes, and seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Update the countdown display
        daysEl.innerText = days;
        hoursEl.innerText = hours;
        minutesEl.innerText = minutes;
        secondsEl.innerText = seconds;
        messageEl.innerText = ""; // Clear message if countdown is active
    } else {
        // When the countdown is complete
        messageEl.innerText = "Event Expired!";
        clearInterval(countdownInterval);
        resetCountdownDisplay();
    }
}

// Function to reset countdown display to zero
function resetCountdownDisplay() {
    daysEl.innerText = 0;
    hoursEl.innerText = 0;
    minutesEl.innerText = 0;
    secondsEl.innerText = 0;
}

// Declare countdown interval variable globally
let countdownInterval;
