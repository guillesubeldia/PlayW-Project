// utils/userFactory.js
// Generador simple de usuarios de prueba para tests E2E.
// Uso:
// - `generateUser()` crea un objeto `user` con email único y password.
// - No almacenar valores generados en el repo. Para cuentas estáticas usa
//   variables de entorno o secretos del CI.
// - `generated-user.json` (en test-artifacts/) puede contener el resultado
//   de este factory cuando se ejecuta `global-setup.ts`.
function generateUser() {
    // timestamp para asegurar unicidad (email y phone únicas)
    const timestamp = Date.now();

    return {
        // Datos básicos reutilizables en los formularios de registro
        firstName: "Test",
        lastName: "User",
        dob: "1990-05-10",
        street: "Test Street 123",
        postalCode: "12345",
        city: "Test City",
        state: "Test State",
        country: "Argentina",
        // phone/email con timestamp para evitar colisiones en el backend
        phone: `555${timestamp.toString().slice(-7)}`,
        email: `user${timestamp}@test.com`,
        password: generatePassword()
    };
}

function generatePassword() {
    // Generador simple que cumple requisitos básicos.
    // Si tu app exige reglas complejas, adapta esta función.
    return "Contra@" + Math.floor(Math.random() * 10000);
}

// Exportar la función para que los tests/setup la puedan usar.
module.exports = { generateUser };