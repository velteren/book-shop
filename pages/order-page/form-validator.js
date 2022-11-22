const nameInput = document.querySelector('.name-input');
const surnameInput = document.querySelector('.surname-input');
const streetInput = document.querySelector('.street-input');
const houseNumber = document.querySelector('.house-input');
const flatNumber = document.querySelector('.flat-input');

nameInput.addEventListener('input', () => {
  if (!nameInput.checkValidity()) {
    nameInput.classList.add('red');
  } else {
    nameInput.classList.remove('red');
  }
});

surnameInput.addEventListener('input', () => {
  if (!surnameInput.checkValidity()) {
    surnameInput.classList.add('red');
  } else {
    surnameInput.classList.remove('red');
  }
});

streetInput.addEventListener('input', () => {
  if (!streetInput.checkValidity()) {
    streetInput.classList.add('red');
  } else {
    streetInput.classList.remove('red');
  }
});

houseNumber.addEventListener('input', () => {
  if (!houseNumber.checkValidity()) {
    houseNumber.classList.add('red');
  } else {
    houseNumber.classList.remove('red');
  }
});

flatNumber.addEventListener('input', () => {
  if (!flatNumber.checkValidity()) {
    flatNumber.classList.add('red');
  } else {
    flatNumber.classList.remove('red');
  }
});