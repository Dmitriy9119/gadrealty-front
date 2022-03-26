// // Validation SignUp
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Validation of each input
        const forms = document.getElementsByClassName('needs-validation');
        const inputValidation = Array.prototype.filter.call(forms, function (form) {
            if (form.id !== "mainForm") {
                const input = document.getElementById(`${form.id}Input`);
                input.addEventListener('blur', function () {
                    !input.value && input.id !== "passwordConfirmationInput" && input.classList.add('is-invalid')
                }, false);
                input.addEventListener('input', function () {
                    form.classList.add('was-validated')
                    if (input.id !== "passwordConfirmationInput") {
                        if (form.checkValidity()) {
                            input.classList.remove('is-invalid')
                            form.classList.add('was-validated')
                            form.checkValidity() && input.classList.add('is-valid')
                        } else {
                            input.classList.remove('is-valid')
                            form.classList.add('was-validated')
                            !form.checkValidity() && input.classList.add('is-invalid')
                        }
                    }
                }, false);
            }
        });

        // Validation of all inputs after submit button click
        const submitButton = document.getElementById('submitButton');
        submitButton.addEventListener('click', function (event) {
            const check = [];
            const forms = $('.needs-validation');
            for (let i = 0; i < forms.length; i++) {
                forms[i].classList.add('was-validated')
                forms[i].checkValidity() && check.push(true)
            }
            if (check.length === forms.length) {
                console.log('validated successfully') //что-то делаем дальше...
            } else {
                event.preventDefault()
                event.stopPropagation()
            }
        }, false);
    }, false);
})();
// // End Validation SignUp

