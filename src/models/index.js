// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Food, Restaurant, Order, OrderItem, Customer, PaymentResult } = initSchema(schema);

export {
  Food,
  Restaurant,
  Order,
  OrderItem,
  Customer,
  PaymentResult
};