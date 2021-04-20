/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFood = /* GraphQL */ `
  subscription OnCreateFood {
    onCreateFood {
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
export const onUpdateFood = /* GraphQL */ `
  subscription OnUpdateFood {
    onUpdateFood {
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
export const onDeleteFood = /* GraphQL */ `
  subscription OnDeleteFood {
    onDeleteFood {
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
export const onCreateRestaurant = /* GraphQL */ `
  subscription OnCreateRestaurant {
    onCreateRestaurant {
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
export const onUpdateRestaurant = /* GraphQL */ `
  subscription OnUpdateRestaurant {
    onUpdateRestaurant {
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
export const onDeleteRestaurant = /* GraphQL */ `
  subscription OnDeleteRestaurant {
    onDeleteRestaurant {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
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
export const onCreateOrderItem = /* GraphQL */ `
  subscription OnCreateOrderItem {
    onCreateOrderItem {
      id
      orderId
      foodId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrderItem = /* GraphQL */ `
  subscription OnUpdateOrderItem {
    onUpdateOrderItem {
      id
      orderId
      foodId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrderItem = /* GraphQL */ `
  subscription OnDeleteOrderItem {
    onDeleteOrderItem {
      id
      orderId
      foodId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer {
    onCreateCustomer {
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
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer {
    onUpdateCustomer {
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
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer {
    onDeleteCustomer {
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
