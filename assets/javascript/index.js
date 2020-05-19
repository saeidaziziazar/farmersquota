const bcrypt = require('bcrypt');
const anime = require('animejs');

document.addEventListener('DOMContentLoaded', () => {
    loginValidation();

    anime.timeline({
        delay: 600,
        easing: 'easeInOutQuint',
    }).add({
        targets: '.login-text',
        duration: 1800,
        delay: 0,
        translateX: [80, 0],
        opacity: [0, 1],
    }).add({
        targets: '#username',
        duration: 2000,
        delay: 0,
        opacity: [0, 1],
    }, '-=1200').add({
        targets: '#password',
        duration: 2000,
        delay: 0,
        opacity: [0, 1],
    }, '-=1200').add({
        targets: '.login-btn',
        duration: 2000,
        delay: 0,
        translateX: [-80, 0],
        opacity: [0, 1],
    }, '-=1600').add({
        targets: '.container',
        duration: 20000,
        delay: 0,
        scale: [1, 1.1],
    });

    // anime({
    //     targets: '.login-btn',
    //     duration: 1000,
    //     delay: 1000,
    //     translateX: [-100, 0],
    //     easing: 'easeInOutExpo',
    // })
})

/*************
 * input validation
 */

function loginValidation() {
    var form = document.getElementById('loginform');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        let username = document.querySelector('input#username');
        let password = document.querySelector('input#password');

        if (username.value == "") {
            username.classList.add('login-input-error');
            isValid = false;
        } else {
            username.classList.remove('login-input-error');
        }

        if (password.value == "") {
            password.classList.add('login-input-error');
            isValid = false
        } else {
            password.classList.remove('login-input-error');
        }

        if (isValid) {
            authantication();
        }
    })
}


/*************
 * Authantication
 */
function authantication() {
    // user input values
    let userInput = username.value;
    let passInput = password.value;

    // error ul
    errorLi = document.querySelector('.error-list li')
    
    // finding specific user and check auth
    let query = "SELECT * FROM `users` WHERE `username`=" + connection.escape(userInput);

    connection.query(query, (error, result, fields) => {
        if (!error) {
            if (result[0]) {
                bcrypt.compare(passInput, result[0].password).then(function(result) {
                    if (!result) {
                        errorLi.classList.add('show');
                    } else {
                        errorLi.classList.remove('show');
                    }
                })
            } else {
                errorLi.classList.add('show');
            }
        }
    });
}