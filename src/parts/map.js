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

    //Переменная для включения/отключения индикатора загрузки
    let spinner = document.querySelector('.map-container .loader');
    //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
    let checkIfLoad = false;

    //Функция создания карты сайта и затем вставки ее в блок с идентификатором #map-yandex
    function init () {
        let myMap = new ymaps.Map('map-yandex', {
            center: [55.738024, 37.510322],
            zoom: 13,
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

        // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
        let layer = myMap.layers.get(0).get(0);
        
        // Решение по callback-у для определения полной загрузки карты
        waitForTilesLoad(layer).then(function() {
            // Скрываем индикатор загрузки после полной загрузки карты
            spinner.classList.remove('is-active');
        });
    }
    
    // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
    function waitForTilesLoad(layer) {
        return new ymaps.vow.Promise(function (resolve, reject) {
            let tc = getTileContainer(layer), readyAll = true;
            tc.tiles.each(function (tile, number) {
                if (!tile.isReady()) {
                    readyAll = false;
                }
            });
            if (readyAll) {
                resolve();
            } else {
                tc.events.once("ready", function() {
                    resolve();
                });
            }
        });
    }

    function getTileContainer(layer) {
        for (let k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (
                    layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                    || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
                ) {
                    return layer[k];
                }
            }
        }
        return null;
    }

    // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
    function loadScript(url, callback){
        let script = document.createElement("script");
        
        if (script.readyState){  // IE
            script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
            };
        } else {  // Другие браузеры
            script.onload = function(){
            callback();
            };
        }
        
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    
    // Основная функция, которая проверяет когда мы навели на блок с классом map-container
    let ymap = function() {
        document.querySelector('.map-container').onmouseenter = function() {
            if (!checkIfLoad) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
        
                // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                checkIfLoad = true; 
        
                // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                spinner.classList.add('is-active');
        
                // Загружаем API Яндекс.Карт
                loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1&amp;apikey=9c0254fc-b560-4b57-9b85-d3b36ca89ee5", function() {
                    // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором map-yandex
                    ymaps.load(init);
                });                
            }
        };
    };

    document.addEventListener('DOMContentLoaded', () => {
        //Запускаем основную функцию
        ymap();
    });
}

module.exports = map;
