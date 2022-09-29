function timer() {
  // timer
  const dedLine = new Date('2022-10-01');

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const time = Date.parse(endtime) - Date.parse(new Date());
    
    if (time <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(time / (1000 * 60 * 60 * 24)),
      hours = Math.floor((time / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((time / ( 1000 * 60)) % 60),
      seconds = Math.floor((time / 1000) % 60);
    }

    return {
      'totalTime': time,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (timer.totalTime <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', dedLine);
}

module.exports = timer;