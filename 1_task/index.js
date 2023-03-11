const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
let globalTimer;
const awaitTimer = (timer) => new Promise(resolve => setTimeout(resolve, timer));

const createTimerAnimator = () => {
  return (seconds) => {
    let localTimer = seconds;

    const getSeconds = (timer) => Math.floor(timer % 60).toString().padStart(2, "0");
    const getMinutes = (timer) => Math.floor((timer / 60) % 60).toString().padStart(2, "0");
    const getHours = (timer) => Math.floor((timer / 60 / 60) % 24).toString().padStart(2, "0");

    const countingTimer = async (secondsInput) => {
      timerEl.innerText = `${getHours(secondsInput)}:${getMinutes(secondsInput)}:${getSeconds(secondsInput)}`;
      
      for (let i = secondsInput - 1; i >= 0; i--) {
        await awaitTimer(1000);

        if (globalTimer !== localTimer) {return}

        timerEl.innerText = `${getHours(i)}:${getMinutes(i)}:${getSeconds(i)}`;
    
        if (timerEl.innerText === '00:00:00') {return}
      }
    };

    countingTimer(seconds);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  const regExp = /[^\d]/g;
  inputEl.value = inputEl.value.replace(regExp, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  globalTimer = seconds;
  animateTimer(seconds);

  inputEl.value = '';
});
