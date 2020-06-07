import * as orderController from '../../app/controllers/orderController.js';

document.addEventListener('DOMContentLoaded', (e) => {

    // call getOrders when each item in list was clicked
    setTimeout(() => {
        document.querySelectorAll('.customers .list-group .list-group-item').forEach((item) => {
            item.addEventListener('click', (e) => {
                getOrders(item.querySelector('input[type=hidden]').value);
            })
        }) 
    }, 1000);

    // slide up new order form
    document.querySelector('.orders .add-btn').addEventListener('click', (e) => {
        let newOrder = document.querySelector('.new-order');
        
        if (e.target.classList.contains('add-btn-close')) {
            newOrder.classList.remove('new-order-show');
            e.target.classList.remove('add-btn-close');
        } else {
            newOrder.classList.add('new-order-show');
            e.target.classList.add('add-btn-close');
        }
    })

    document.querySelector('.orders .new-order .add-orders').addEventListener('submit', (e) => {
        e.preventDefault();
    })

    // add new order to list
    document.querySelector('#add-order-input').addEventListener('keyup', (e) => {
        if (e.keyCode === 13 && e.key === 'Enter') {
            let orderlist = document.querySelector('.added-orders-list');
            let quota = orderController.getQuota(e.target.value);
            
            let exict = false;

            orderlist.querySelectorAll('ul li div#number').forEach((item, index) => {
                if (e.target.value === item.innerHTML) exict = true;
            })

            if (exict === false) {
                setTimeout(() => {
                    if (quota.id != null) {
                        if (quota.order_id == null) {
                            // create element for list item
                            let ul = orderlist.querySelector('ul');
                            let li = document.createElement('li');
                            let idDiv = document.createElement('div');
                            idDiv.setAttribute('id', 'number');
                            idDiv.innerHTML =  quota.contract_number;
                            let amountDiv = document.createElement('div');
                            amountDiv.setAttribute('id', 'amount');
                            amountDiv.innerHTML =  quota.amount;
                            let moreInfoDiv = document.createElement('div');
                            moreInfoDiv.setAttribute('id', 'moreinfo');
                            moreInfoDiv.innerHTML = quota.farmer_name + ' | ' + quota.district + ' | ' + quota.village;
                            li.append(idDiv, amountDiv, moreInfoDiv);                
                            ul.insertBefore(li, ul.firstChild);

                            let sum = 0;
                            orderlist.querySelectorAll('ul li div#amount').forEach((item, index) => {                          
                                sum = sum + parseInt(item.innerHTML);
                            })
                            document.querySelector('.added-orders-sum #sum').innerHTML = 'مجموع وزن حواله ها :' + sum;
                        } else {
                            console.log('exict but already exported');
                        }
                    } else {
                        console.log('does not exict');
                    }
                }, 50);
            } else {
                console.log('already exict');
            }
        }
    })

    document.querySelector('#actionbtns #confirm').addEventListener('click', (event) => {
        let contract_numbers = [];
        document.querySelectorAll('.added-orders-list ul li div#number').forEach((item, index) => {
            contract_numbers.push(item.innerHTML);
        })
        console.log(contract_numbers, customer_id);
    })
})