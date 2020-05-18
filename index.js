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
        let password = document.querySelector('input#password');

        if (username.value == "") {
            username.classList.add('login-input-error');
        } else {
            username.classList.remove('login-input-error');
        }

        if (password.value == "") {
            password.classList.add('login-input-error');
        } else {
            password.classList.remove('login-input-error');
        }
    })
})

