document.addEventListener('DOMContentLoaded', (e) => {
    customerIndex();
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
            // customers.innerHTML = null;

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
                    this.customerEdit();
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

            // div overlay for create and edit customers and appending to customers div
            // let customerEdit = document.createElement('div');
            // customerEdit.classList.add('edit-customer');

            // button for new cutomer
            let addBtn = document.createElement('div');
            addBtn.classList.add('add-btn');
            addBtn.addEventListener('click', (e) => {
                this.customerEdit();
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

function customerEdit() {
    document.querySelector('.edit-customer').classList.add('edit-customer-show');
}
