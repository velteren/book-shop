async function render() {
  const books = document.querySelector('.books'),
        booksData = await (await fetch('/assets/json/books.json')).json(),
        totalSpan = document.querySelector('.total__span');
  let cartTotal = 0;

  const modalController = ({modal, btnOpen, btnClose}) => {
    const buttonShow = document.querySelectorAll(btnOpen);
    const modalElem = document.querySelector(modal);
    modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    `;

    const closeModal = event => {
      const target = event.target;
      if (target === modalElem || target.closest(btnClose)) {
        modalElem.style.opacity = 0;
        setTimeout(() => {
          modalElem.style.visibility = 'hidden';
        },300);
      }
    }

    const openModal = () => {
      modalElem.style.visibility = 'visible';
      modalElem.style.opacity = 1;
    }

    buttonShow.forEach(btn => {
      btn.addEventListener('click', openModal);
    });
    modalElem.addEventListener('click', closeModal);
  }

  const modalForDrag = () => {
    const modalElem = document.querySelector('.drag-modal');
    const booksImgs = document.querySelectorAll('.books__img');
    modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    `;
    const leftX = 1459,
          rightX = 1682,
          bottomY = 276,
          upperY = 127;
    const dragend = (event) => {
      let target = event.target.parentElement;
      modalElem.style.opacity = 0;
      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
      },300);
      if (event.clientX >= leftX && event.clientX <= rightX && event.clientY >= upperY && event.clientY <= bottomY) {
        cartCounter.innerHTML++;
        if (cartSet.has(Number.parseInt((target.classList)[1]))) {
          cartCounter.innerHTML--;
        } else {
          let tmp = Number.parseInt((target.classList)[1]);
          cartSet.add(tmp);
          let item = document.createElement('div');
          item.classList.add('cart__card');
          let element = booksData[tmp];
          item.innerHTML = `
          <img src="${element.imageLink}" alt="" class="cart__card_img">
          <div class="books__info">
            <div class="books__main-info">
              <h3 class="books__h3">
                ${element.author}
              </h3>
              <h2 class="books__h2">
                ${element.title}
              </h2>
              <span class="books__price">
                ${element.price}$
              </span>
            </div>
          </div>
          <button class="cart__card_close">&#10006;</button>
          `;
          item.classList.add(`${tmp}cart__card`);
          cart.append(item);
          cartTotal += element.price;
          totalSpan.innerHTML = cartTotal;
        }
      }
    }

    const openModal = () => {
      modalElem.style.visibility = 'visible';
      modalElem.style.opacity = 1;
    }

    booksImgs.forEach(item => {
      item.addEventListener('dragstart', openModal);
      item.addEventListener('dragend', dragend);
    });
  }

  const modalControllerForCart = ({modal, btnOpen, btnClose}) => {
    const buttonShow = document.querySelectorAll(btnOpen);
    const modalElem = document.querySelector(modal);
    modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    `;

    const closeModal = event => {
      const target = event.target;
      if (target === modalElem || target.closest(btnClose)) {
        modalElem.style.opacity = 0;
        setTimeout(() => {
          modalElem.style.visibility = 'hidden';
        },300);
      }
    }

    const openModal = () => {
      modalElem.style.visibility = 'visible';
      modalElem.style.opacity = 1;
      const removeFromCart = (event) => {
        let target = event.target;
        let toDelete = Number.parseInt((target.closest('.cart__card').classList)[1]);
        cartSet.delete(toDelete);
        let priceToReduce = Number.parseInt(target.previousElementSibling.lastElementChild.lastElementChild.innerHTML);
        cartTotal -= priceToReduce;
        totalSpan.innerHTML = cartTotal;
        target.closest('.cart__card').remove();
        cartCounter.innerHTML--;
        if (Number.parseInt(cartCounter.innerHTML) < 0) cartCounter.innerHTML = 0;
      }
      const deleteButtons = document.querySelectorAll('.cart__card_close');
      deleteButtons.forEach(item => {
        item.addEventListener('click', removeFromCart);
      });
    }

    buttonShow.forEach(btn => {
      btn.addEventListener('click', openModal);
    });
    modalElem.addEventListener('click', closeModal);
  }

  booksData.forEach((element, index) => {
  let card = document.createElement('div');
  card.classList.add('books__card');
  card.classList.add(`${index}books__card`);
  card.innerHTML = `
  <div class="beautyfier"></div>
  <img src="${element.imageLink}" alt="" class="books__img" draggable="true">
  <div class="books__info">
    <div class="books__main-info">
      <h3 class="books__h3">
        ${element.author}
      </h3>
      <h2 class="books__h2">
        ${element.title}
      </h2>
      <span class="books__price">
        ${element.price}$
      </span>
    </div>
    <div class="books__buttons">
      <button class="add__wishlist">Whishlist</button>
      <button class="show-more show-more${index}">Show More</button>
      <div class="add__cart ${index}_add__cart">
        <img src="/assets/icons/cart.png" alt="">
      </div>
    </div>
  </div>

  <div class="modal modal${index}">
    <div class="modal__main">
      <h2 class="modal__title">
        ${element.title}
      </h2>
      <h3 class="modal__text">
        ${element.description}
      </h3>
      <button class="modal__close">&#10006;</button>
    </div>
  </div>
  `;

  books.append(card);

  modalController({
    modal: `.modal${index}`,
    btnOpen: `.show-more${index}`,
    btnClose: '.modal__close'
  });

  });

  modalControllerForCart({
    modal: `.cart-modal`,
    btnOpen: `.cart`,
    btnClose: '.modal__close'
  });

  //CART
  const cart = document.querySelector('.cart-modal__content'),
        cartButtons = document.querySelectorAll('.add__cart'),
        cartCounter = document.querySelector('.counter__span');
  let cartSet = new Set();

  const addToCart = (event) => {
    let target = event.target;
    cartCounter.innerHTML++;
    if (cartSet.has(Number.parseInt((target.closest('.add__cart').classList)[1]))) {
      cartCounter.innerHTML--;
    } else {
      let tmp = Number.parseInt((target.closest('.add__cart').classList)[1]);
      cartSet.add(tmp);
      let item = document.createElement('div');
      item.classList.add('cart__card');
      let element = booksData[tmp];
      item.innerHTML = `
      <img src="${element.imageLink}" alt="" class="cart__card_img">
      <div class="books__info">
        <div class="books__main-info">
          <h3 class="books__h3">
            ${element.author}
          </h3>
          <h2 class="books__h2">
            ${element.title}
          </h2>
          <span class="books__price">
            ${element.price}$
          </span>
        </div>
      </div>
      <button class="cart__card_close">&#10006;</button>
      `;
      item.classList.add(`${tmp}cart__card`);
      cart.append(item);
      cartTotal += element.price;
      totalSpan.innerHTML = cartTotal;
    }
  }

  cartButtons.forEach(item => {
    item.addEventListener('click', addToCart);
  });

  modalForDrag();
}

render();





