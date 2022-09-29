function cards() {
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
}

module.exports = cards;