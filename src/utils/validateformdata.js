export const validate = (email, password, username = "preetamvarun") => {
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isValidPassword =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/.test(password);
    const isValidUsername = /^[a-zA-Z0-9_-]{3,}$/.test(username);

    if(!isValidUsername) return 1;
    if(!isValidEmail) return 1;
    if(!isValidPassword) return 1;

    return null;
}
