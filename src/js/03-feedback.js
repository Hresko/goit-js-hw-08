import throttle from 'lodash.throttle';

const form = document.querySelector('.feadback-form');
const STORAGE_KEY = 'feedback-form-state';
let formData = {};

populateImput();

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  e.preventDefault();
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function onFormSubmit(e) {
  e.preventDefault();
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parseMessage = JSON.parse(savedMessage)

  if (parseMessage) {
    console.log(parseMessage);
  }
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateImput() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parseMessage = JSON.parse(savedMessage);

  if (parseMessage) {
    formData = parseMessage;
    form.email.value = formData.email || '';
    form.message.value = formData.message || '';
  }
}