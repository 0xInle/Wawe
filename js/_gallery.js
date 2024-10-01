document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('.gallery__link'); // Все ссылки для табов
  const contentSections = document.querySelectorAll('.gallery__list-photo'); // Блоки контента
  const btn = document.querySelector('.gallery__btn'); // Кнопка "Show More"
  const itemPerClick = 3;
  const initialVisible = 6; // Сколько изображений показывать по умолчанию

  // Функция скрытия всех секций
  function hideAllSections() {
    contentSections.forEach(section => {
      section.classList.remove('active');
      const items = section.querySelectorAll('.gallery__item-photo');
      
      // Скрываем все картинки при скрытии секции
      items.forEach(item => item.style.display = 'none');
    });
  }

  // Функция для показа нужного блока по ID
  function showSection(id) {
    const targetSection = document.querySelector(id);
    if (targetSection) {
      targetSection.classList.add('active');
      showInitialItems(targetSection); // Показываем первые элементы при загрузке или переключении
      checkButtonVisibility(targetSection); // Проверка кнопки при показе секции
    }
  }

  // Обработчик клика для ссылок
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Останавливаем переход по ссылке
      const targetId = event.target.getAttribute('href'); // Получаем ID блока
      hideAllSections(); // Скрываем все блоки
      showSection(targetId); // Показываем нужный блок
    });
  });

  // Изначально показываем секцию "ВСЕ" и проверяем кнопку
  showSection('#all');

  // Функция для показа начальных изображений
  function showInitialItems(section) {
    const itemPhoto = section.querySelectorAll('.gallery__item-photo');
    let visibleItem = initialVisible;

    // Отображаем только первые 6 элементов или меньше, если элементов меньше
    for (let i = 0; i < visibleItem && i < itemPhoto.length; i++) {
      itemPhoto[i].style.display = 'block';
    }

    // Сохраняем количество отображаемых элементов в data-visible
    section.dataset.visible = visibleItem;
  }

  // Функция для проверки необходимости отображения кнопки "Show More"
  function checkButtonVisibility(section) {
    const itemPhoto = section.querySelectorAll('.gallery__item-photo');
    let visibleItem = parseInt(section.dataset.visible) || initialVisible; // Видимые элементы

    if (itemPhoto.length > visibleItem) {
      btn.style.display = 'inline-block';
    } else {
      btn.style.display = 'none';
    }
  }

  // Функция для показа дополнительных изображений
  function showMoreItems() {
    const activeSection = document.querySelector('.gallery__list-photo.active'); // Активная секция
    const itemPhoto = activeSection.querySelectorAll('.gallery__item-photo');
    let visibleItem = parseInt(activeSection.dataset.visible) || initialVisible;

    for (let i = visibleItem; i < visibleItem + itemPerClick && i < itemPhoto.length; i++) {
      itemPhoto[i].style.display = 'block';
      setTimeout(() => itemPhoto[i].classList.add('show'), 10);
    }

    visibleItem += itemPerClick;
    activeSection.dataset.visible = visibleItem;

    if (visibleItem >= itemPhoto.length) {
      btn.style.display = 'none';
    }
  }

  // Обработчик клика для кнопки "Show More"
  btn.addEventListener("click", showMoreItems);
});