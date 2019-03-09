function map() {
    
    'use strict';

    let placemarkBlock = 
    '<div class="placemark">' +
        '<div class="placemark__image">' +
            '<img src="img/map-image.jpg" alt="Здание завода">' +
        '</div>' +
        '<div class="placemark__info">' +
            '<div class="placemark__title">Мы находимся:</div>' +
            '<p class="placemark__text">г. Москва, ул. Неверовского, д. 9<br>' +
                'Телефон: <a class="placemark__tel" href="tel:+74954444444">+7 (495) 444-44-44</a><br>' +
                'E-mail: <a class="placemark__mail" href="mailto:info@ied.ru">info@ied.ru</a>' +
            '</p></div></div>';

    ymaps.ready(init);

    function init() {
        let myMap = new ymaps.Map('map', {
            center: [55.738024, 37.510322],
            zoom: 9,
            controls: ['zoomControl', 'typeSelector',  'fullscreenControl', 'routeButtonControl']
        }, {
            searchControlProvider: 'yandex#search'
        });

        let placemark = new ymaps.Placemark(myMap.getCenter(), {
            // Содержимое основной части балуна.
            balloonContentBody: placemarkBlock,
            // Содержимое всплывающей подсказки.
            hintContent: 'Балашиха хлеб'
        });
        // Добавим метку на карту.
        myMap.geoObjects.add(placemark);
        // Откроем балун на метке.
        placemark.balloon.open();
    }
}

module.exports = map;