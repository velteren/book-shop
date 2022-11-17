async function render() {
  const body = document.body,
        books = document.querySelector('.books'),
        booksData = await (await fetch('/assets/json/books.json')).json();
  booksData.forEach(element => {
    let card = document.createElement('div');
    card.classList.add('books__card');
    card.innerHTML = `
    <div class="beautyfier"></div>
    <img src="${element.imageLink}" alt="" class="books__img">
    <div class="books__other">
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
          <button class="show-more">Show More</button>
          <div class="add__cart">
            <img src="/assets/icons/cart.png" alt="">
          </div>
        </div>
      </div>

    </div>
    `;
    books.append(card);
    console.log(element.title , `\n`, element.description);
  });
}

render();

const buttonShow = document.querySelector('.show-more');
const modal = document.querySelector('.modal');

modal.style.cssText = `
display: flex;
visibility: hidden;
opacity: 0;
transition: opacity 300ms ease-in-out;
`;

const closeModal = event => {
  const target = event.target;
  if (target === modal || target.closest('.modal__close')) {
    modal.style.opacity = 0;
    setTimeout(() => {
      modal.style.visibility = 'hidden';
    },300);
  }
}

const openModal = () => {
  modal.style.visibility = 'visible';
  modal.style.opacity = 1;
}

buttonShow.addEventListener('click', openModal);
modal.addEventListener('click', closeModal)

