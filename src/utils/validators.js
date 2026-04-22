// utils/validators.js

// Contact form validators
export const contactValidators = {
  name: (values) => (!values.name ? "Full name is required" : null),
  phone: (values) =>
    !values.phone
      ? "Phone is required"
      : !/^\+?\d{10,15}$/.test(values.phone)
        ? "Invalid phone number"
        : null,
  email: (values) =>
    !values.email
      ? "Email is required"
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
        ? "Invalid email address"
        : null,
};

// Date form validators
export const dateValidators = {
  reservationDate: (values) => (!values?.reservationDate ? "Date is required" : null),
};

// Schedule form validators
export const scheduleValidators = {
  schedule: (values) => (!values?.schedule ? "Schedule is required" : null),
};

// Payment form validators
export const paymentValidators = {
  method: (values) =>
    !values?.method ? "Please select a payment method" : null,
};
