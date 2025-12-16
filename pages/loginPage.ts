import {type Page , Locator, expect} from '@playwright/test';

// pages/loginPage.ts
// Page Object para la pantalla de login.
// Uso:
// - `goToLoginPage()` abre la ruta de login usando `baseURL`.
// - `login()` realiza la acción de iniciar sesión.
// - Métodos helper (`expectEmailErrorVisible`) ayudan en las aserciones.
// Nota:
// - Si los labels o textos cambian en la UI, actualiza los locators aquí.
export class LoginPage {
    // `page` es inyectado por los fixtures de Playwright en los tests
    readonly page: Page;

    // Locators para inputs y mensajes de error
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly errorMailMessage: Locator;

    constructor(page: Page){
        this.page = page;

        // IMPORTANTE: los labels deben coincidir con los del HTML de la app.
        // Si no existen, usa selectores alternativos (css, placeholder, name, etc.).
        this.usernameInput  = page.getByLabel('email');
        this.passwordInput  = page.getByLabel('Password *', { exact: true });
        this.loginButton    = page.getByRole('button', {name: 'Login'});
        this.errorMessage   = page.getByText('Invalid username or password');    
        this.errorMailMessage = page.getByText('Email format is invalid');
    }

    // Navega a la página de login usando `baseURL` configurada en playwright.config.ts
    async goToLoginPage(){
        await this.page.goto('/auth/login');
    }

    // Realiza la acción de login (no espera éxito/fracaso)
    async login(username:string, password:string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Aserción helper: esperar que el error de email inválido sea visible
    async expectEmailErrorVisible(){
        await expect(this.errorMailMessage).toBeVisible();  
    }

}