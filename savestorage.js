/**
 * javaScript saveStorage - 11.03.2020
 * Version: 1.0.0
 * Website: https://github.com/sarkhanrajabov/saveStorage-js
 * Author: Sarkhan Rajabov
 * Customize: Ricardo Flores
 **/

function saveStorage(selector, options){
    'use strict';

    if(typeof Storage !== "undefined"){

        let form     = document.querySelector(selector),
            key 	 = form.getAttribute('id') + '_saveStorage',
            elements = form.querySelectorAll('input, textarea, select'),
            defaults = {
                exclude: [],
                patientId: null,
                formName: null,
                buttonName: null
            };

        let extend = function(out) {
            out = out || {};

            for (let i = 1; i < arguments.length; i++) {
                if (!arguments[i])
                    continue;

                for (let key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key))
                        out[key] = arguments[i][key];
                }
            }

            return out;
        };

        let opts = extend({}, defaults, options);

        if(opts && opts.formName) {
            key += opts.formName
        }

        if(opts && opts.patientId) {
            key += opts.patientId
        }

        let excludeInputType = function(){
            let inputType = '';

            opts.exclude.forEach(function(type){
                inputType += ':not([type='+type+'])';
            });

            return inputType;
        };

        let serializeArray = function(){
            let serializeData = [];

            elements.forEach(function(el){
                if(el.type !== 'radio' && el.type !== 'checkbox'){
                    serializeData.push({name: el.name, value: el.value, type: el.type});
                }
                else if(el.ariaChecked){
                    serializeData.push({name: el.name, value: el.ariaChecked, type: el.type});
                }
            });

            return serializeData;
        };

        let setLocalStorage = function(){
            let formData = JSON.stringify(serializeArray());
            localStorage.setItem(key, formData);
        };

        let initApp = function(){
            if(localStorage.getItem(key) !== null){

                let data = JSON.parse(localStorage.getItem(key));

                data.forEach(function(v){
                    if(v.type !== 'radio' && v.type !== 'checkbox'){
                        if(form.querySelector('[name='+v.name+']')){
                            let input = form.querySelector('[name='+v.name+']' + excludeInputType());

                            if(input !== null){
                                input.value = v.value;
                            }
                        }
                    }
                    else {
                        let input = form.querySelectorAll('[name='+v.name+']');
                        input.forEach(function(el){
                            if(el.name === v.name){
                                // el.checked = true;
                                el.ariaChecked = v.value;
                            }
                        })
                    }
                });
            }
        };

        form.addEventListener('change', function(){
            setLocalStorage();
        });

        elements.forEach(function(el){
            el.addEventListener('keyup', function(){
                setLocalStorage();
            });

            if(el.type === "checkbox") {
                let cortarId = el.id.split("-");
                cortarId.pop()
                /*let id = cortarId.reduce((finalId, tag, index) => index === 0 ? finalId + tag : finalId + "-" + tag, "")*/
                let id = cortarId[0]
                let checkboxWrapper = form.querySelector(`#${id}`);
                el.addEventListener('click', function(){
                    setLocalStorage();
                });
                setTimeout(function() {
                    if(el.ariaChecked === "true") {
                        checkboxWrapper.classList.add("mat-checkbox-checked")
                    } else {
                        checkboxWrapper.classList.remove("mat-checkbox-checked")
                    }
                }, 800);
            }

        });

        form.querySelector(opts.buttonName || "#send_form").addEventListener('click', function(){
            localStorage.removeItem(key);
        });

        initApp();
    }
    else {
        console.error('Sorry! No web storage support.');
    }
}