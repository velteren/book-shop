async function render() {
  document.body.append(mainRender());

  function mainRender() {
    let fragment = new DocumentFragment();
    let container = document.createElement('div');
    container.innerHTML = `<header class="header">
    <div class="header__upper">
      <div class="header__upper_container container">
        <div class="logo">
          <a href="index.html">
            <img src="assets/icons/book-bookmark-icon_34486.png" alt="logo" class="logo__pic">
            <h1 class="header__h1">B <img src="assets/icons/o.png" alt=""><img src="assets/icons/o.png" alt="">KAH<img src="assets/icons/o.png" alt="">LIC</h1>
          </a>
        </div>
        <button class="login">
          <img src="assets/icons/user.png" alt="">
          <h3 class="login__h3">Sign in / Sign up</h3>
        </button>
      </div>
    </div>
    <div class="header__bottom">
      <div class="header__bottom_container container">
        <div class="header__bottom_left">
          <div class="categories">
            <div class="lines__flex">
              <div class="line line__1"></div>
              <div class="line line__2"></div>
              <div class="line line__3"></div>
            </div>
            <span>Categories</span>
          </div>
          <form action="" class="search">
            <input type="search" class="search__input" placeholder="What are you looking for?">
            <button type="submit" class="search__button">
              <i class="search__icon"></i>
            </button>
          </form>
          <div class="callback">
            <a href="tel:+353%20(0)1%20879%202700" class="callback__tel">+353 (0)1 879 2700</a>
            <span class="callback__text">Do you want us to call you back?</span>
          </div>
        </div>
        <div class="header__bottom_right">
          <div class="wishlist">
            <img src="assets/icons/heart.png" alt="" class="whishlist__pic">
            <span>Whishlist</span>
          </div>
          <div class="cart">
            <img src="assets/icons/cart.png" alt="" class="cart__pic">
            <div class="cart__counter"><span class="counter__span">0</span></div>
          </div>
          <div class="drag-modal">
            Add to Cart
          </div>
        </div>
      </div>
    </div>

    <div class="cart-modal modal">
      <div class="cart-modal__main">
        <div class="cart-modal__content"></div>
        <button class="modal__close">&#10006;</button>
        <div class="cart-modal__footer">
          <div class="total">Total: <span class="total__span">0</span>$</div>
          <a href="pages/order-page/index.html" class="order-page__link">
            <div class="order-page__button">
              <span>Confirm order</span>
              <img src="assets/icons/buy.png" alt="" class="order-page__pic">
            </div>
          </a>
        </div>
      </div>
    </div>

  </header>

  <main class="main">
    <div class="main__container container">
      <h2 class="main__h2">
        Our Best Sellers of the Week
      </h2>
      <div class="books">
      </div>
      <div class="subscribe">
        <div class="subscribe__text">
          <h2 class="subscribe__h2">
            Sign up for our Newsletter
          </h2>
          <h3 class="subscribe__h3">
            <img src="assets/icons/mail.png" alt="" class="subscribe__pic">
            Subscribe to the newsletter and be always up to date with new products, promotions and news!
          </h3>
        </div>
        <form class="email__form">
          <input type="email" placeholder="Enter your email" name="mail" class="email__input">
          <input type="submit" value="Subscribe" class="email__button">
        </form>
      </div>
    </div>
  </main>

  <footer class="footer">
    <div class="footer__container container">
      <div class="footer__left">
        <div class="contacts">
          <div class="contacts__phone">
            <a href="tel:+353%20(0)1%20879%202700" class="number">+353 (0)1 879 2700</a>
            <h4 class="phone__h4">
              Open Hours: MON – SAT: 10:00AM – 6:00PM Sunday - 12:00PM - 6:00pm
            </h4>
          </div>
          <a href="mailto:us@bookaholic.com" class="email-adress">us@bookaholic.com</a>
        </div>
        <h3 class="footer__h3">
          Ivy Exchange, Parnell Street, Dublin 1, D01 P8C2, Dublin, Republic of Ireland.
        </h3>

      </div>
      <div class="footer__right">
        <ul class="social">
          <li class="social__item">
            <a href="" class="social__link">
              <img src="assets/icons/telegram.png" alt="">
            </a>
          </li>
          <li class="social__item">
            <a href="" class="social__link">
              <img src="assets/icons/whatsapp.png" alt="">
            </a>
          </li>
          <li class="social__item">
            <a href="" class="social__link">
              <img src="assets/icons/inst.png" alt="">
            </a>
          </li>
        </ul>

        <ul class="pay-systems">
          <li class="pay-systems__item"><img src="assets/icons/pay/visa.png" alt=""></li>
          <li class="pay-systems__item"><img src="assets/icons/pay/master.png" alt=""></li>
          <li class="pay-systems__item"><img src="assets/icons/pay/apple.png" alt=""></li>
          <li class="pay-systems__item"><img src="assets/icons/pay/gpay.png" alt=""></li>
        </ul>
      </div>
    </div>
  </footer>`;
    fragment.append(container);
    return fragment;
  }

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
    const bottomY = 200,
          upperY = 0;
    const dragend = (event) => {
      let target = event.target.parentElement;
      modalElem.style.opacity = 0;
      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
      },300);
      if (event.clientY >= upperY && event.clientY <= bottomY) {
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





