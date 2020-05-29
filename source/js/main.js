import imask from 'imask';
import Swiper from 'swiper';

import {
  openOverlay,
  closeOverlay,
  showAcceptBlock
} from './module/overlay';

import {
  checkNameInput,
  checkPhoneInput
} from './module/feedback-form';

import {
  programsItemClickHandler
} from './module/programs';

const MAX_TABLET_WIDTH = 1023;
const MAX_MOBILE_WIDTH = 767;
const MIN_MOBILE_WIDTH = 320;

const html = document.querySelector(`html`);
const feedbackForm = document.querySelector(`.feedback-form`);
const feedbackLink = document.querySelector(`.page-header__feedback-link`);
const acceptedBlock = document.querySelector(`.accept`);
const programsBlock = document.querySelector(`.programs`);
const tabletMaxMediaExpression = getMaxMediaExpression(MAX_TABLET_WIDTH);
const tabletMinMedaExpression = getMinMediaExpression(MAX_MOBILE_WIDTH + 1);
const mobileMaxMediaExpression = getMaxMediaExpression(MAX_MOBILE_WIDTH);
const mobileMinMediaExpression = getMinMediaExpression(MIN_MOBILE_WIDTH);
const feedbackSection = document.querySelector(`.feedback`);
const headerAnchor = document.querySelector(`.page-header__scroll`);
const liveIn = document.querySelector(`.live-in`);
const imagesSources = document.querySelectorAll(`source`);
const questions = document.querySelector(`.questions`);
const reviews = document.querySelector(`.reviews`);
const moreInfo = document.querySelector(`.more-info`);

function getMinMediaExpression(minWidth) {
  return `(min-width: ${minWidth}px)`;
}

function getMaxMediaExpression(maxWidth) {
  return `(max-width: ${maxWidth}px)`;
}

function scrollToAnchor(anchor) {
  const anchorId = anchor.getAttribute(`href`).substr(1);

  document.getElementById(anchorId).scrollIntoView({
    behavior: `smooth`,
    block: `start`
  });
}

if (headerAnchor) {
  const headerAnchorClickHandler = (evt) => {
    evt.preventDefault();
    scrollToAnchor(headerAnchor);
  };

  headerAnchor.addEventListener(`click`, headerAnchorClickHandler);
}

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
      showAcceptBlock();
    }
  });
}

if (programsBlock) {
  const getProgramsNameItems = () => programsBlock.querySelectorAll(`.programs__name-item`);

  if (window.matchMedia(mobileMaxMediaExpression).matches) {
    const programsContainer = programsBlock.querySelector(`.programs__container`);
    const programsNamesContainer = programsBlock.querySelector(`.programs__names-container`);
    const programsNamesList = programsBlock.querySelector(`.programs__names-list`);

    programsContainer.classList.remove(`wrapper`);
    programsNamesContainer.classList.add(`swiper-container`);
    programsNamesList.classList.add(`swiper-wrapper`);
    getProgramsNameItems().forEach((btn) => btn.classList.add(`swiper-slide`));

    const programsBlockSwiper = new Swiper(`.programs__names-container`, {
      slidesPerView: `auto`,
      freeMode: true,
      loop: true,
    });

    programsBlockSwiper.init();
  }

  getProgramsNameItems().forEach(
      (btn) => btn.addEventListener(`click`, (evt) => programsItemClickHandler(evt, programsBlock))
  );
}

if (feedbackSection) {
  const phoneInput = feedbackSection.querySelector(`input[type="tel"]`);
  const phoneForm = feedbackSection.querySelector(`form`);

  const sumbitBtnClickHandler = (evt) => {
    evt.preventDefault();

    if (checkPhoneInput(phoneInput)) {
      showAcceptBlock();
      openOverlay();
      return true;
    } else {
      return false;
    }
  };

  imask(phoneInput, {mask: `+{7}(000)000-00-00`});
  phoneForm.addEventListener(`submit`, sumbitBtnClickHandler);
}

if (liveIn) {
  const liveInGallery = liveIn.querySelector(`.live-in__gallery`);
  const mainGalleryItem = liveInGallery.querySelector(`.live-in__gallery-item--main`);
  const mainGalleryItemCopy = mainGalleryItem.cloneNode(true);
  const galleryContainer = liveInGallery.querySelector(`.live-in__gallery-container`);

  const getGalleryItems = () => galleryContainer.querySelectorAll(`.live-in__gallery-item`);

  const addMobileClasses = () => {
    mainGalleryItem.remove();
    mainGalleryItemCopy.classList.remove(`live-in__gallery-item--main`);
    galleryContainer.insertBefore(mainGalleryItemCopy, getGalleryItems()[0]);

    liveInGallery.classList.add(`swiper-container`);
    galleryContainer.classList.add(`swiper-wrapper`);

    for (const galleryItem of getGalleryItems()) {
      galleryItem.classList.add(`swiper-slide`);
      galleryItem.classList.remove(`live-in__gallery-item--short`);
      galleryItem.classList.remove(`live-in__gallery-item--long`);
    }
  };

  if (window.matchMedia(tabletMaxMediaExpression).matches) {
    addMobileClasses();
  }

  if (
    window.matchMedia(tabletMinMedaExpression).matches &&
    window.matchMedia(tabletMaxMediaExpression).matches
  ) {
    const gallerySwiper = new Swiper(`.live-in__gallery`, {
      slidesPerView: 2,
      pagination: {
        el: `.swiper-pagination`,
        clickable: true,
      },
    });

    gallerySwiper.init();
  }

  if (
    window.matchMedia(mobileMinMediaExpression).matches &&
    window.matchMedia(mobileMaxMediaExpression).matches
  ) {
    addMobileClasses();

    const gallerySwiper = new Swiper(`.live-in__gallery`, {
      pagination: {
        el: `.swiper-pagination`,
        clickable: true,
      },
    });

    gallerySwiper.init();
  }
}

if (questions) {
  const questionsList = questions.querySelector(`.questions__list`);
  const questionDescription = questions.querySelectorAll(`p`);
  const descriptionBtns = questions.querySelectorAll(`.questions__open-description-btn`);
  const questionsElements = questionsList.querySelectorAll(`li`);

  const questionClickHandler = (question) => {
    const description = question.querySelector(`p`);
    const descriptionBtn = question.querySelector(`.questions__open-description-btn`);

    descriptionBtn.classList.toggle(`questions__open-description-btn--not-active`);
    descriptionBtn.classList.toggle(`questions__open-description-btn--active`);
    description.classList.toggle(`visually-hidden`);
  };

  questionDescription.forEach((description) => description.classList.add(`visually-hidden`));
  descriptionBtns.forEach((btn) => btn.classList.remove(`questions__open-description-btn--disabled`));
  descriptionBtns.forEach((btn) => btn.classList.add(`questions__open-description-btn--not-active`));
  questionsElements.forEach((question) => question.addEventListener(`click`, () => questionClickHandler(question)));
}

if (reviews) {
  const reviewsList = reviews.querySelector(`.reviews__list`);
  const slides = reviewsList.querySelectorAll(`li`);
  const container = reviews.querySelector(`.reviews__container`);

  container.classList.add(`swiper-container`);
  reviewsList.classList.add(`swiper-wrapper`);
  slides.forEach((slide) => slide.classList.add(`swiper-slide`));

  const reviewsSwiper = new Swiper(`.reviews__container`, {
    pagination: {
      el: `.reviews__pagination`,
      type: `fraction`,
    },
    navigation: {
      nextEl: `.reviews__btn-next`,
      prevEl: `.reviews__btn-prev `,
    },
  });

  reviewsSwiper.init();
}

if (moreInfo) {
  const phoneInput = moreInfo.querySelector(`input[type="tel"]`);
  const form = moreInfo.querySelector(`form`);
  const nameInput = moreInfo.querySelector(`input[name="user-name"]`);

  const checkInputs = () => {
    let validState = false;
    const nameInputValid = checkNameInput(nameInput);
    const phoneInputValid = checkPhoneInput(phoneInput);

    if (nameInputValid && phoneInputValid) {
      validState = true;
    }

    return validState;
  };

  const sumbitBtnClickHandler = (evt) => {
    evt.preventDefault();

    if (checkInputs()) {
      showAcceptBlock();
      openOverlay();
      return true;
    } else {
      return false;
    }
  };

  imask(phoneInput, {mask: `+{7}(000)000-00-00`});
  form.addEventListener(`submit`, sumbitBtnClickHandler);
}

if (html.classList.contains(`no-webp`)) {
  for (const src of imagesSources) {
    const imageSrc = src.srcset;
    src.srcset = imageSrc.replace(/.webp/gi, `.png`);
  }
}
