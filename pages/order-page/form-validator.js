const nameInput = document.querySelector('.name-input');
const surnameInput = document.querySelector('.surname-input');
const streetInput = document.querySelector('.street-input');
const houseNumber = document.querySelector('.house-input');
const flatNumber = document.querySelector('.flat-input');

nameInput.addEventListener('input', () => {
  console.log(nameInput.checkValidity());
});

surnameInput.addEventListener('input', () => {
  console.log(surnameInput.checkValidity())
});

streetInput.addEventListener('input', () => {
  console.log(streetInput.checkValidity());
});

houseNumber.addEventListener('input', () => {
  console.log(houseNumber.checkValidity());
});

flatNumber.addEventListener('input', () => {
  console.log(flatNumber.checkValidity());
});