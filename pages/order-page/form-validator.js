const nameInput = document.querySelector('.name-input');
const surnameInput = document.querySelector('.surname-input');
const streetInput = document.querySelector('.street-input');
const houseNumber = document.querySelector('.house-input');
const flatNumber = document.querySelector('.flat-input');
const nameSpan = document.querySelector('.name-span');
const surnameSpan = document.querySelector('.surname-span');
const deliverySpan = document.querySelector('.delivery-span');
const streetSpan = document.querySelector('.street-span');
const houseSpan = document.querySelector('.house-span');
const flatSpan = document.querySelector('.flat-span');

nameInput.addEventListener('input', () => {
  if (!nameInput.checkValidity()) {
    nameInput.classList.add('red');
    nameSpan.classList.add('opacity');
  } else {
    nameInput.classList.remove('red');
    nameSpan.classList.remove('opacity');
  }
});

surnameInput.addEventListener('input', () => {
  if (!surnameInput.checkValidity()) {
    surnameInput.classList.add('red');
    surnameSpan.classList.add('opacity');
  } else {
    surnameInput.classList.remove('red');
    surnameSpan.classList.remove('opacity');
  }
});

streetInput.addEventListener('input', () => {
  if (!streetInput.checkValidity()) {
    streetInput.classList.add('red');
    streetSpan.classList.add('opacity');
  } else {
    streetInput.classList.remove('red');
    streetSpan.classList.remove('opacity');
  }
});

houseNumber.addEventListener('input', () => {
  if (!houseNumber.checkValidity()) {
    houseNumber.classList.add('red');
    houseSpan.classList.add('opacity');
  } else {
    houseNumber.classList.remove('red');
    houseSpan.classList.remove('opacity');
  }
});

flatNumber.addEventListener('input', () => {
  if (!flatNumber.checkValidity()) {
    flatNumber.classList.add('red');
    flatSpan.classList.add('opacity');
  } else {
    flatNumber.classList.remove('red');
    flatSpan.classList.remove('opacity');
  }
});