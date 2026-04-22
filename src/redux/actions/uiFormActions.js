import {
  SET_CONTACT_INFO,
  CLEAR_CONTACT_INFO,
  SET_DATE,
  SET_SCHEDULE,
  SET_PAYMENT_METHOD
} from "../types/index.js";

export const setContactInfo = (data) => ({
  type: SET_CONTACT_INFO,
  payload: data,
});

export const clearContactInfo = () => ({
  type: CLEAR_CONTACT_INFO,
});

export const setDate = (data) => ({
  type: SET_DATE,
  payload: data,
});

export const setSchedule = (data) => ({
  type: SET_SCHEDULE,
  payload: data,
});

export const setPaymentMethod = (method) => ({
  type: SET_PAYMENT_METHOD,
  payload: method.method,
});