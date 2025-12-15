import {test, expect, Page} from '@playwright/test';
import {RegisterPage} from '../pages/registerPage';
import { generateUser } from '../utils/userFactory';

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
        console.log(`Usuario registrado: ${newUser.email}`); // Esto ayuda a debuggear
        console.log(`Pass registrado: ${newUser.password}`); // Esto ayuda a debuggear

        // 3. Puedes instanciar tu página de Login (asumiendo que tienes una)
        // const loginPage = new LoginPage(page); 
        
        // 4. Y hacer el login exitoso:
        // await loginPage.goToLoginPage();
        // await loginPage.login(newUser.email, newUser.password);
        
        // 5. Verificación final
        // await expect(page.locator('Bienvenido')).toBeVisible();
    });

});