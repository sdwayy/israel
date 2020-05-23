const checkNameInput = (input) => {
  if (input.value.length === 0) {
    setErrorFor(input, `Пожалуйста, представьтесь`);
    return false;
  } else if (input.value.length < 2) {
    setErrorFor(input, `Введите корректное имя`);
    return false;
  } else {
    setSuccesFor(input);
    return true;
  }
};

const checkPhoneInput = (input) => {
  if (!input.checkValidity()) {
    setErrorFor(input, `Проверьте введеный номер`);
    return false;
  } else if (input.value.length === 0) {
    setErrorFor(input, `Введите ваш номер`);
    return false;
  } else if (input.value.length < 16) {
    setErrorFor(input, `Введите полный номер`);
    return false;
  } else {
    setSuccesFor(input);
    return true;
  }
};


const submitHandler = (form, accept) => {
  form.classList.add(`visually-hidden`);
  accept.classList.remove(`visually-hidden`);
};

const setSuccesFor = (input) => {
  const errorMessage = input.parentElement.querySelector(`.error`);

  input.className = `input--valid`;
  errorMessage.innerText = ``;
};

const setErrorFor = (input, message) => {
  const errorMessage = input.parentElement.querySelector(`.error`);

  input.className = `input--invalid`;
  errorMessage.innerText = message;
};

export {
  submitHandler,
  checkNameInput,
  checkPhoneInput
};
