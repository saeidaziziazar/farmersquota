import Order from '../models/order.js';
import Quota from '../models/quota.js';

export function getOrdersOfCustomer(customer_id) {
    return Order.getOrdersByCustomerId(customer_id);
}

export function getQuota(contract_number) {
    return Quota.getQuotaByNumber(contract_number);
}

export function assignQuotasToOrder(amount, contract_numbers, customer_id) {
    let order = new Order;
    order.amount = amount;
    order.type = "import";
    order.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    order.description = '';
    order.customer_id = customer_id;
    order.save();   
    
    setTimeout(() => {
        contract_numbers.forEach((item) => {
            let quota = Quota.getQuotaByNumber(item);
            quota.order_id = order.id;
            quota.save();
        })
    }, 300);
}