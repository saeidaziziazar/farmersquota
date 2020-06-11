import Order from '../models/order.js';
import Quota from '../models/quota.js';

export function getOrdersOfCustomer() {
    
}

export function getQuota(contract_number) {
    return Quota.getQuotaByNumber(contract_number);
}

export function assignQuotasToOrder(amount, contract_numbers, customer_id) {
    let order = new Order;
    order.amount = amount;
    order.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    order.description = '';
    order.customer_id = customer_id;
    order.save();
    console.log(order);
    console.log(order.quotas());
}