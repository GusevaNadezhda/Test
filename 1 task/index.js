const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
// создаем счетчик
let counter = 0;
// функция которая добавляет 0 к числу для привычного нам отображения времени 
function addZero(num){
  return (num > 0 && num < 10) ? "0" + num : num;
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    // расчет секунд в остатке от 60 
    const sec = (seconds%60)
     // расчет минут в остатке от 60
    const min = Math.floor((seconds/60)%60)
    // расчет часов
    const hour = Math.floor(seconds/3600)

//  возвращаем результат в формате hh:mm:ss
    return addZero(hour) + ':' + addZero(min) + ':' + addZero(sec) 
  }
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  // заменяем все буквы и символы кроме цифр на постое значение
  inputEl.value = inputEl.value.replace(/[^0-9]/g, '')
  return true
});

buttonEl.addEventListener('click', function func(){
  const seconds = Number(inputEl.value);
// результат функции записываем в textContent нашего span
  timerEl.textContent =  animateTimer(seconds-counter)
  // записываем в переменную функцию setInterval с шагом в 1 секунду
  let interval = setInterval(timeIt,1000)
  function timeIt(){
    // каждую секунду счетчик увеличивается, тем самым уменьшая секунды в функции animateTimer
    counter++;
    timerEl.textContent = animateTimer(seconds-counter)
    // как только значение счетчика и количество секунд станут равными, т.е. timerEl.textContent  будет 0:0:0 таймер заканчивает свою работу
    if(counter==seconds){
      clearInterval(interval)
      counter=0
    }
  }
  inputEl.value = '';
  // для того чтоб при повторном нажатии таймер не запускался заново и не было паралельно двух и более таймеров, мы выполнение функции при событии 'click'
  this.removeEventListener('click', func)
});
