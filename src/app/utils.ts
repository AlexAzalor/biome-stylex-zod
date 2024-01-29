export const validateName = (name: string) => {
  if (!name) {
    return "Name is required";
  }

  if (name.length < 3) {
    return "Name must be at least 3 characters long";
  }

  if (name.length > 50) {
    return "Name must be no more than 50 characters long";
  }

  return "Name is valid";
};

export const validateEmail = (email: FormDataEntryValue) => {
  if (!email) {
    return "Email is required";
  }

  const regexEmal = "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$";
  const validEmail = !!email.toString().match(regexEmal);

  if (!validEmail) {
    return "Invalid email";
  }

  return "Email is valid";
};

export const validatePhone = (phone: string) => {
  if (!phone) {
    return "";
  }

  if (phone.length < 10) {
    return "Phone numbers are a minimum of 10 digits";
  }

  if (!/^\d+$/.test(phone)) {
    return "Only numbers are allowed";
  }

  if (phone.length > 14) {
    return "Phone numbers are a maximum of 14 digits";
  }

  return "Phone is valid";
};

export const validateAge = (age: number) => {
  console.log("age", age);

  if (!age && age === 0) {
    return "Age is required";
  }

  if (!Number.isInteger(age) || age < 0) {
    return "Age must be a number";
  }

  if (age < 18 || age > 100) {
    return "Age must be between 18 and 100";
  }

  return "Age is valid";
};

export const validateURL = (url: string) => {
  if (!url) {
    return "URL is required";
  }

  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  if (!urlPattern.test(url)) {
    return "Invalid url";
  }

  return "URL is valid";
};

export const validatePassword = (password: string) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long";
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

  if (password.length > 20) {
    return "The password must be a maximum of 20 characters";
  }

  return "Password is valid";
};
