// Each check returns '' when the value is fine, or the message to show to the user.
export const MESSAGES = {
  name: 'Enter your full name.',
  mobile: 'A mobile number has 10 digits and starts with 05, like 050 123 4567.',
  email: 'An email address needs an @ and a domain, like name@example.com.',
};

export function checkName(value) {
  return value.trim() === '' ? MESSAGES.name : '';
}

export function checkMobile(value) {
  return /^05\d{8}$/.test(value.replace(/\s/g, '')) ? '' : MESSAGES.mobile;
}

export function checkEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : MESSAGES.email;
}
