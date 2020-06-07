const remote = require('electron').remote;
var customer_id;

document.addEventListener('DOMContentLoaded', (e) => {
    customerIndex();

    document.querySelectorAll('input[required]').forEach((item, index) => {
        item.addEventListener('invalid', (e) => {
            e.preventDefault();
        })
    })
    
    document.querySelector('.customers .add-btn').addEventListener('click', (e) => {
        let editDiv = document.querySelector('.new-customer');
        
        
        if (e.target.classList.contains('add-btn-close')) {
            editDiv.classList.remove('new-customer-show');
            e.target.classList.remove('add-btn-close');
        } else {
            editDiv.classList.add('new-customer-show');
            e.target.classList.add('add-btn-close');
        }
    })

    document.querySelector('.customer-form').addEventListener('submit', (e) => {
        e.preventDefault();
        customerCreate(e.target);
    });

    document.querySelector('.customer-form-edit').addEventListener('submit', (e) => {
        e.preventDefault();
        customerUpdate(e.target);
    })

    document.querySelector('.customer-form-edit .header img').addEventListener('click', (e) => {
        document.querySelector('#deleteconfirm').classList.add('popup-show');
    })

    document.querySelector('#cancel-delete-customer-popup').addEventListener('click', (e) => {
        document.querySelector('#deleteconfirm').classList.remove('popup-show');
    })
})


/********
 * get all customers from DB
 */
function customerIndex() {
    let query = 'SELECT * FROM customers';
    if (document.querySelector('.list-group')) {
        document.querySelector('.list-group').remove();
    }

    document.querySelector('.edit-customer').classList.remove('edit-customer-show');
    document.querySelector('.new-customer').classList.remove('new-customer-show');
    document.querySelector('.add-btn').classList.remove('add-btn-close');

    // connecting to database
    connection.query(query, (error, result, fields) => {
        if (!error) {
            let customers = document.querySelector('.customers');

            let ul = document.createElement('ul');
            ul.classList.add('list-group');
            
            // appending each item to ul
            result.forEach((value, index) => {
                let li = document.createElement('li');
                li.classList.add('list-group-item');

                li.innerHTML = value.first_name + ' ' + value.last_name + ' | ' + value.phone_number;

                let div = document.createElement('div');
                div.appendChild(document.createElement('div'));

                // add event listener to edit btn
                div.addEventListener('click', (e) => {
                    e.stopPropagation();
                    document.querySelector('.edit-customer').classList.add('edit-customer-show');
                    document.querySelector('input[type="button"]').addEventListener('click', (e) => {
                        document.querySelector('.edit-customer').classList.remove('edit-customer-show');
                    })
                    customerEdit();
                })

                // create a hidden input to keep id of customer
                let hidden = document.createElement('input');
                hidden.setAttribute('type', 'hidden');
                hidden.setAttribute('value', value.id);
                li.appendChild(hidden);

                li.appendChild(div);

                // add event listener to list items
                li.addEventListener('click', (e) => {
                    customer_id = value.id;
                    ul.childNodes.forEach((item, index) => {
                        item.classList.remove('list-group-item-active');
                        item.lastChild.classList.remove('show');
                        
                        if (item === e.target) {
                            item.classList.add('list-group-item-active');
                            item.lastChild.classList.add('show');
                        }
                    })
                })
                ul.appendChild(li);
            })

            // appending ul to div.customers
            customers.appendChild(ul); 
        } else {
            console.error(console.error);
        }
    });
}

/*********
 * create a new customer
 */
function customerCreate(form) {
    let customer = [];
    let query_input = {};

    form.querySelectorAll('input').forEach((input, index) => {
        if (input.type !== 'submit')
            customer[input.name] = input.value;
    })
    
    query_input.first_name = customer['firstname'];
    query_input.last_name = customer['lastname'];
    query_input.phone_number = customer['number'];
    query_input.address = customer['address'];
    query_input.description = customer['describe'];

    // get user id from session
    remote.session.defaultSession.cookies.get({name : 'id'})
    .then((cookies) => {
        query_input.creator_id = parseInt(cookies[0].value);

        connection.query('INSERT INTO `customers` SET ?', query_input, function (error, results, fields) {
        if (error) throw error;
        else {
            customerIndex();
            form.reset();
        }
    });
    }).catch((error) => {
        console.log(error)
    })
}

/*******
 * edit a specific customer
 */
function customerEdit() { 
    let fisrtname = document.getElementById('editfirstname');
    let lastname = document.getElementById('editlastname');
    let number = document.getElementById('editnumber');
    let address = document.getElementById('editaddress');
    let describe = document.getElementById('editdescribe');

    let query = 'SELECT * FROM customers WHERE `id` = ' + connection.escape(customer_id);

    connection.query(query, (error, results, fields) => {
        if (!error) {
            fisrtname.value = results[0].first_name;
            lastname.value = results[0].last_name;
            number.value = results[0].phone_number;
            address.value = results[0].address;
            describe.value = results[0].description;
        }
    })
}


/******
 * update customer on DB
 */

function customerUpdate(form, id) {
    let customer = [];
    let query_input = {};

    form.querySelectorAll('input').forEach((input, index) => {
        if (input.type !== 'submit')
            customer[input.name] = input.value;
    })
    
    query_input.first_name = customer['editfirstname'];
    query_input.last_name = customer['editlastname'];
    query_input.phone_number = customer['editnumber'];
    query_input.address = customer['editaddress'];
    query_input.description = customer['editdescribe'];

    connection.query('UPDATE customers SET ? WHERE id = ?', [query_input, customer_id], function (error, results, fields) {
        if (error) throw error;
        else {
            customerIndex();
            form.reset();
        }
    });
}


/********
 * delete customer from DB
 */

function customerDelete(id) {
    connection.query('DELETE FROM customers WHERE id = ?', customer_id, function (error, results, fields) {
        if (error) throw error;
        else {
            document.querySelector('#deleteconfirm').classList.remove('popup-show');
            customerIndex();
            form.reset();
        }
    });
}


// convert date to store in DB
// console.log(date.toISOString().slice(0, 19).replace('T', ' '));
// var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };
