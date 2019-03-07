"use strict";

document.addEventListener('DOMContentLoaded', () => {
    let forms = require('./parts/forms.js'),
        map = require('./parts/map.js'),
        modals = require('./parts/modals.js');
        
    forms();
    map();
    modals();
});
