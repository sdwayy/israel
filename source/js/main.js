import imask from 'imask';

import {
  openOverlay,
  closeOverlay
} from './module/overlay';

import {
  submitHandler,
  checkNameInput,
  checkPhoneInput
} from './module/feedback-form';


const feedbackForm = document.querySelector(`.feedback-form`);
const feedbackLink = document.querySelector(`.page-header__feedback-link`);
const acceptedBlock = document.querySelector(`.accept`);

if (feedbackLink) {
  const feedbackLinkClickHandler = () => {
    openOverlay();
  };

  feedbackLink.addEventListener(`click`, feedbackLinkClickHandler);
}

if (acceptedBlock) {
  const acceptBtn = acceptedBlock.querySelector(`.accept__btn-accept`);

  const acceptBtnClickHandler = () => {
    closeOverlay();
  };

  acceptBtn.addEventListener(`click`, acceptBtnClickHandler);
}

if (feedbackForm) {
  const form = feedbackForm.querySelector(`form`);
  const phoneInput = feedbackForm.querySelector(`input[type="tel"]`);
  const nameInput = feedbackForm.querySelector(`#feedback-form__user-name`);

  const checkInputs = () => {
    let validState = false;
    const nameInputValid = checkNameInput(nameInput);
    const phoneInputValid = checkPhoneInput(phoneInput);

    if (nameInputValid && phoneInputValid) {
      validState = true;
    }

    return validState;
  };

  imask(phoneInput, {mask: `+{7}(000)000-00-00`});
  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    if (checkInputs()) {
      submitHandler(feedbackForm, acceptedBlock);
    }
  });
}
