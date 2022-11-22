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
const button = document.querySelector('.button');

let validator = {
  name: false,
  surname: false,
  street: false,
  house: false,
  flat: false
}
nameInput.addEventListener('input', () => {
  if (!nameInput.checkValidity()) {
    nameInput.classList.add('red');
    nameSpan.classList.add('opacity');
    validator.name = false;
  } else {
    nameInput.classList.remove('red');
    nameSpan.classList.remove('opacity');
    validator.name = true;
  }
  validate();
});

surnameInput.addEventListener('input', () => {
  if (!surnameInput.checkValidity()) {
    surnameInput.classList.add('red');
    surnameSpan.classList.add('opacity');
    validator.surname = false;
  } else {
    surnameInput.classList.remove('red');
    surnameSpan.classList.remove('opacity');
    validator.surname = true;
  }
  validate();
});

streetInput.addEventListener('input', () => {
  if (!streetInput.checkValidity()) {
    streetInput.classList.add('red');
    streetSpan.classList.add('opacity');
    validator.street = false;
  } else {
    streetInput.classList.remove('red');
    streetSpan.classList.remove('opacity');
    validator.street = true;
  }
  validate();
});

houseNumber.addEventListener('input', () => {
  if (!houseNumber.checkValidity()) {
    houseNumber.classList.add('red');
    houseSpan.classList.add('opacity');
    validator.house = false;
  } else {
    houseNumber.classList.remove('red');
    houseSpan.classList.remove('opacity');
    validator.house = true;
  }
  validate();
});

flatNumber.addEventListener('input', () => {
  if (!flatNumber.checkValidity()) {
    flatNumber.classList.add('red');
    flatSpan.classList.add('opacity');
    validator.flat = false;
  } else {
    flatNumber.classList.remove('red');
    flatSpan.classList.remove('opacity');
    validator.flat = true;
  }
  validate();
});

function validate() {
  for (let key in validator) {
    if (validator[key]) {
      button.removeAttribute("disabled")
    } else {
      button.setAttribute("disabled", "");
    }
  }
}
validate();

function dater() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  month++;
  let day = date.getDate();
  day++;
  let str = `${year}-${month}-${day}`;
  const dateInput = document.getElementById("delivery");
  dateInput.setAttribute("min", `${year}-${month}-${day}`);
  console.log(dateInput);
}

dater();