import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('input', throttle(handleFormInput, 500));
formRef.addEventListener('submit', handleFormSubmit);

populateTextarea();

/*
 * - Зберігаємо значення всіх полів форми в об'єкт formData
 * - Зберігаємо об'єкт в сховище localStorage
 * - Можна додати throttle
 */
function handleFormInput(evt) {
  // console.log(evt.target.name);
  // console.log(evt.target.value);
  formData[evt.target.name] = evt.target.value;
  // console.log(formData);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  // save(STORAGE_KEY, formData); // Сервіс для localStorage
}

/*
 * - Зупиняємо поведінку за замовчуванням
 * - Виводимо у консоль об'єкт з даними форми
 * - Очищаемо форму
 * - Видяляємо повідомлення із сховища
 */
function handleFormSubmit(evt) {
  evt.preventDefault();

  const { email, message } = evt.target.elements;

  if (!(email.value && message.value)) {
    return alert('Заповніть всі поля форми');
  }

  console.log({ email: email.value, message: message.value });

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

/*
 * - Отримуємо значення із сховища
 * - Якщо там щось було, оновлюємо DOM
 */
function populateTextarea() {
  const savedDataForm = localStorage.getItem(STORAGE_KEY);
  if (savedDataForm === null) {
    return;
  }

  const parsedDataForm = JSON.parse(savedDataForm);
  // const parsedDataForm = load(savedDataForm); // Сервіс для localStorage

  for (const [name, value] of Object.entries(parsedDataForm)) {
    // console.log(`${name}: ${value}`);

    formRef.elements[name].value = value; // Оновлюємо DOM
    formData[name] = value; // Оновлюємо formData
  }
}

// ========== Сервіс для localStorage ==========
// const save = (key, value) => {
//   try {
//     const serializedState = JSON.stringify(value);
//     localStorage.setItem(key, serializedState);
//   } catch (error) {
//     console.error('Set state error: ', error.message);
//   }
// };

// const load = key => {
//   try {
//     const serializedState = localStorage.getItem(key);
//     return serializedState === null ? undefined : JSON.parse(serializedState);
//   } catch (error) {
//     console.error('Get state error: ', error.message);
//   }
// };

// export default {
//   save,
//   load,
// };
