// Получаем все элементы с классом .blog__slide (каждый слайд) и сохраняем их в переменную slides в виде списка (NodeList).
const slides = document.querySelectorAll('.blog__slide');
// Получаем все элементы с классом .blog__dot (точки навигации) и сохраняем их в переменную dots в виде списка.
const dots = document.querySelectorAll('.blog__dot');
// Инициализируем переменную currentSlide, которая хранит индекс текущего слайда. Начальное значение — первый слайд (индекс 0).
let currentSlide = 0;
// Создаем флаг isDragging, который указывает, выполняется ли сейчас действие перетаскивания (свайпа). Изначально false.
let isDragging = false;
// Переменная startPos будет хранить начальную позицию при начале свайпа (где был первый клик или касание).
let startPos = 0;
// currentTranslate хранит текущее значение трансформации (сдвига) по оси X. Изначально 0, т.е. слайды не сдвинуты.
let currentTranslate = 0;
// prevTranslate сохраняет позицию трансформации (сдвига) перед началом свайпа, чтобы мы могли сравнивать с новым положением.
let prevTranslate = 0;
// Переменная для хранения ID анимации requestAnimationFrame, чтобы ее можно было остановить.
let animationID = 0;
// Получаем элемент слайдера (контейнер всех слайдов) и сохраняем его в переменную slider.
const slider = document.querySelector('.blog__slider');

// Обновление видимого слайда и активной точки
function updateSlider(index) {
    const slideWidth = slides[0].clientWidth;
    currentTranslate = -index * slideWidth;
    document.querySelector('.blog__slides').style.transform = `translateX(${currentTranslate}px)`;

    // Обновление активной точки
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}
// Получаем ширину первого слайда slideWidth, чтобы знать, на сколько нужно смещать слайды при переключении.
// Вычисляем новое значение трансформации currentTranslate, смещая на количество слайдов, равное index.
// С помощью transform: translateX() сдвигаем контейнер .blog__slides на нужное количество пикселей влево.
// Убираем класс active у всех точек (чтобы не было двух активных точек).
// Добавляем класс active точке, соответствующей текущему слайду (по индексу index), чтобы визуально показать, какой слайд активен.

// Обработка кликов по точкам
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider(index);
    });
});
// Для каждой точки dot добавляем обработчик события клика.
// При клике на точку переключаем текущий слайд на тот, который соответствует индексу точки (currentSlide = index), и вызываем updateSlider(index) для переключения.

// Обработка нажатий на клавиши
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        currentSlide = (currentSlide + 1) % slides.length;
    } else if (event.key === 'ArrowLeft') {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }
    updateSlider(currentSlide);
});
// Добавляем глобальный обработчик для событий нажатия клавиш.
// Если нажата клавиша “вправо” (ArrowRight), увеличиваем индекс currentSlide и переходим к следующему слайду. Используем % slides.length, чтобы вернуться на первый слайд, если дошли до последнего.
// Если нажата клавиша “влево” (ArrowLeft), уменьшаем индекс слайда, чтобы переключиться на предыдущий слайд.
// После изменения индекса вызываем updateSlider(currentSlide), чтобы обновить отображение.


// Свайп начало
// Добавляем обработчики событий для начала свайпа: mousedown (для мыши) и touchstart (для сенсорных устройств).
// При событии mousedown или touchstart запускается функция startDrag, которая начинает обработку свайпа.
slider.addEventListener('mousedown', startDrag);
slider.addEventListener('touchstart', startDrag);

// Добавляем обработчики событий для завершения свайпа: mouseup (для мыши) и touchend (для сенсорных устройств).
// При этих событиях запускается функция endDrag, которая завершает обработку свайпа.
slider.addEventListener('mouseup', endDrag);
slider.addEventListener('touchend', endDrag);

// Добавляем обработчики событий для отслеживания движения при свайпе: mousemove (для мыши) и touchmove (для сенсорных экранов).
// Во время движения запускается функция drag, которая отслеживает положение курсора или касания.
slider.addEventListener('mousemove', drag);
slider.addEventListener('touchmove', drag);

function startDrag(event) {
    isDragging = true;
    startPos = getPositionX(event);
    prevTranslate = currentTranslate;
    animationID = requestAnimationFrame(animation);
}
// Устанавливаем флаг isDragging в true, указывая, что свайп начался.
// Получаем начальную позицию свайпа (начальную координату X) с помощью функции getPositionX и сохраняем её в startPos.
// Запоминаем текущее положение слайдов в prevTranslate, чтобы потом сравнивать с новым положением.
// Запускаем анимацию с помощью requestAnimationFrame, которая будет непрерывно обновлять положение слайдера.

function drag(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        const movement = currentPosition - startPos;
        currentTranslate = prevTranslate + movement;
    }
}
// Проверяем, что свайп продолжается (isDragging = true).
// Получаем текущую позицию мыши или касания с помощью функции getPositionX.
// Вычисляем, насколько сдвинулась мышь или палец относительно начальной позиции (startPos). Это движение хранится в переменной movement.
// Обновляем текущее смещение слайдов (currentTranslate), добавляя к предыдущему смещению (prevTranslate) разницу между текущей и начальной позициями.

function endDrag() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentSlide < slides.length - 1) {
        currentSlide++;
    } else if (movedBy > 100 && currentSlide > 0) {
        currentSlide--;
    }

    updateSlider(currentSlide);
}
// Останавливаем свайп, устанавливая isDragging = false.
// Прерываем анимацию, вызванную через requestAnimationFrame, используя cancelAnimationFrame.
// Рассчитываем, на сколько пикселей сдвинулся слайд во время свайпа, вычитая предыдущее смещение от текущего.
// Если слайд сдвинут на 100 пикселей или больше влево и не является последним, переходим к следующему слайду, увеличивая currentSlide.
// Если слайд сдвинут на 100 пикселей или больше вправо и не является первым, возвращаемся к предыдущему слайду, уменьшая currentSlide.
// Это условие гарантирует, что смена слайда произойдет только при значительном свайпе, исключая случайные движения.
// После завершения свайпа обновляем положение слайдера, вызвав функцию updateSlider, которая переместит слайды на нужное место.

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}
// Возвращает координату X в зависимости от типа события: если это мышь, возвращается event.pageX (позиция мыши по оси X), а если это касание, возвращается clientX первого касания.

function animation() {
    document.querySelector('.blog__slides').style.transform = `translateX(${currentTranslate}px)`;
    if (isDragging) requestAnimationFrame(animation);
}
// Перемещает блок слайдов по горизонтали, используя стиль transform: translateX(), где смещение определяется значением currentTranslate. Это значение обновляется в процессе свайпа.
// Если пользователь всё ещё свайпает (isDragging), функция рекурсивно вызывает саму себя с помощью requestAnimationFrame, что обеспечивает плавное движение слайдов.

// Инициализация
updateSlider(currentSlide);
// При загрузке страницы вызывается функция updateSlider для установки начальной позиции слайдера на первом слайде (currentSlide = 0), чтобы слайдер корректно отображал первый слайд и активную точку сразу после запуска.