document.addEventListener('DOMContentLoaded', (e) => {
    customerIndex();
})

function liOnClick() {
    console.log('asas');
    
    document.querySelectorAll('.list-group-item').forEach((el, index) => {
        console.log(el);
    })
}

/********
 * get all customers from DB
 */
function customerIndex() {
    let query = 'SELECT * FROM customers';

    // connecting to database
    connection.query(query, (error, result, fields) => {
        if (!error) {
            let customers = document.querySelector('.customers');
            customers.innerHTML = null;
            let ul = document.createElement('ul');
            ul.classList.add('list-group');
            
            // appnding each item to ul
            result.forEach((value, index) => {
                let li = document.createElement('li');
                li.classList.add('list-group-item');
                li.innerHTML = value.first_name + ' ' + value.last_name + ' | ' + value.phone_number;
                li.addEventListener('click', (e) => {
                    console.log(value.id);
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
