
function forms() {
    "use strict";

    document.addEventListener('DOMContentLoaded', () => {
            // проверка инпутов для телефона и имени
        let phoneInputs = document.querySelectorAll('input[type=tel]'),
            mailInputs = document.querySelectorAll('input[type=email]'),
            nameInputs = document.querySelectorAll('input[type=text]');
            
        phoneInputs.forEach( (inp) => {
            inp.setAttribute('maxlength', '20');
            inp.addEventListener('input', function() {
                this.value = verifyTelephone(this.value);
            });
        });
        mailInputs.forEach( (inp) => {
            inp.setAttribute('maxlength', '35');
            inp.addEventListener('input', function() {
                this.value = verifyEmail(this.value);
            });
        });
        nameInputs.forEach( (inp) => {
            inp.setAttribute('maxlength', '35');
            inp.addEventListener('input', function() {
                this.value = removeNotLetters(this.value);
            });
        });
        
            // Submit forms
        let allForms = document.querySelectorAll('.offer-form');
            
        allForms.forEach( (form) => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                submitForm(this);
            });
        });
    });

        // Submit form

    let statusMessage = {
        loading: 'Загрузка...',
        success: {
            title: 'Спасибо!',
            message: 'Спасибо! Скоро мы с вами свяжемся!'
        },
        not_sent: {
            title: 'Ошибка',
            message: 'Извините, письмо не отправлено по техническим причинам.'
        },
        failure: {
            title: 'Ошибка',
            message: 'Извините, произошла ошибка соединения с сервером.'
        }
    };

        // отправляет данные в formData, атрибут data - необязателен (данные, которые надо отправить дополнительно к данным с формы), форма - this
    function submitForm(form) {
        let formData = new FormData(form);

            // FormData to Object
        let dataObject = {};
        for (const [key, value] of formData.entries()) {
            dataObject[key] = value;
        }
        // console.log(dataObject);
        
        let uriDataToSend = convertObjectToStringURI(dataObject);
        
        let requestBody = uriDataToSend,
            request = new XMLHttpRequest();
        
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(requestBody);
        
        request.onreadystatechange = function() {
            if (request.readyState < 4) {
                showStatus('loading', form);
            } else if (request.readyState === 4 && request.status === 200) {
                if (request.responseText == 'true') {
                    showStatus('success', form);
                } else {
                    showStatus('not_sent', form);
                }
            } else {
                showStatus('failure', form);
            }
        };

        function convertObjectToStringURI(obj) {
            let arr = [];

            for (let key in obj) {
                arr.push( key + '=' + encodeURIComponent( obj[key] ) );
            }
            // console.log(arr.join('&'));
            return arr.join('&');
        }

        function showStatus(type, form) {
            let statusBox = form.querySelector('.status'),
                formInputs = form.querySelectorAll('input');
            
            if (type == 'loading') {
                statusBox.innerText = statusMessage.loading;

            } else {
                statusBox.innerText = '';
                // formInputs.forEach( (input) => input.value = '' );
                formInputs.forEach(function (input) {
                    return input.value = '';
                });

                if (form.classList.contains('popup-form')) {
                    let popup = document.querySelector('.popup.popup-form');
                    if (form == popup.querySelector('form')) {
                        closePopup(popup);
                    }
                }
                showPopup('thanks');
                let statusTitle = document.querySelector('.thanks__title'),
                    statusText = document.querySelector('.thanks__text');

                statusTitle.innerText = statusMessage[type].title;
                statusText.innerText = statusMessage[type].message;
            }

        }
    }
}

module.exports = forms;