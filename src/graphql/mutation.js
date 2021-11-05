import { gql } from '@apollo/client';
export default {
  REGISTER: gql`mutation register($phoneNumber: String!,$password: String!, $role: roleEnum!) {
    register(phoneNumber: $phoneNumber,  password: $password, role: $role) {
      _id
      role
      phoneNumber  
    }
  }`,

  LOGIN: gql`mutation login($phoneNumber: String!, $password: String!) {
    login(phoneNumber: $phoneNumber, password: $password) {
      user {
        _id
        role
        isVendor
      }
      token
    }
  }`,

  ACTIVE_VENDOR: gql`mutation activeVendor($name: String!, $address: String!, $image: String!) {
    activeVendor(name: $name, address: $address, image: $image) {
      message
    }
  }`,

  ADD_CATEGORY: gql`mutation createCategory($name: String!) {
    createCategory(name: $name) {
      _id
      name
      isActive
      items {
        _id
        name
        image
        price
      }
    }
  }`,

  UPDATE_CATEGORY: gql`mutation updateCategory($id: ID!, $name: String!) {
    updateCategory(id: $id, name: $name)
  }`,

  DELETE_CATEGORY: gql`mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }`,

  TOGGLE_CATEGORY: gql`mutation toggleCategory($id: ID!) {
    toggleCategory(id: $id)
  }`,

  TOGGLE_ITEM: gql`mutation toggleItemStatus($id: ID!) {
    toggleItemStatus(id: $id)
  }`,

  ADD_ITEM: gql`mutation createItem($name: String!, $price: Int!, $image: String!, $categoryId: ID!, $description: String) {
  createItem(name: $name, price: $price, image: $image, categoryId: $categoryId, description: $description) {
    _id
    name
    price
    category {
      name
    }
    description
    image
    isActive
  }
}`
}