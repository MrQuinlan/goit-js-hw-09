import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    inputDateTimePickerRef: document.querySelector('#datetime-picker'),
    buttonStartRef: document.querySelector('button[data-start]'),
    daysValueRef: document.querySelector('span[data-days]'),
    hoursValueRef: document.querySelector('span[data-hours]'),
    minutesValueRef: document.querySelector('span[data-minutes]'),
    secondsValueRef: document.querySelector('span[data-seconds]'),
};

// =========================================================================

refs.buttonStartRef.setAttribute('disabled', '');

let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const date = new Date();
        const countdownEnd = date.getTime();
        const countdownStart = date.setTime(selectedDates[0]);

        if (countdownStart < countdownEnd) {
            Notify.failure('Please choose a date in the future');
            return;
        }

        refs.buttonStartRef.removeAttribute('disabled');
        refs.buttonStartRef.style.cursor = 'pointer';
        refs.buttonStartRef.addEventListener('click', () => {
            intervalId = setInterval(() => {
                const currentTime = Date.now();
                const differenceMs = countdownStart - currentTime;

                if (countdownStart - currentTime < 999) {
                    clearInterval(intervalId);
                }

                const { days, hours, minutes, seconds } = convertMs(differenceMs);

                refs.daysValueRef.textContent = addLeadingZero(days);
                refs.hoursValueRef.textContent = addLeadingZero(hours);
                refs.minutesValueRef.textContent = addLeadingZero(minutes);
                refs.secondsValueRef.textContent = addLeadingZero(seconds);
            }, 1000);

            refs.buttonStartRef.setAttribute('disabled', '');
            refs.buttonStartRef.style.pointerEvents = 'none';
        });
    },
};

flatpickr(refs.inputDateTimePickerRef, options);

// =========================================================================

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
}

// =========================================================================

Notify.init({
    width: '425px',
    fontSize: '24px',
    timeout: 5000,
    borderRadius: '10px',
});

// =========================================================================

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
