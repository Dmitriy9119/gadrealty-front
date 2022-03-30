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
                    if (!input.value && input.id !== "password-confirmation-input") {
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
                                            if (input.id !== "password-confirmation-input") {
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
                    input.classList.remove('is-valid', 'is-invalid')
                    form.classList.add('was-validated')
                }, false);
            });
        }, false);
    })();

// show/hide/style password button------------------------------------------------------------------
    const handleShowHidePassword = (event) => {
        const input = document.getElementById(event.currentTarget.name);
        const icon = document.getElementById(`${event.currentTarget.name}-icon`)
        let iconStyle = icon.classList[--icon.classList.length]
        iconStyle = iconStyle.includes('text') ? iconStyle : ""
        if (input.type === "password") {
            input.type = "text"
            icon.className = `fa icon-eye-open fa-eye ${iconStyle}`
            icon.title = "Hide your password"
        } else {
            input.type = "password"
            icon.title = "Show your password"
            icon.className = `fa icon-eye-close fa-eye-slash ${iconStyle}`
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
        const icon = document.getElementById('password-confirmation-input-sign-up-icon')
        passwordConfirm.value !== password.value ? icon.classList.add('text-danger') : icon.classList.replace('text-danger', 'text-success')
    }


