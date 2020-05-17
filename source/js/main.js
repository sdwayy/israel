import imask from 'imask';

import {
  openOverlay,
  closeOverlay
} from './module/overlay';

import {
  phoneInputHandler,
  submitHandler
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

  imask(phoneInput, {mask: `+{7}(000)000-00-00`});
  phoneInput.addEventListener(`input`, () => phoneInputHandler(phoneInput));
  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    submitHandler(feedbackForm, acceptedBlock);
  });
}
