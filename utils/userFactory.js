function generateUser() {
    const timestamp = Date.now();

    return {
        firstName: "Test",
        lastName: "User",
        dob: "1990-05-10",
        street: "Test Street 123",
        postalCode: "12345",
        city: "Test City",
        state: "Test State",
        country: "Argentina",
        phone: `555${timestamp.toString().slice(-7)}`,
        email: `user${timestamp}@test.com`,
        password: generatePassword()
    };
}

function generatePassword() {
    // Cumple tus requisitos: mayus, minus, número, símbolo
    return "Contra@" + Math.floor(Math.random() * 10000);
}


module.exports = { generateUser };