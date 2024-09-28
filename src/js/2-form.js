const STORAGE_KEY = 'feedback-form-state';
const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', onFormInput);

loadFormData();

function onFormInput({ target }) {
  formData[target.name] = target.value.trim();

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.log(error.name);
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  if (email === '' || message === '') {
    alert('Please fill in all the fields!');
    return;
  }

  // send
  formData.email = email;
  formData.message = message;
  console.log(formData);

  // reset
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
}

function loadFormData() {
  try {
    const formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (formData) {
      for (const [name, value] of Object.entries(formData)) {
        form.elements[name].value = value;
      }
    }
  } catch (error) {
    console.log(error.name);
    return;
  }
}
