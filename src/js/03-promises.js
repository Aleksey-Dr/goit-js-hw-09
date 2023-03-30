// import librarie
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Find element
const form = document.querySelector('.form');

// Add listener to element (form)
form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

// Add callback for listener
function onFormSubmit(evt) {
  evt.preventDefault();
  let delay = Number(form.delay.value);
  for (let i = 1; i <= form.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
      // Show in window
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`,
        { useIcon: false, width: '230px', });
      // Show in console
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
      // Show in window
      Notify.success(`❌ Rejected promise ${position} in ${delay}ms`,
        { useIcon: false, width: '230px', });
      // Show in console
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay = delay + Number(form.step.value);
  }
};