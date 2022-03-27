// Validation on input's value change...-----------------------------------------------
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
    }, false);
})();

// Validation of all inputs after Sig Up button click----------------------------------
function handleValidation(event) {
    const check = [];
    const forms = $('.needs-validation');
    forms.toArray().map(form => {
        if (form.id === "mainForm") {
            check.push(true)
        } else {
            form.classList.add('was-validated')
            form.checkValidity() && check.push(true)
        }
    })
    if (check.length !== forms.length) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        window.location.replace("/url");  // ------------------go to some URL, if all inputs are valid
    }
}

// Validation of all inputs after Enter button press-------------------------------------------
document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const modalVisible = document.getElementsByClassName('modal fade sign-up show')
        if (modalVisible.length) {
            event.preventDefault()
            event.stopPropagation()
            handleValidation(event)
        }
    }
}, false);


// show/hide password button------------------------------------------------------------------
function handleShowHidePassword(event) {
    const input = document.getElementById(event.currentTarget.name);
    const icon = document.getElementById(`${event.currentTarget.name}Icon`)
    if (input.type === "password") {
        input.type = "text"
        icon.className = "fa icon-eye-close fa-eye-slash"
        icon.title = "Hide your password"
    } else {
        input.type = "password"
        icon.title = "Show your password"
        icon.className = "fa icon-eye-open fa-eye"
    }
}


