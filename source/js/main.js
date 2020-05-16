import imask from 'imask';

const ESC_KEYCODE = 27;

const feedbackLink = document.querySelector(`.page-header__feedback-link`);
const overlay = document.querySelector(`.overlay`);
const body = document.querySelector(`body`);


if (overlay) {
  const phoneInput = overlay.querySelector(`input[type="tel"]`);
  const sumbitBtn = overlay.querySelector(`button[type="submit"]`);
  const closeBtn = overlay.querySelector(`button[type="reset"]`);
  const inputs = overlay.querySelectorAll(`input`);

  const closeOverlay = () => {
    overlay.classList.add(`visually-hidden`);
    removeHandlers();
    body.style.overflow = `visible`;
  };

  const escPressHandler = (evt) => {
    if (evt.keyCode === ESC_KEYCODE) {
      closeOverlay();
    }
  };

  const openOverlay = () => {
    addHandlers();
    body.style.overflow = `hidden`;
    overlay.classList.remove(`visually-hidden`);
  };

  const overlayClickHandled = (evt) => {
    if (evt.target === overlay) {
      closeOverlay();
    }
  };

  const feedbackLinkClickHandler = (evt) => {
    evt.preventDefault();
    openOverlay();
  };

  const phoneInputHandler = (evt) => {
    evt.preventDefault();
    const phoneInputLength = phoneInput.value.length;
    const minInputLength = 16;

    if (phoneInputLength < minInputLength) {
      phoneInput.setCustomValidity(`Введите корректный номер`);
    } else {
      phoneInput.setCustomValidity(``);
    }
  };

  const submitClickHandler = (evt) => {
    evt.preventDefault();
  };

  const removeHandlers = () => {
    closeBtn.removeEventListener(`click`, closeOverlay);
    document.removeEventListener(`keydown`, escPressHandler);
    overlay.removeEventListener(`click`, overlayClickHandled);
    sumbitBtn.removeEventListener(`click`, submitClickHandler);
  }

  const addHandlers = () => {
    document.addEventListener(`keydown`, escPressHandler);
    closeBtn.addEventListener(`click`, closeOverlay);
    overlay.addEventListener(`click`, overlayClickHandled);
    sumbitBtn.addEventListener(`click`, submitClickHandler);
  };

  imask(phoneInput, {mask: `+{7}(000)000-00-00`});
  phoneInput.addEventListener(`input`, phoneInputHandler);
  feedbackLink.addEventListener(`click`, feedbackLinkClickHandler);
}
