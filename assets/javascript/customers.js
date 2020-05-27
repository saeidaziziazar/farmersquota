const remote = require('electron').remote

document.addEventListener('DOMContentLoaded', (e) => {
    customerIndex();

    document.querySelectorAll('input[required]').forEach((item, index) => {
        item.addEventListener('invalid', (e) => {
            e.preventDefault();
        })
    })
})


/********
 * get all customers from DB
 */
function customerIndex() {
    let query = 'SELECT * FROM customers';

    // connecting to database
    connection.query(query, (error, result, fields) => {
        if (!error) {
            let customers = document.querySelector('.customers');
            if (document.querySelector('.list-group')) {
                document.querySelector('.list-group').remove();
            }
            if (document.querySelector('.add-btn')) {
                document.querySelector('.add-btn').remove();
            }

            let ul = document.createElement('ul');
            ul.classList.add('list-group');
            
            // appnding each item to ul
            result.forEach((value, index) => {
                let li = document.createElement('li');
                li.classList.add('list-group-item');

                li.innerHTML = value.first_name + ' ' + value.last_name + ' | ' + value.phone_number;

                let div = document.createElement('div');

                // add event listener to edit btn
                div.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.customerEdit(value.id);
                })

                li.appendChild(div);

                // add event listener to list items
                li.addEventListener('click', (e) => {
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

            // button for new cutomer
            let addBtn = document.createElement('div');
            addBtn.classList.add('add-btn');
            addBtn.addEventListener('click', (e) => {
                this.customerCreate(addBtn);
            });

            // appending ul to div.customers
            customers.appendChild(ul); 
            // customers.appendChild(customerEdit);
            customers.appendChild(addBtn);
        } else {
            console.error(console.error);
        }
    });
}

/*******
 * edit a specific customer
 */
function customerEdit(id) {
    document.querySelector('.edit-customer').classList.add('edit-customer-show');

    document.querySelector('input[type="button"]').addEventListener('click', (e) => {
        document.querySelector('.edit-customer').classList.remove('edit-customer-show');
    })
}


/*********
 * create a new customer
 */
function customerCreate(addBtn) {
    let editDiv = document.querySelector('.new-customer');
    let form = document.querySelector('.customer-form');
    
    if (addBtn.classList.contains('add-btn-close')) {
        editDiv.classList.remove('new-customer-show');
        addBtn.classList.remove('add-btn-close');
        form.reset();
    } else {
        editDiv.classList.add('new-customer-show');
        addBtn.classList.add('add-btn-close');
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
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
                editDiv.classList.remove('new-customer-show');
                addBtn.classList.remove('add-btn-close');
                customerIndex();
                form.reset();
            }
        });
        }).catch((error) => {
            console.log(error)
        })
    })
}


// convert date to store in DB
// console.log(date.toISOString().slice(0, 19).replace('T', ' '));
// var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };
