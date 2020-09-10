export const isValid = () => {
  isValid = true;
};
export const mobileNumberRE = (phoneNumber) => {
  var mobileNumber_RE = /^[6-9]{1}[0-9]{9}$/;
  return mobileNumber_RE.test(phoneNumber) ? true : false;
};
export const couponRE = (coupon) => {
  var coupon_RE = /^[0-9a-zA-Z]{14,18}$/;
  return coupon_RE.test(coupon) ? true : false;
};
export const productCodeRE = (productCode) => {
  var productCode_RE = /^[A-Za-z0-9-.]{10,20}$/;
  return productCode_RE.test(productCode) ? true : false;
};

export const emailRE = (email) => {
  var email_RE = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return email_RE.test(email) ? true : false;
};

export const validation = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules.mobileNumber) {
    const number = /^[6-9]{1}[0-9]{9}$/;
    isValid = number.test(value) && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
