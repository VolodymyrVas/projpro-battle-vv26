'use strict';
const form = document.getElementById('request-form');
const method = document.getElementById('contact-method');
const contact = document.getElementById('contact-value');
const contactLabel = document.getElementById('contact-label');
const hint = document.getElementById('contact-hint');
const services = Array.from(form.querySelectorAll('input[name="services"]'));
const result = document.getElementById('form-result');
function validateServices() {
  services[0].setCustomValidity(services.some(input => input.checked) ? '' : 'Выберите хотя бы одну услугу.');
}
function validateContact() {
  contact.setCustomValidity('');
  const value = contact.value.trim();
  if (method.value === 'phone' && value && !/^\+?[\d\s().-]{7,25}$/.test(value)) {
    contact.setCustomValidity('Укажите телефон: не менее 7 цифр, можно использовать +, пробелы, скобки и дефисы.');
  } else if (method.value === 'phone' && value && value.replace(/\D/g, '').length < 7) {
    contact.setCustomValidity('В номере телефона должно быть не менее 7 цифр.');
  } else if (method.value === 'telegram' && value && !/^@?[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(value)) {
    contact.setCustomValidity('Укажите имя пользователя Телеграм: от 5 до 32 латинских букв, цифр или знаков подчёркивания.');
  }
}
method.addEventListener('change', () => {
  const settings = {
    email: ['Электронная почта', 'Укажите электронную почту', 'Адрес для связи', 'email', 'email'],
    phone: ['Телефон', 'Укажите номер телефона', 'С кодом страны', 'tel', 'tel'],
    telegram: ['Имя пользователя Телеграм', '@имя_пользователя', 'Имя пользователя, а не отображаемое имя', 'text', 'off']
  };
  const [label, placeholder, help, type, autocomplete] = settings[method.value];
  contactLabel.innerHTML = label + ' <span class="required">*</span>';
  contact.placeholder = placeholder;
  contact.type = type;
  contact.autocomplete = autocomplete;
  hint.textContent = help;
  validateContact();
});
form.addEventListener('input', event => {
  result.hidden = true;
  if (event.target.matches('input:not([type=radio]):not([type=checkbox])')) {
    event.target.setCustomValidity(event.target.required && !event.target.value.trim() ? 'Заполните это поле.' : '');
  }
  validateServices();
  validateContact();
});
services.forEach(input => input.addEventListener('change', validateServices));
validateServices();
form.addEventListener('submit', event => {
  event.preventDefault();
  validateServices();
  validateContact();
  if (!form.reportValidity()) return;
  result.textContent = 'Поля заполнены корректно. Это прототип: заявка никуда не отправлена. Данные остались только на этой странице.';
  result.hidden = false;
  result.focus();
});
