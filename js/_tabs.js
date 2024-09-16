document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('.gallery__link'); // Все ссылки для табов
  const contentSections = document.querySelectorAll('.gallery__list-photo'); // Блоки контента

  // Функция скрытия всех секций
  function hideAllSections() {
    contentSections.forEach(section => {
      section.classList.remove('active');
    });
  }

  // Функция для показа нужного блока по ID
  function showSection(id) {
    const targetSection = document.querySelector(id);
    if (targetSection) {
      targetSection.classList.add('active');
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

  // Показ блока "ВСЕ" по умолчанию
  showSection('#all');
});
