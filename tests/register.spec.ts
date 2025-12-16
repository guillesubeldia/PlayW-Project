// tests/register.spec.ts
// Test que valida el flujo de registro por UI. Mantenerlo independiente
// del resto de tests permite validar la creación de cuentas nuevas.
import {test, expect, Page} from '@playwright/test';
import {RegisterPage} from '../pages/registerPage';
import { generateUser } from '../utils/userFactory';

/*
  tests/register.spec.ts

  - Test de registro por UI. Mantenerlo independiente del resto de tests
    permite validar el flujo de creación de cuentas.
  - `registerNewUser()` devuelve el objeto `user` creado; NO reutilices
    este usuario directamente en otros tests sin control: mejor usar
    `global-setup` o API para crear sesiones estables.
*/
test.describe('Register Tests', () => {

    test.beforeEach(async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goToRegisterPage();
    });

    test('Registro exitoso de un nuevo usuario', async ({page}) => {
        const registerPage = new RegisterPage(page);

        // 1. Capturamos el objeto retornado por registerNewUser
        const newUser = await registerPage.registerNewUser(); 

        // 2. Ahora tienes 'newUser' con email, password, etc.
        //    Estos datos se escriben en consola para debugging; si necesitas
        //    persistirlos, guarda en test-artifacts/ (no en el repo).
        console.log(`Usuario registrado: ${newUser.email}`);
        console.log(`Pass registrado: ${newUser.password}`);

        // 3. Puedes usar el usuario para acciones posteriores o limpiarlo
        //    en el backend si tu entorno lo requiere.
    });

});