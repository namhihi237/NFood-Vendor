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
      bank {
        accountNumber
        accountName
        bankName
      }
      name
      email
      isReceiveOrder
      timeOpen {
        day
        openTime
        isOpen
        closeTime
      }
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
        orderId
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
    deliveredAt
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
  }`,

  GET_REVIEWS: gql`query GetReviews($type: reviewEnum!) {
    getReviews(type: $type) {
      reviews {
        buyerId
        _id
        rating
        comment
        image
        buyer {
          _id
          name
          image
          phoneNumber
        }
        reviewedId
        type
        createdAt
      }
      badReviews
      goodReviews
      normalReviews
    }
  }`,

  REPORT_ITEM: gql`query GetReportItem($time: String!, $type: reportType!) {
    getReportItem(time: $time, type: $type) {
      _id
      description
      name
      totalRevenue
      quantitySold
      price
    }
  }`,

  GET_WITHDRAW: gql`query GetWithdrawal($type: roleEnum!) {
    getWithdrawal(type: $type) {
      money
      maxWithdrawal
      minWithdrawal
      fee
      bank {
        accountNumber
        accountName
        bankName
      }
    }
  }`,

  GET_TRANSACTIONS: gql`query GetTransactions($type: String!) {
    getTransactions(type: $type) {
      _id
      amount
      type
      status
      bank {
        accountNumber
        accountName
        bankName
      } 
      currency
      createdAt
    }
  }`,

  GET_ORDER_BY_ID: gql`query GetOrderById($id: ID!) {
    getOrderById(id: $id) {
      _id
      invoiceNumber
      subTotal
      shipping
      discount
      total
      orderItems {
        price
        quantity
        name
        image
        note
        buyerName
      }
      address
      phoneNumber
      name
      acceptedShippingAt
      estimatedDeliveryTime
      paymentStatus
      orderStatus
      deliveredAt
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

  GET_NEW_ORDERS: gql`query GetNewOrderByVendor {
    getNewOrderByVendor {
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
      estimatedDeliveryTime
      paymentStatus
      orderStatus
      createdAt
      shipper {
        _id
        name
        image
        phoneNumber
      }
      buyer {
        _id
        name
        image
        phoneNumber
      }
      paymentMethod
      vendorId
    }
  }`
};