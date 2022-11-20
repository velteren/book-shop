async function render() {
  const books = document.querySelector('.books'),
        booksData = await (await fetch('/assets/json/books.json')).json(),
        cartTotal = 0;

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
        target.closest('.cart__card').remove();
        cartCounter.innerHTML--;
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
  card.innerHTML = `
  <div class="beautyfier"></div>
  <img src="${element.imageLink}" alt="" class="books__img">
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
  const cart = document.querySelector('.cart-modal__main'),
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
    }
  }

  cartButtons.forEach(item => {
    item.addEventListener('click', addToCart);
  });
  
  //DRAG-N-DROP
  const dragStart = (event) => {
    event.dataTransfer.effectAllowed = "copyMove";
    let target = event.target;
    console.log(target);
  }

  const dragEnd = (event) => {
    let target = event.target;
    console.log(target);
  }
  const dragImgs = document.querySelectorAll('.books__img');
  dragImgs.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
  });
}

render();
console.log('test github');





