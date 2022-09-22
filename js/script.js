


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

    // Slider2

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
    } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';

    slides.forEach(slide => {
      slidesField.style.display = 'flex';
      slidesField.style.transition = '0.5s all';

      slidesWrapper.style.overflow = 'hidden';

      slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');

      if (i == 0) {
        dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
    }

    function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
      if (offset == deleteNotDigits(width) * (slides.length - 1)) {
        offset = 0;
      } else {
        offset += deleteNotDigits(width);
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == slides.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
      if (offset == 0) {
        offset = deleteNotDigits(width) * (slides.length - 1);
      } else {
        offset -= deleteNotDigits(width);
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 1) {
        slideIndex = slides.length;
      } else {
        slideIndex--;
      }

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slides.length < 10) {
          current.textContent = `0${slideIndex}`;
        } else {
          current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
      });
    });

    // Calc

    const result = document.querySelector('.calculating__result span');
    let sex = 'female',
        height, weight, age,
        ratio = 1.375;

    function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '___';
        return;
      }

      if (sex === female) {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
      const elements = document.querySelectorAll(`${parentSelector} div`);
      
      elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
          if (e.target.getAttribute('data-ratio')) {
            ratio = +e.target.getAttribute('data-ratio');
          } else {
            sex = e.target.getAttribute('id');
          }
  
          elements.forEach(elem => {
            elem.classList.remove(activeClass);
          });
  
          e.target.classList.add(activeClass);

          calcTotal();
        });
      });
    }

      // function getStaticInformation(parentSelector, activeClass) {
      // const elements = document.querySelectorAll(`${parentSelector} div`);

      // document.querySelector(parentSelector).addEventListener('click', (e) =>{
      //             if (e.target.getAttribute('data-ratio')) {
      //       ratio = +e.target.getAttribute('data-ratio');
      //     } else {
      //       sex = e.target.getAttribute('id');
      //     }
      //               elements.forEach(elem => {
      //       elem.classList.remove(activeClass);
      //     });
  
      //     e.target.classList.add(activeClass);
      // });
      // }

      getStaticInformation('#gender', 'calculating__choose-item_active');
      getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

      function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
          switch(input.getAttribute('id')) {
            case 'height' :
              height = +input.value;
              break;
            case 'weight' :
              weight = +input.value;
              break;
            case 'age' :
              age = +input.value;
              break;
          }
          calcTotal();
        });
      }

      getDinamicInformation('#height');
      getDinamicInformation('#weight');
      getDinamicInformation('#age');
});


