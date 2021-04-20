/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFood = /* GraphQL */ `
  query GetFood($id: ID!) {
    getFood(id: $id) {
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
export const listFoods = /* GraphQL */ `
  query ListFoods(
    $filter: ModelFoodFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoods(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getRestaurant = /* GraphQL */ `
  query GetRestaurant($id: ID!) {
    getRestaurant(id: $id) {
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
export const listRestaurants = /* GraphQL */ `
  query ListRestaurants(
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getOrderItem = /* GraphQL */ `
  query GetOrderItem($id: ID!) {
    getOrderItem(id: $id) {
      id
      orderId
      foodId
      createdAt
      updatedAt
    }
  }
`;
export const listOrderItems = /* GraphQL */ `
  query ListOrderItems(
    $filter: ModelOrderItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        orderId
        foodId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
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
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
