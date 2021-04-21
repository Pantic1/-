import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class PaymentResult {
  readonly statusCode?: number;
  readonly body?: string;
  constructor(init: ModelInit<PaymentResult>);
}

export declare class Food {
  readonly id: string;
  readonly restaurantId?: string;
  readonly name?: string;
  readonly photo?: string;
  readonly description?: string;
  readonly calories?: string;
  readonly price?: string;
  readonly duration?: string;
  readonly categorie?: string;
  readonly ingredients?: string;
  readonly menuNr?: number;
  constructor(init: ModelInit<Food>);
  static copyOf(source: Food, mutator: (draft: MutableModel<Food>) => MutableModel<Food> | void): Food;
}

export declare class Restaurant {
  readonly id: string;
  readonly restaurantID?: string;
  readonly phone?: number;
  readonly name: string;
  readonly priceRating?: string;
  readonly city?: string;
  readonly zipCode?: string;
  readonly address?: string;
  readonly categories?: string;
  readonly duration?: string;
  readonly deliveryCost?: number;
  readonly rating?: string;
  constructor(init: ModelInit<Restaurant>);
  static copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant>) => MutableModel<Restaurant> | void): Restaurant;
}

export declare class Order {
  readonly id: string;
  readonly customerID?: string;
  readonly customerName?: string;
  readonly foodItems?: string;
  readonly email?: string;
  readonly total: number;
  readonly status?: string;
  readonly address?: string;
  readonly updatedAt?: string;
  readonly derliveryTime?: string;
  readonly addedTime?: number;
  readonly restaurantNote?: string;
  readonly restaurantID?: string;
  readonly restaurantName?: string;
  readonly createdAt?: string;
  constructor(init: ModelInit<Order>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

export declare class OrderItem {
  readonly id: string;
  readonly orderId: string;
  readonly foodId: string;
  constructor(init: ModelInit<OrderItem>);
  static copyOf(source: OrderItem, mutator: (draft: MutableModel<OrderItem>) => MutableModel<OrderItem> | void): OrderItem;
}

export declare class Customer {
  readonly id: string;
  readonly name?: string;
  readonly phone?: number;
  readonly customerID?: string;
  readonly address?: string;
  readonly city?: string;
  readonly zipCode?: string;
  readonly createdAt?: string;
  constructor(init: ModelInit<Customer>);
  static copyOf(source: Customer, mutator: (draft: MutableModel<Customer>) => MutableModel<Customer> | void): Customer;
}