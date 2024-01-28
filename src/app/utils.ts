export const validateName = (name: string) => {
  if (!name) {
    return "Name cannot be empty";
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return "Name must contain only alphabetic characters and spaces";
  }

  if (name.length < 2) {
    return "Name must be at least 2 characters long";
  }

  if (name.length > 50) {
    return "Name must be no more than 50 characters long";
  }

  return "Name is valid";
};

export const validateEmail = (email: FormDataEntryValue) => {
  if (!email) {
    return "Email cannot be empty";
  }

  const regexEmal = "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$";
  const validEmail = !!email?.toString().match(regexEmal);

  if (!validEmail) {
    return "Invalid email format";
  }

  return "Email is valid";
};

export const validatePhone = (phone: string) => {
  if (!phone) {
    return "Phone cannot be empty";
  }

  if (!/^\d+$/.test(phone)) {
    return "Phone must contain only digits";
  }

  if (phone.length < 10) {
    return "Phone must be at least 10 digits long";
  }

  if (phone.length > 14) {
    return "Phone must be no more than 15 digits long";
  }

  return "Phone is valid";
};

export const validateAge = (age: number) => {
  if (!age && age !== 0) {
    return "Age cannot be empty";
  }

  if (!Number.isInteger(age) || age < 0) {
    return "Age must be a non-negative integer";
  }

  if (age < 18 || age > 100) {
    return "Age must be between 18 and 100";
  }

  return "Age is valid";
};

export const validateURL = (url: string) => {
  if (!url) {
    return "URL cannot be empty";
  }

  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  if (!urlPattern.test(url)) {
    return "Invalid URL format";
  }

  return "URL is valid";
};

export const validatePassword = (password: string) => {
  if (!password) {
    return "Password cannot be empty";
  }

  if (password.length < 8 || password.length > 20) {
    return "Password must be between 8 and 20 characters";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one number";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character";
  }

  return "Password is valid";
};
