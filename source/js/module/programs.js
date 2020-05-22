
const programsItemClickHandler = (evt, block) => {
  const target = evt.target;
  const activeBtns = block.querySelectorAll(`.programs__name-item--active`);
  const activeDescription = block.querySelector(`.programs__descriptions-item--active`);

  let newActiveDescription = ``;

  activeBtns.forEach((btn) => btn.classList.remove(`programs__name-item--active`));
  target.classList.add(`programs__name-item--active`);

  if (target.classList.contains(`programs__name-item--common`)) {
    newActiveDescription = block.querySelector(`.programs__descriptions-item--common`);
  } else if (target.classList.contains(`programs__name-item--academic`)) {
    newActiveDescription = block.querySelector(`.programs__descriptions-item--academic`);
  } else if (target.classList.contains(`programs__name-item--study`)) {
    newActiveDescription = block.querySelector(`.programs__descriptions-item--study`);
  } else if (target.classList.contains(`programs__name-item--volunt`)) {
    newActiveDescription = block.querySelector(`.programs__descriptions-item--volunt`);
  } else if (target.classList.contains(`programs__name-item--religion`)) {
    newActiveDescription = block.querySelector(`.programs__descriptions-item--religion`);
  } else {
    newActiveDescription = ``;
  }
  activeDescription.classList.remove(`programs__descriptions-item--active`);
  newActiveDescription.classList.add(`programs__descriptions-item--active`);
};

export {
  programsItemClickHandler
};
