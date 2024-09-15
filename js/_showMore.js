document.addEventListener("DOMContentLoaded", () => {
  const showMoreButton = document.querySelector('.gallery__btn-more'); // Кнопка "Показать еще"
  const hiddenItems = document.querySelectorAll('.gallery__item-photo.hidden-img'); // Скрытые элементы
  let itemsToShow = 3; // Количество изображений, которые будем показывать за один раз
  let currentIndex = 0; // Индекс для отслеживания текущей позиции

  showMoreButton.addEventListener('click', () => {
    // Показываем следующие 3 скрытые картинки
    for (let i = currentIndex; i < currentIndex + itemsToShow; i++) {
      if (hiddenItems[i]) {
        hiddenItems[i].classList.remove('hidden-img');
      }
    }
    currentIndex += itemsToShow;

    // Если больше скрытых элементов нет, скрываем кнопку
    if (currentIndex >= hiddenItems.length) {
      showMoreButton.style.display = 'none';
    }
  });
});