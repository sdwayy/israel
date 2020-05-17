const ESC_KEYCODE = 27;

const overlay = document.querySelector(`.overlay`);
const body = document.querySelector(`body`);
const closeBtns = overlay.querySelectorAll(`.btn--close`);

const closeOverlay = () => {
  overlay.classList.add(`visually-hidden`);
  body.style.overflow = `visible`;
  document.removeEventListener(`keydown`, escPressHandler);
  overlay.removeEventListener(`click`, overlayClickHandler);
  closeBtns.forEach((btn) => btn.removeEventListener(`click`, closeBtnClickHandler));
};

const openOverlay = () => {
  body.style.overflow = `hidden`;
  document.addEventListener(`keydown`, escPressHandler);
  overlay.addEventListener(`click`, overlayClickHandler);
  overlay.classList.remove(`visually-hidden`);
  closeBtns.forEach((btn) => btn.addEventListener(`click`, closeBtnClickHandler));
};

const overlayClickHandler = (evt) => {
  if (evt.target === overlay) {
    closeOverlay();
  }
};

const escPressHandler = (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    closeOverlay();
  }
};

const closeBtnClickHandler = () => {
  closeOverlay();
};


export {
  closeOverlay,
  openOverlay,
  closeBtns,
  closeBtnClickHandler
};
