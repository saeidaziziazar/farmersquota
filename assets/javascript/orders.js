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

    document.querySelector('#add-order-input').addEventListener('keyup', (e) => {
        if (e.keyCode === 13 && e.key === 'Enter') orderController.getQuota();
    })
})