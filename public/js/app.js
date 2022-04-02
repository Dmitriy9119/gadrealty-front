// Validation -----------------------------------------------------------------------------
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Validation main form on Enter button press
        document.addEventListener("keypress", function (event) {
            if (event.target.className.includes("modal fade show")) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    event.target.querySelector('button[type="submit"]').click()
                }
            }
        });

        // onInput and onBlur of each input validation
        const singleForms = document.getElementsByClassName('form-floating');
        const inputValidation = Array.prototype.filter.call(singleForms, function (form) {
            const input = form.querySelector('input');
            input.addEventListener('blur', function () {
                if (!input.value && input.required && input.id !== "password-confirmation-input-sign-up") {
                    input.classList.add('is-invalid')
                }
            }, false);

            input.addEventListener('input', function (event) {
                //display show/hide password button
                if (input.id.includes('password')) {
                    event.composedPath().map(item => {
                        if (item.id?.indexOf("passwd") === 0) {
                            const passwdIcons = [...item.getElementsByClassName('input-group-append')]
                            passwdIcons.map(item => {
                                event.target.value ? item.classList.remove('d-none') : item.classList.add('d-none')
                                //styling show/hide password icon
                                const icons = [...item.getElementsByTagName('i')].map(icon => {
                                        if (input.id !== "password-confirmation-input-sign-up") {
                                            if (input.checkValidity()) {
                                                icon.classList.replace('text-danger', 'text-success')
                                            } else icon.classList.add('text-danger')
                                        }
                                    }
                                )
                            })
                        }
                    })
                }
                //validate inputs
                if (input.required) {
                    input.classList.remove('is-valid', 'is-invalid')
                    form.classList.add('was-validated')
                }
            }, false);
        });
    }, false);
})();

// show/hide/style password button------------------------------------------------------------------
const handleShowHidePassword = (event) => {
    const input = document.getElementById(event.currentTarget.name);
    const icon = document.getElementById(`${event.currentTarget.name}-icon`)
    let iconValidationStyle = icon.classList[--icon.classList.length]
    iconValidationStyle = iconValidationStyle.includes('text') ? iconValidationStyle : ""
    if (input.type === "password") {
        input.type = "text"
        icon.className = `fa icon-eye-open fa-eye ${iconValidationStyle}`
        icon.title = "Hide your password"
    } else {
        input.type = "password"
        icon.title = "Show your password"
        icon.className = `fa icon-eye-close fa-eye-slash ${iconValidationStyle}`
    }
}

// Validation main form on submit button click
const handleValidation = (event, form) => {
    event.preventDefault();
    event.stopPropagation();
    form.checkValidity() ? form.submit() : form.classList.add('was-validated')

}

// Validation of password confirm input
const handlePasswordConfirmValidation = (password, passwordConfirm) => {
    passwordConfirm.setCustomValidity(passwordConfirm.value === password.value ? "" : "invalid")
    //styling icon on validation
    console.log()
    const icons = [...document.getElementsByTagName('i')]
    icons.map(icon => {
        if (icon.id.includes("password-confirmation"))
            passwordConfirm.value !== password.value ? icon.classList.add('text-danger') : icon.classList.replace('text-danger', 'text-success')
    })
}


// Add to favorites in card ver.1
// const handleAddToFavorites = (event) => {
// do something...
// icon styling...
//     const icon = event.target
//     if (icon.classList.contains("far")) {
//         icon.className = "fa fa-heart fa-lg text-warning"
//         icon.title = "Remove from Favorites"
//     } else {
//         icon.className = "far fa-heart fa-lg text-muted"
//         icon.title = "Add to Favorites"
//     }
// }