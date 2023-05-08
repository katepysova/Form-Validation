const form = document.querySelector(".form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#password-2");

const showError = (input, message) => {
  const formControl = input.parentElement;
  const error = formControl.querySelector(".form__control-error");
  error.innerText = message;
  formControl.classList.remove("success");
  formControl.classList.add("error");
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  const error = formControl.querySelector(".form__control-error");
  error.innerText = "";
  formControl.classList.remove("error");
  formControl.classList.add("success");
};

const isEmpty = (value) => {
  return value.trim().length === 0;
};

const isBetween = (value, min, max) =>
  value.length >= min && value.length <= max;

const getFieldName = (input) => {
  const name = input.id.split("-")[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const checkEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailValue = email.value;
  let isValid = false;
  if (isEmpty(emailValue)) {
    showError(email, `${getFieldName(email)} is a required field.`);
  } else if (!re.test(emailValue.toLowerCase())) {
    showError(email, `${getFieldName(email)} has a wrong format.`);
  } else {
    isValid = true;
    showSuccess(email);
  }
  return isValid;
};

const checkUsername = (username) => {
  const usernameValue = username.value;
  let isValid = false;
  const min = 4;
  const max = 20;
  if (isEmpty(usernameValue)) {
    showError(username, `${getFieldName(username)} is a required field.`);
  } else if (!isBetween(usernameValue, min, max)) {
    showError(
      username,
      `${getFieldName(username)} length must be between ${min} and ${max}.`
    );
  } else {
    isValid = true;
    showSuccess(username);
  }
  return isValid;
};

const checkPassword = (password) => {
  const passwordValue = password.value;
  let isValid = false;
  const min = 4;
  const max = 12;
  if (isEmpty(passwordValue)) {
    showError(password, `${getFieldName(password)} is a required field.`);
  } else if (!isBetween(passwordValue, min, max)) {
    showError(
      password,
      `${getFieldName(password)} length must be between ${min} and ${max}.`
    );
  } else {
    isValid = true;
    showSuccess(password);
  }
  return isValid;
};

const checkPasswordsMatch = (first, second) => {
  let isValid = false;

  if (first.value !== second.value) {
    showError(passwordConfirm, "Passwords don't match.");
  } else {
    isValid = true;
    showSuccess(passwordConfirm);
  }
  return isValid;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isUsernameValid = checkUsername(username);
  const isEmailValid = checkEmail(email);
  const isPasswordValid = checkPassword(password);
  const isPasswordMatch =
    checkPassword(passwordConfirm) &&
    checkPasswordsMatch(password, passwordConfirm);

  if (isUsernameValid && isEmailValid && isPasswordValid && isPasswordMatch) {
    /*
      send data
    */
  }
});
