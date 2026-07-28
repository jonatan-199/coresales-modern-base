/*==================================================
    CoreSales Modern
    login.js
====================================================*/

"use strict";

/*==================================================
    Login Controller
====================================================*/

const Login = {

    emailInput: null,

    passwordInput: null,

    loginButton: null,

    rememberCheck: null,

    togglePassword: null,

    form: null,

    /*==========================================
        Inicialización
    ==========================================*/

    init() {

        this.cacheDOM();

        this.loadRememberedUser();

        this.bindEvents();

    },

    /*==========================================
        Referencias DOM
    ==========================================*/

    cacheDOM() {

        this.form = document.getElementById("loginForm");

        this.emailInput = document.getElementById("email");

        this.passwordInput = document.getElementById("password");

        this.loginButton = document.querySelector(".btn-login");

        this.rememberCheck = document.getElementById("remember");

        this.togglePassword = document.querySelector(".show-password");

    },

    /*==========================================
        Eventos
    ==========================================*/

    bindEvents() {

        this.form.addEventListener("submit", (e) => {

            e.preventDefault();

            this.login();

        });

        this.togglePassword.addEventListener("click", () => {

            this.togglePasswordVisibility();

        });

    },

    /*==========================================
        Login
    ==========================================*/

    async login() {

        const email = this.emailInput.value.trim();

        const password = this.passwordInput.value.trim();

        if (!this.validate(email, password))
            return;

        this.setLoading(true);

        await this.delay(1200);

        /*
            Simulación
            Usuario:
            admin@coresales.com

            Password:
            admin123
        */

        if (

            email === "admin@coresales.com"

            &&

            password === "admin123"

        ) {

            this.saveRememberUser(email);

            this.showMessage(

                "Inicio de sesión correcto.",

                "success"

            );

            setTimeout(() => {

                window.location.href = "index.html";

            }, 800);

        }
        else {

            this.showMessage(

                "Usuario o contraseña incorrectos.",

                "error"

            );

        }

        this.setLoading(false);

    },

    /*==========================================
        Validaciones
    ==========================================*/

    validate(email, password) {

        if (email === "") {

            this.showMessage(

                "Ingrese su correo electrónico.",

                "warning"

            );

            this.emailInput.focus();

            return false;

        }

        if (!this.isValidEmail(email)) {

            this.showMessage(

                "Correo electrónico inválido.",

                "warning"

            );

            this.emailInput.focus();

            return false;

        }

        if (password === "") {

            this.showMessage(

                "Ingrese la contraseña.",

                "warning"

            );

            this.passwordInput.focus();

            return false;

        }

        if (password.length < 6) {

            this.showMessage(

                "La contraseña debe tener al menos 6 caracteres.",

                "warning"

            );

            return false;

        }

        return true;

    },

    /*==========================================
        Email
    ==========================================*/

    isValidEmail(email) {

        const regex =

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);

    },

    /*==========================================
        Mostrar contraseña
    ==========================================*/

    togglePasswordVisibility() {

        if (this.passwordInput.type === "password") {

            this.passwordInput.type = "text";

            this.togglePassword.classList.remove("fa-eye");

            this.togglePassword.classList.add("fa-eye-slash");

        }
        else {

            this.passwordInput.type = "password";

            this.togglePassword.classList.remove("fa-eye-slash");

            this.togglePassword.classList.add("fa-eye");

        }

    },

    /*==========================================
        Loading
    ==========================================*/

    setLoading(state) {

        if (state) {

            this.loginButton.disabled = true;

            this.loginButton.innerHTML =

                '<i class="fa-solid fa-spinner fa-spin"></i> Ingresando...';

        }
        else {

            this.loginButton.disabled = false;

            this.loginButton.innerHTML =

                '<i class="fa-solid fa-right-to-bracket"></i> Ingresar';

        }

    },

    /*==========================================
        Recordar usuario
    ==========================================*/

    saveRememberUser(email) {

        if (this.rememberCheck.checked) {

            localStorage.setItem(

                "coresales_user",

                email

            );

        }
        else {

            localStorage.removeItem(

                "coresales_user"

            );

        }

    },

    loadRememberedUser() {

        const email =

            localStorage.getItem("coresales_user");

        if (!email)
            return;

        this.emailInput.value = email;

        this.rememberCheck.checked = true;

    },

    /*==========================================
        Mensajes
    ==========================================*/

    showMessage(message, type) {

        const previous =

            document.querySelector(".login-alert");

        if (previous)
            previous.remove();

        const alert = document.createElement("div");

        alert.className =

            "login-alert " + type;

        alert.textContent = message;

        this.form.prepend(alert);

        setTimeout(() => {

            alert.remove();

        }, 3500);

    },

    /*==========================================
        Delay
    ==========================================*/

    delay(ms) {

        return new Promise(resolve => {

            setTimeout(resolve, ms);

        });

    }

};

/*==================================================
    Accesibilidad
====================================================*/

document.addEventListener("keydown", (event) => {

    if (

        event.key === "Enter"

        &&

        document.activeElement.tagName === "INPUT"

    ) {

        Login.form.requestSubmit();

    }

});

/*==================================================
    Inicialización
====================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Login.init();

    }

);