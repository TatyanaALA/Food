


// my code
window.addEventListener('DOMContentLoaded', () => {
                        // tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabsContent() {
    tabsContent.forEach(item => {
      // 1 вариант
      // item.style.display = 'none';

      // 2 вариант
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabsContent(i = 0) {
    // tabsContent[i].style.display = 'block';
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabsContent();
  showTabsContent();

  tabsParent.addEventListener('click', (event) =>{
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabsContent();
          showTabsContent(i);
        }
      });
    }
  });



  
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

        //modal window
  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    // Либо вариант с toggle - но тогда назначить класс в верстке
    // document.body.style.overflow = 'hidden';
    clearInterval(modalTimeId);
  }

    modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
    });

    function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      // document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal  || e.target.getAttribute('data-close') == '') {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });

    const modalTimeId = setTimeout(openModal, 500000);

    function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1){
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
      }
    }

    window.addEventListener('scroll', showModalByScroll);


    // Используем классы для карточек

    class MenuCard {
      constructor (src, alt, titel, descr, prise, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.titel = titel;
        this.descr = descr;
        this.prise = prise;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 420;
        this.changeToKz();
      }

      changeToKz() {
        this.prise = this.prise * this.transfer; 
      }

      render() {
        const element = document.createElement('div');
        
        if (this.classes.length === 0) {
          this.element = 'menu__item';
          element.classList.add(this.element);
        } else {
          this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.titel}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.prise}</span> тг/день</div>
            </div>
        `;
        this.parent.append(element);
      }
    }

    const getResourse = async (url) => {
      const result = await fetch(url);

      if (!result.ok) {
        throw new Error(`Coud not fetch ${url}, status: ${res.status}`);
      }

      return await result.json();
    };
    // первый вариант создания карточек
    getResourse( 'http://localhost:3000/menu')
      .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
          new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
      });

    // второй вариант создания карточек
    // getResourse('http://localhost:3000/menu')
    //   .then(data => createCard(data));

    // function createCard(data) {
    //   data.forEach(({img, altimg, title, descr, price}) => {
    //     const element = document.createElement('div');
    //     price *= 300;
    //     element.classList.add('menu__item');

    //     element.innerHTML = `
    //     <img src=${img} alt=${altimg}>
    //     <h3 class="menu__item-subtitle">${title}</h3>
    //     <div class="menu__item-descr">${descr}</div>
    //     <div class="menu__item-divider"></div>
    //     <div class="menu__item-price">
    //         <div class="menu__item-cost">Цена:</div>
    //         <div class="menu__item-total"><span>${price} </span> тг/день</div>
    //     </div>
    //     `;
    //     document.querySelector('.menu .container').append(element);
    //   });
    // }



    // FORMS

    const forms = document.querySelectorAll('form');

    const message = {
      loading: 'img/forms/spinner.svg',
      success: 'Спасибо! Скоро с вами свяжутся',
      failure: 'Что-то пошло не так...'
    };
    
    forms.forEach(item => {
      bindPostData(item);
    });

    const postData = async (url, data) => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: data
      });

      return await res.json();
    };

    function bindPostData(form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
        `;

        form.insertAdjacentElement('afterend', statusMessage);

        // const request = new XMLHttpRequest();
        // request.open('POST', 'server.php'); 


        // request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);

        // при отправки formData нижние строки кода не нужны, но нужны при отправке JSON
        // const obj = {};
        // formData.forEach(function(value, key) {
        //   obj[key] = value;
        // });

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          form.reset();
        });

        // эта часть  кода с fetch не нужна 
        // request.addEventListener('load', () => {
        //   if (request.status === 200) {
        //     console.log(request.response);
        //     showThanksModal(message.success);
        //     statusMessage.remove();
        //     form.reset();
        //   } else {
        //     showThanksModal(message.failure);
        //   }
        // });
      });
    }

    function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      openModal();

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
        <div class="modal__content">
          <div class="modal__close" data-close>×</div>
          <div class="modal__titel">${message}</div>
        </div>
      `;

      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
      }, 4000); 
    }

    // Slider

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current');
    let slideIndex = 1;

    showSlids(slideIndex);

    if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
    } else {
      total.textContent = slides.length;
    }

    function showSlids(n) {
      if (n > slides.length) {
        slideIndex = 1;
      }

      if (n < 1) {
        slideIndex = slides.length;
      }

      slides.forEach(item => item.style.display = 'none');
      slides[slideIndex - 1].style.display = 'block';

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }
  
    }

    function plusSlides(n) {
      showSlids(slideIndex += n);
    }

    prev.addEventListener('click', () => {
      plusSlides(-1);
    });

    next.addEventListener('click', () => {
      plusSlides(1);
    });


    // fetch('http://localhost:3000/menu')
    //   .then(data => data.json())
    //   .then(res => console.log(res));
    
});