const phoneInputHandler = (phoneInput) => {
  const phoneInputLength = phoneInput.value.length;
  const minInputLength = 16;

  if (phoneInputLength < minInputLength) {
    phoneInput.setCustomValidity(`Введите корректный номер`);
  } else {
    phoneInput.setCustomValidity(``);
  }
};

// const validateInputs = (inputs) => {
//   for (const input of inputs) {
//     if (!input.checkValidity()) {
//       console.log(input);
//     }
//   }
// };

// const submitClickHandler = () => {
//   validateInputs();
// };

const submitHandler = (form, accept) => {
  form.classList.add(`visually-hidden`);
  accept.classList.remove(`visually-hidden`);
};

export {
  phoneInputHandler,
  submitHandler
};
