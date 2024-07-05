import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

// Function to validate email
export const validateEmail = (
  email: string,
): {valid: boolean; message: string} => {
  if (!email.trim()) {
    return {valid: false, message: 'Email address is required.'};
  }

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValid) {
    return {valid: false, message: 'Please enter a valid email address.'};
  }

  return {valid: true, message: ''};
};

// Function to validate password
export const validatePassword = (
  password: string,
): {valid: boolean; message: string} => {
  if (!password.trim()) {
    return {valid: false, message: 'Password is required.'};
  }

  if (password.length < 8) {
    return {
      valid: false,
      message: 'Password must be at least 8 characters long.',
    };
  }

  return {valid: true, message: ''};
};

// Function to confirm password
export const confirmPassword = (
  password: string,
  confirmPassword: string,
): {valid: boolean; message: string} => {
  if (!confirmPassword.trim() || !password.trim()) {
    return {valid: false, message: 'Please Enter your password.'};
  }

  if (password !== confirmPassword) {
    return {valid: false, message: 'Passwords do not match.'};
  }

  return {valid: true, message: ''};
};

export const validatePhoneNumber = (
  phoneNumber: string,
  countryCode: string,
): {valid: boolean; message: string} => {
  if (!phoneNumber.trim()) {
    return {valid: false, message: 'Phone number is required.'};
  }

  // Basic validation for numeric characters and optional country code
  const isValid = /^\+?[0-9]{1,}$/.test(phoneNumber);
  if (!isValid) {
    return {valid: false, message: 'Please enter a valid phone number.'};
  }

  // Additional validation for country code (optional)
  const countryCodeRegex = /^\+?[0-9]{1,3}$/; // Allow up to 3 digits for country code
  console.log(countryCode);

  if (!countryCode.trim() && !countryCodeRegex.test(countryCode)) {
    return {
      valid: false,
      message: 'Please enter a valid country code (e.g., +1 for USA).',
    };
  }

  return {valid: true, message: ''};
};

export const validateDateOfBirth = (
  dateOfBirth: string,
): {valid: boolean; message: string} => {
  if (!dateOfBirth.trim()) {
    return {valid: false, message: 'Date of birth is required.'};
  }

  // Example: Assuming a date format validation (YYYY-MM-DD)
  const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth);
  if (!isValidFormat) {
    return {
      valid: false,
      message: 'Please enter date of birth in YYYY-MM-DD format.',
    };
  }

  // Additional logic to validate age based on dateOfBirth if needed

  return {valid: true, message: ''};
};

export const validateUsername = (
  username: string,
): {valid: boolean; message: string} => {
  if (!username.trim()) {
    return {valid: false, message: 'Username is required.'};
  }

  // Example: Minimum length requirement for username
  if (username.length < 3) {
    return {
      valid: false,
      message: 'Username must be at least 3 characters long.',
    };
  }

  // Additional custom validation rules as needed

  return {valid: true, message: ''};
};

export const validateFullName = (
  fullName: string,
): {valid: boolean; message: string} => {
  if (!fullName.trim()) {
    return {valid: false, message: 'Full name is required.'};
  }

  // Example: Minimum length requirement for full name
  if (fullName.length < 3) {
    return {
      valid: false,
      message: 'Full name must be at least 3 characters long.',
    };
  }

  // Additional custom validation rules as needed

  return {valid: true, message: ''};
};

export const validateGender = (
  gender: string,
): {valid: boolean; message: string} => {
  if (!gender.trim()) {
    return {valid: false, message: 'Gender is required.'};
  }

  // Example: Validate gender against predefined options (e.g., Male, Female, Other)
  const validGenders = ['Male', 'Female', 'Other'];
  if (!validGenders.includes(gender)) {
    return {valid: false, message: 'Please select a valid gender.'};
  }

  return {valid: true, message: ''};
};

export const validateURL = (url: string): {valid: boolean; message: string} => {
  if (!url.trim()) {
    return {valid: false, message: 'URL is required.'};
  }

  // Check for remote URLs (http, https, ftp)
  const isValidRemoteURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url);

  // Check for local file paths
  const isValidLocalFilePath = /^file:\/\/[^\s]+$/.test(url);

  if (!isValidRemoteURL && !isValidLocalFilePath) {
    return {
      valid: false,
      message: 'Please enter a valid URL or local file path.',
    };
  }

  return {valid: true, message: ''};
};

export const requestLocationPermission = async () => {
  try {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (result === RESULTS.GRANTED) {
      const location = await getCurrentLocation();
      console.log(location, '==final loaca');

      return {status: true, location};
      // setispermission(true);
      // focusOnCurrentLocation(location);
    } else {
      const requestResult = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (requestResult === RESULTS.GRANTED) {
        const location = await getCurrentLocation();
        console.log(location, '==final loaca');

        return {status: true, location};
        // setispermission(true);
        // focusOnCurrentLocation();
      } else {
        return {status: false, message: 'Location permission denied'};
      }
    }
  } catch (err) {
    console.error(err);
    return 'Error requesting location permission';
  }
};

export const getCurrentLocation = async () => {
  Geolocation.getCurrentPosition(
    async position => {
      const {latitude, longitude} = await position.coords;
      // setLocation({latitude, longitude});
      console.log(latitude);

      return await latitude;
    },
    error => {
      return error.message;
    },
    {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
  );
};
