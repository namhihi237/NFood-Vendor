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
      isReceiveOrder
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
        isActive
        description
      }
    }
  }`,

  GET_NOTIFICATIONS: gql`query GetNotifications($userType: roleEnum!, $limit: Int, $skip: Int) {
    getNotifications(userType: $userType, limit: $limit, skip: $skip) {
      items {
        _id
        content
        image
        createdAt
      }
      total
    }
  }`,

  GET_NUMBER_OF_NOTIFICATIONS: gql`query Query($userType: roleEnum!) {
    getNumberOfNotifications(userType: $userType)
  }`,

  GET_ORDERS: gql`query getOrderByVendor {
  getOrderByVendor {
    _id
    invoiceNumber
    subTotal
    shipping
    discount
    total
    orderItems {
      _id
      price
      quantity
      name
      image
      note
    }
    address
    phoneNumber
    name
    acceptedShippingAt
    estimatedDeliveryTime
    paymentStatus
    orderStatus
    createdAt
    buyer {
      name
      image
      phoneNumber
    }
    shipper {
      _id
      name
      phoneNumber
      image
    }
    paymentMethod
  }
}`,

  GET_VOUCHERS: gql`query GetVouchers {
    getVouchers {
      _id
      discount
      status
      quantity
      discountType
      promoCode
      startDate
      endDate
      createdAt
    }
  }`,

  GET_REPORT: gql`query VendorReport($type: reportType!, $time: String!) {
    vendorReport(type: $type, time: $time) {
      totalRevenue
      totalOrder
      totalOrderCompleted
      accountBalance
    }
  }`
};