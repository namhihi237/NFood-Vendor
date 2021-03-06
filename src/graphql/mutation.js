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

  ADD_ITEM: gql`mutation createItem($name: String!, $price: Float!, $image: String!, $categoryId: ID!, $description: String) {
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
  }`,

  EDIT_ITEM: gql`mutation updateItem($id: ID!, $name: String, $price: Float, $description: String, $image: String) {
    updateItem(id: $id, name: $name, price: $price, description: $description, image: $image) {
      _id
      name
      description
      image
      price
      isActive
    }
  }`,

  DELETE_ITEM: gql`mutation deleteItem($id: ID!) {
    deleteItem(id: $id)
  }`,

  RESEND_CODE: gql`mutation GetCodePhoneNumber($phoneNumber: String!) {
    getCodePhoneNumber(phoneNumber: $phoneNumber)
  }`,

  ACTIVE_PHONE_NUMBER: gql`mutation ActivePhoneNumber($phoneNumber: String!, $code: String!) {
    activePhoneNumber(phoneNumber: $phoneNumber, code: $code) {
      token
      user {
      name  
      }
    }
  }`,

  RESET_NUMBER_OF_NOTIFICATIONS: gql`mutation ResetNumberOfNotifications($userType: roleEnum!) {
    resetNumberOfNotifications(userType: $userType)
  }`,

  UPDATE_STATUS_RECEIVE_ORDER: gql`mutation updateStatusReceiveOrder {
    updateStatusReceiveOrder
  }`,

  ADD_VOUCHER: gql`mutation CreateVoucher($inputVoucher: inputVoucher!) {
    createVoucher(inputVoucher: $inputVoucher) {
      _id
      discount
      status
      quantity
      discountType
      endDate
      startDate
      promoCode
    }
  }`,

  TOGGLE_STATUS_VOUCHER: gql`mutation ToggleVoucherStatus($id: ID!) {
    toggleVoucherStatus(id: $id)
  }`,

  DELETE_VOUCHER: gql`mutation DeleteVoucher($id: ID!) {
    deleteVoucher(id: $id)
  }`,

  UPDATE_TIME_OPEN: gql`mutation UpdateTimeOpen($timeOpen: openTime!) {
    updateTimeOpen(timeOpen: $timeOpen)
  }`,

  UPDATE_PROFILE: gql`mutation UpdateVendorProfile($name: String!, $address: String!, $image: String!, $email: String) {
    updateVendorProfile(name: $name, address: $address, image: $image, email: $email)
  }`,

  ADD_BANK: gql`mutation AddBankAccount($bankName: String!, $accountName: String!, $accountNumber: String!, $type: roleEnum!) {
    addBankAccount(bankName: $bankName, accountName: $accountName, accountNumber: $accountNumber, type: $type)
  }`,

  REQUEST_WITHDRAW: gql`mutation RequestWithdraw($amount: Float!, $type: roleEnum!) {
    requestWithdraw(amount: $amount, type: $type)
  }`
}