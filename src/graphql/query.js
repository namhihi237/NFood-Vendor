import { gql } from '@apollo/client';
export default {
  GET_SIGNATURE: gql`query getSignatureImage {
    getSignatureImage
  }`,

  GET_PROFILE: gql`query getUser($role: roleEnum!) {
    getUser(role: $role) {
      _id
      phoneNumber
      role
      address
      image
      isVendor
      isBuyer
      isShipper
      coordinates
      name
    }
  }`,

  GET_CATEGORY: gql`query getAllCategory {
    getAllCategory {
      _id
      name
      isActive
      items {
        _id
        name
        price
        image
      }
    }
  }`
};