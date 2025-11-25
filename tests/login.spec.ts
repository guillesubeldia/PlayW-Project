import {test, expect, Page} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import {MainPage}   from '../pages/mainPage';

test.describe('Login Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
    });

    test('Login con email invalido', async ({page}) =>{
        const loginPage = new LoginPage(page);
        await loginPage.login('userexample.com', 'passwordSegura123');
        await loginPage.expectEmailErrorVisible();
    });

    test('Debe permitir el inicio de sesión exitoso', async ({ page }) => {
        const loginPage = new LoginPage(page); // mismo constructor, nueva instancia
        const mainPage  = new MainPage(page);

        await loginPage.login('user@example.com', 'passwordSegura123');
        await mainPage.waitForLoaded();
    });
});
