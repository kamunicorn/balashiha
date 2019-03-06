
function forms() {
"use strict";
document.addEventListener('DOMContentLoaded', () => {

        // проверка инпутов для телефона и имени

    let phoneInputs = document.querySelectorAll('input[name=user_phone]'),
        nameInputs = document.querySelectorAll('input[name=user_name]');
        
    phoneInputs.forEach( (inp) => {
        inp.addEventListener('input', function() {
            this.value = verifyTelephone(this.value);
        });
    });

    nameInputs.forEach( (inp) => {
        inp.addEventListener('input', function() {
            this.value = removeNotLetters(this.value);
        });
    });
    
        // Submit forms

    let mainForms = document.querySelectorAll('.main_form'),
        popup = document.querySelector('.popup .form'),
        popupEngineer = document.querySelector('.popup_engineer .form');
        
    mainForms.forEach( (form) => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm.call(this);
        });
    });
	
    popup.addEventListener('submit', function(e) {
        e.preventDefault();
        submitForm.call(this);
    });
    popupEngineer.addEventListener('submit', function(e) {
        e.preventDefault();
        submitForm.call(this);
    });

});
}

module.exports = forms;