import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('input[name="delay"]'),
  delayStep: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  button: document.querySelector('button'),
};

function createPromise(position, delay) {
  return new Promise((resolve, rejected) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        rejected({ position, delay });
      }
    }, delay);
  });
}

const generatePromise = event => {
  event.preventDefault();

  let delay = Number(refs.firstDelay.value);
  const delayStep = Number(refs.delayStep.value);
  const amount = refs.amount.value;

  for (let i = 1; i <= amount; i += 1) {
    const position = i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Fulfilled promise ${position} in ${delay}ms`);
      });

    delay += delayStep;
  }
};

refs.form.addEventListener('submit', generatePromise);

Notify.init({
  width: '425px',
  fontSize: '24px',
  timeout: 5000,
  borderRadius: '10px',
});
