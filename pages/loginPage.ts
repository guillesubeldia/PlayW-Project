import {type Page , Locator, expect} from '@playwright/test';

export class LoginPage {
    // 1. Declaración de la variable `page` que inyectaremos con Fixtures
    readonly page: Page;
    
    // 2. Declaración de Locators usando los mejores métodos de Playwright
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly errorMailMessage: Locator;

    // 3. Constructor de la clase que inicializa los locators

    constructor(page: Page){
        this.page = page;

        this.usernameInput  = page.getByLabel('email');
        this.passwordInput  = page.getByLabel('Password *', { exact: true });
        this.loginButton    = page.getByRole('button', {name: 'Login'});
        this.errorMessage   = page.getByText('Invalid username or password');    
        this.errorMailMessage = page.getByText('Email format is invalid');
    }
    // 4. Métodos de la clase para interactuar con la página
    async goToLoginPage(){
        await this.page.goto('/auth/login');
    }

    async login(username:string, password:string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectEmailErrorVisible(){
        await expect(this.errorMailMessage).toBeVisible();  
    }

}