import {
  CONTACT_SUPPORT_FAIL,
  CONTACT_SUPPORT_REQUESTED,
  CONTACT_SUPPORT_SUCCESS,
  FORGOT_PASS_FAIL,
  FORGOT_PASS_REQUESTED,
  FORGOT_PASS_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQUESTED,
  LOGOUT_SUCCESS,
  OTP_VERIFICATION_FAIL,
  OTP_VERIFICATION_REQUESTED,
  OTP_VERIFICATION_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUESTED,
  RESET_PASSWORD_SUCCESS,
  DEVICE_TOKEN_FAIL,
  DEVICE_TOKEN_REQUESTED,
  DEVICE_TOKEN_SUCCESS,
} from './types';

export const loginRequest = (data, navigation) => ({
  type: LOGIN_REQUESTED,
  data,
  navigation,
});

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  data,
});

export const loginFail = () => ({
  type: LOGIN_FAIL,
});

// Logout MYCODE
export const logoutRequest = (data, navigation) => ({
  type: LOGOUT_REQUESTED,
  data,
  navigation,
});

export const logoutSuccess = data => ({
  type: LOGOUT_SUCCESS,
  data,
});

export const logoutFail = () => ({
  type: LOGOUT_FAIL,
});
// Logout MYCODE

// Forgot password
export const forgotPassRequest = (data, navigation) => ({
  type: FORGOT_PASS_REQUESTED,
  data,
  navigation,
});

export const forgotPassSuccess = data => ({
  type: FORGOT_PASS_SUCCESS,
  data,
});

export const forgotPassFail = () => ({
  type: FORGOT_PASS_FAIL,
});

// OTP Verification
export const otpVerificationRequest = (data, navigation) => ({
  type: OTP_VERIFICATION_REQUESTED,
  data,
  navigation,
});

export const otpVerificationSuccess = data => ({
  type: OTP_VERIFICATION_SUCCESS,
  data,
});

export const otpVerificationFail = () => ({
  type: OTP_VERIFICATION_FAIL,
});

// Reset Password
export const resetPasswordRequest = (data, navigation) => ({
  type: RESET_PASSWORD_REQUESTED,
  data,
  navigation,
});

export const resetPasswordSuccess = data => ({
  type: RESET_PASSWORD_SUCCESS,
  data,
});

export const resetPasswordFail = () => ({
  type: RESET_PASSWORD_FAIL,
});

// Contact support
export const contactSupportRequest = (data, navigation) => ({
  type: CONTACT_SUPPORT_REQUESTED,
  data,
  navigation,
});

export const contactSupportSuccess = data => ({
  type: CONTACT_SUPPORT_SUCCESS,
  data,
});

export const contactSupportFail = () => ({
  type: CONTACT_SUPPORT_FAIL,
});

// DEVICE_TOKEN
export const deviceTokenRequest = (data, navigation) => ({
  type: DEVICE_TOKEN_REQUESTED,
  data,
  navigation,
});

export const deviceTokenSuccess = data => ({
  type: DEVICE_TOKEN_SUCCESS,
  data,
});

export const deviceTokenFail = () => ({
  type: DEVICE_TOKEN_FAIL,
});
