document.addEventListener("DOMContentLoaded", () => {
  const listPhoto = document.querySelector('.gallery__list-photo--1');
  const btn = document.querySelector('.gallery__btn');
  const itemPhoto = listPhoto.querySelectorAll('.gallery__item-photo');
  const itemPerClick = 3;
  let visibleItem = 6;

  for (let i = 0; i < 6 && i < itemPhoto.length; i++) {
    itemPhoto[i].style.display = 'block';
  }

  if (itemPhoto.length > 6) {
    btn.style.display = 'inline-block';
  }

  function showMoreItems() {
    for (let i = visibleItem; i < visibleItem + itemPerClick && i < itemPhoto.length; i++) {
      itemPhoto[i].style.display = 'block';
    }
    visibleItem += itemPerClick;

    if (visibleItem >= itemPhoto.length) {
      btn.style.display = 'none';
    }
  }

  btn.addEventListener("click", showMoreItems);
});
