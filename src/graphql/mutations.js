/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPayment = /* GraphQL */ `
  mutation CreatePayment($input: PaymentInput) {
    createPayment(input: $input) {
      statusCode
      body
    }
  }
`;
export const createFood = /* GraphQL */ `
  mutation CreateFood(
    $input: CreateFoodInput!
    $condition: ModelFoodConditionInput
  ) {
    createFood(input: $input, condition: $condition) {
      id
      restaurantId
      name
      photo
      description
      calories
      price
      duration
      categorie
      ingredients
      menuNr
      createdAt
      updatedAt
    }
  }
`;
export const updateFood = /* GraphQL */ `
  mutation UpdateFood(
    $input: UpdateFoodInput!
    $condition: ModelFoodConditionInput
  ) {
    updateFood(input: $input, condition: $condition) {
      id
      restaurantId
      name
      photo
      description
      calories
      price
      duration
      categorie
      ingredients
      menuNr
      createdAt
      updatedAt
    }
  }
`;
export const deleteFood = /* GraphQL */ `
  mutation DeleteFood(
    $input: DeleteFoodInput!
    $condition: ModelFoodConditionInput
  ) {
    deleteFood(input: $input, condition: $condition) {
      id
      restaurantId
      name
      photo
      description
      calories
      price
      duration
      categorie
      ingredients
      menuNr
      createdAt
      updatedAt
    }
  }
`;
export const createRestaurant = /* GraphQL */ `
  mutation CreateRestaurant(
    $input: CreateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    createRestaurant(input: $input, condition: $condition) {
      id
      restaurantID
      name
      phone
      rating
      priceRating
      city
      zipCode
      address
      categories
      duration
      deliveryCost
      createdAt
      updatedAt
    }
  }
`;
export const updateRestaurant = /* GraphQL */ `
  mutation UpdateRestaurant(
    $input: UpdateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    updateRestaurant(input: $input, condition: $condition) {
      id
      restaurantID
      name
      phone
      rating
      priceRating
      city
      zipCode
      address
      categories
      duration
      deliveryCost
      createdAt
      updatedAt
    }
  }
`;
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant(
    $input: DeleteRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    deleteRestaurant(input: $input, condition: $condition) {
      id
      restaurantID
      name
      phone
      rating
      priceRating
      city
      zipCode
      address
      categories
      duration
      deliveryCost
      createdAt
      updatedAt
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      customerID
      customerName
      foodItems
      email
      total
      status
      address
      updatedAt
      derliveryTime
      addedTime
      restaurantNote
      restaurantID
      createdAt
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      customerID
      customerName
      foodItems
      email
      total
      status
      address
      updatedAt
      derliveryTime
      addedTime
      restaurantNote
      restaurantID
      createdAt
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      customerID
      customerName
      foodItems
      email
      total
      status
      address
      updatedAt
      derliveryTime
      addedTime
      restaurantNote
      restaurantID
      createdAt
    }
  }
`;
export const createOrderItem = /* GraphQL */ `
  mutation CreateOrderItem(
    $input: CreateOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    createOrderItem(input: $input, condition: $condition) {
      id
      orderId
      foodId
      createdAt
      updatedAt
    }
  }
`;
export const updateOrderItem = /* GraphQL */ `
  mutation UpdateOrderItem(
    $input: UpdateOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    updateOrderItem(input: $input, condition: $condition) {
      id
      orderId
      foodId
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrderItem = /* GraphQL */ `
  mutation DeleteOrderItem(
    $input: DeleteOrderItemInput!
    $condition: ModelOrderItemConditionInput
  ) {
    deleteOrderItem(input: $input, condition: $condition) {
      id
      orderId
      foodId
      createdAt
      updatedAt
    }
  }
`;
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
      id
      name
      phone
      customerID
      address
      city
      zipCode
      createdAt
      updatedAt
    }
  }
`;
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
      id
      name
      phone
      customerID
      address
      city
      zipCode
      createdAt
      updatedAt
    }
  }
`;
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
      id
      name
      phone
      customerID
      address
      city
      zipCode
      createdAt
      updatedAt
    }
  }
`;
