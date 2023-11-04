const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateUserCreds = async (email, password) => {
    const errors = [];
    if (!email || email.length < 5 || email.length > 50) {
        errors.push('Email must be between 5 and 50 characters') ;
    }

    if (!password || password.length < 4 || password.length > 30) {
        errors.push('Password must be between 4 and 30 characters')
    }

    if (!isEmailValid(email)) {
        errors.push('Invalid email format');
    }
    if (errors.length > 0) return errors;
    return false;
};




