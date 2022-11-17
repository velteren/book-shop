async function render() {
  const body = document.body,
        books = document.querySelector('.books'),
        booksData = await (await fetch('/assets/json/books.json')).json();
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
      <div class="add__cart">
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
  modalController({
    modal: `.modal${index}`,
    btnOpen: `.show-more${index}`,
    btnClose: '.modal__close'
  });

  });
}

render();





