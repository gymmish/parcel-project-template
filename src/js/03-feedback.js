import throttle from "lodash.throttle";

const refs = {
  form: document.querySelector(".js-feedback-form"),
};

refs.form.addEventListener("submit", onFormSubmit);
refs.form.addEventListener("input", throttle(onFormInput, 500));

const STORAGE_KEY = "feedback-form-state";
const formData = {};

// refs.form.addEventListener("input", (e) => {
//   formData[e.target.name] = e.target.value;
//   console.log(formData);
// });

function onFormSubmit(event) {
  event.preventDefault();

  event.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput() {
  formData = {
    message: `${refs.form.elements.message.value}`,
    mail: `${refs.form.elements.email.value}`,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function saveForm() {
  const sevedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (sevedData !== null) {
    refs.form.elements.email.value = sevedData.email;
    refs.form.elements.message.value = sevedData.message;
  }
}
saveForm();
