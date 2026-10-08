const digitsOnly = (value) => value.replace(/\D/g, '');

export const formatCardNumber = (value) =>
    digitsOnly(value).slice(0, 19).replace(/(\d{4})(?=\d)/g, '$1 ');

export const formatExpiry = (value) => {
    const digits = digitsOnly(value).slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

export const formatCvc = (value) => digitsOnly(value).slice(0, 4);

const passesLuhn = (digits) => {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        let digit = Number(digits[digits.length - 1 - i]);
        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 === 0;
};

const isFutureExpiry = (expiry) => {
    const match = /^(\d{2})\/(\d{2})$/.exec(expiry);
    if (!match) return false;
    const month = Number(match[1]);
    const year = 2000 + Number(match[2]);
    if (month < 1 || month > 12) return false;
    const now = new Date();
    return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
};

export const validateShipping = ({ fullName, email, address, city, postalCode, country }) => {
    const errors = {};
    if (!fullName.trim()) errors.fullName = 'Enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter a valid email address.';
    if (!address.trim()) errors.address = 'Enter your street address.';
    if (!city.trim()) errors.city = 'Enter your city.';
    if (!postalCode.trim()) errors.postalCode = 'Enter your postal code.';
    if (!country.trim()) errors.country = 'Enter your country.';
    return errors;
};

export const validatePayment = ({ cardNumber, expiry, cvc }) => {
    const errors = {};
    const digits = digitsOnly(cardNumber);
    if (digits.length < 13 || !passesLuhn(digits)) errors.cardNumber = 'Enter a valid card number.';
    if (!isFutureExpiry(expiry)) errors.expiry = 'Enter a valid expiry date (MM/YY).';
    if (!/^\d{3,4}$/.test(cvc)) errors.cvc = 'Enter the 3 or 4 digit security code.';
    return errors;
};
