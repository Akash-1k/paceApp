var email = {
  name: 'email',
  isRequired: true,
  regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  length: null,
  requiredMessage: 'Email address is required',
  invalidMessage: 'Invalid email address',
  invalidLengthMessage: '',
  compareErrorMessage: '',
};

var password = {
  name: 'password',
  isRequired: true,
  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{10,}$/,
  length: {min: 10, max: 30},
  requiredMessage: 'Password is required',
  invalidMessage:
    'Password must contain a uppercase and lowercase letters, numbers and special characters and 10 to 30 characters long',
  invalidLengthMessage: 'Password must contain 10 to 30 characters',
  compareErrorMessage: '',
};

var confirmPassword = {
  name: 'confirmPassword',
  compareTo: 'password',
  isRequired: true,
  regex: null,
  length: null,
  requiredMessage: 'Confirm password is required',
  invalidMessage: '',
  invalidLengthMessage: '',
  compareErrorMessage: 'Password and confirm password does not match',
};

var newPassword = {
  name: 'newPassword',
  isRequired: true,
  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{10,}$/,
  length: {min: 10, max: 30},
  requiredMessage: 'New password is required',
  invalidMessage:
    'New password must contain a uppercase and lowercase letters, numbers and special characters and 10 to 30 characters long',
  invalidLengthMessage: 'New password must contain 10 to 30 characters',
  compareErrorMessage: '',
};

var confirmNewPassword = {
  name: 'confirmNewPassword',
  compareTo: 'newPassword',
  isRequired: true,
  regex: null,
  length: null,
  requiredMessage: 'Confirm password is required',
  invalidMessage: '',
  invalidLengthMessage: '',
  compareErrorMessage: 'Password and confirm password does not match',
};

var mobileNumber = {
  name: 'mobileNumber',
  isRequired: true,
  regex: /^[0-9]+$/i,
  length: {min: 9, max: 15},
  requiredMessage: 'Mobile number is required',
  invalidMessage: 'Invalid mobile number',
  invalidLengthMessage: 'Invalid mobile number',
  compareErrorMessage: '',
};

var fullName = {
  name: 'fullName',
  isRequired: true,
  regex: /^[a-z0-9 ]+$/i,
  length: {min: 5, max: 30},
  requiredMessage: 'Name is required',
  invalidMessage: 'Name must be alphanumeric',
  invalidLengthMessage: 'Name must contain 5 to 30 characters ',
  compareErrorMessage: '',
};

var address = {
  name: 'address',
  isRequired: true,
  length: {min: 4, max: 100},
  requiredMessage: 'Address is required',
  invalidLengthMessage: 'Address must contain 4 to 100 characters ',
  compareErrorMessage: '',
};

var amount = {
  name: 'amount',
  isRequired: true,
  regex: /^\d*\.?\d{0,2}$/,
  length: null,
  requiredMessage: 'Amount is required',
  invalidMessage: 'Enter valid amount',
  invalidLengthMessage: 'Amount must contain 1 to 30 characters ',
  compareErrorMessage: '',
};

var fee = {
  name: 'Fee',
  isRequired: true,
  regex: /^\d*\.?\d{0,2}$/,
  length: null,
  requiredMessage: 'Network fee is required',
  invalidMessage: 'Enter valid network fee',
  invalidLengthMessage: 'Network fee must contain 1 to 30 characters ',
  compareErrorMessage: '',
};

var loginPassword = {
  name: 'loginPassword',
  isRequired: true,
  regex: null,
  length: null,
  requiredMessage: 'Password is required',
  invalidMessage: '',
  invalidLengthMessage: '',
  compareErrorMessage: '',
};

export default {
  email,
  password,
  confirmPassword,
  mobileNumber,
  fullName,
  loginPassword,
  amount,
  fee,
  newPassword,
  confirmNewPassword,
};
