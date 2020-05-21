const bcrypt = require('bcrypt');
const anime = require('animejs');
const remote = require('electron').remote

document.addEventListener('DOMContentLoaded', () => {
    loadingAnimation();
    loginValidation();
})


/*********
 * set session for loged user
 */
function setSession(id) {
    const cookie = { url: 'http://myapp.com', name: 'id', value: id.toString() }
    remote.session.defaultSession.cookies.set(cookie)
    .then(() => {
        console.log('asasas');
    }, (error) => {
        console.error(error)
    })
}


/*************
* Adding some loading animations 
*/
function loadingAnimation() {
    anime.timeline({
        delay: 600,
        easing: 'easeInOutQuint',
    }).add({
        targets: '.login-text',
        duration: 1200,
        delay: 0,
        translateX: [80, 0],
        opacity: [0, 1],
    }).add({
        targets: '#username',
        duration: 1600,
        delay: 0,
        opacity: [0, 1],
    }, '-=1200').add({
        targets: '#password',
        duration: 1600,
        delay: 0,
        opacity: [0, 1],
    }, '-=1200').add({
        targets: '.login-btn',
        duration: 1200,
        delay: 0,
        translateX: [-80, 0],
        opacity: [0, 1],
    }, '-=900');
}

function leavingAnimations() {
    anime.timeline({
        easing: 'easeInOutQuint',
        delay: 0,
    }).add({
        targets: '.container',
        duration: 6000,
        scale: [1, 1.03],
    }).add({
        targets: '.login-btn',
        duration: 1200,
        delay: 0,
        translateX: [0, -80],
        opacity: [1, 0],
    }, 1000).add({
        targets: '#password',
        duration: 1600,
        delay: 0,
        opacity: [1, 0],
    }, 1600).add({
        targets: '#username',
        duration: 1600,
        delay: 0,
        opacity: [1, 0],
    }, 2400).add({
        targets: '#loginform',
        duration: 600,
        delay: 0,
        opacity: [1, 0]
    }, 2800).add({
        targets: '.login-text',
        duration: 2000,
        delay: 0,
        scale: [1,8],
        translateX: [0, -150],
        opacity: [1, 0],
    }, 2500)
}


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
                bcrypt.compare(passInput, result[0].password).then(function(res) {
                    if (!res) {
                        errorLi.classList.add('show');
                    } else {
                        setSession(result[0].id);
                        leavingAnimations();
                        setTimeout(() => {
                            window.location.replace('test.html');
                        }, 4000);
                    }
                })
            } else {
                errorLi.classList.add('show');
            }
        }
    });
}