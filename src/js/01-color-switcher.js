const refs = {
    bodyRef: document.querySelector('body'),
    startBtnRef: document.querySelector('button[data-start]'),
    stopBtnRef: document.querySelector('button[data-stop]'),
};

let intervalId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtnRef.addEventListener('click', () => {
    refs.startBtnRef.setAttribute('disabled', '');
    intervalId = setInterval(() => {
        refs.bodyRef.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

refs.stopBtnRef.addEventListener('click', () => {
    refs.startBtnRef.removeAttribute('disabled');
    clearInterval(intervalId);
});
