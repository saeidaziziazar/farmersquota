const bcrypt = require('bcrypt');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'farmersquota'
});

connection.connect();

document.addEventListener('DOMContentLoaded', () => {
    /*********** 
    // input validation
    ***********/

    var form = document.getElementById('loginform');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let username = document.querySelector('input#username');
        let usernamelabel = document.querySelector('[for="username"]');
        let password = document.querySelector('input#password');
        let passwordlabel = document.querySelector('[for="password"]');

        if (username.value == "") {
            username.classList.add('login-input-error');
            usernamelabel.classList.add('login-label-show');
        } else {
            username.classList.remove('login-input-error');
            usernamelabel.classList.remove('login-label-show');
        }

        if (password.value == "") {
            password.classList.add('login-input-error');
            passwordlabel.classList.add('login-label-show');
        } else {
            password.classList.remove('login-input-error');
            passwordlabel.classList.remove('login-label-show');
        }
    })
})

