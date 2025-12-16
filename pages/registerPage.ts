// pages/registerPage.ts
// Page Object para la pantalla de registro.
// Uso:
// - `registerNewUser()` genera un usuario con `utils/userFactory` y lo registra
//   por UI, devolviendo el objeto `user` con email/password.
// - Ideal para validar el flujo de registro en un test independiente.
import { generateUser } from '../utils/userFactory';
import {type Page , Locator, expect} from '@playwright/test';

export class RegisterPage{
    readonly page:Page;

    readonly firstName : Locator;
    readonly lastName : Locator;
    readonly dateOfBirth : Locator;
    readonly street : Locator;
    readonly postalCode : Locator;
    readonly city: Locator;
    readonly state : Locator;
    readonly country : Locator;
    readonly phone : Locator;
    readonly email : Locator;
    readonly password : Locator;

    readonly registerButton : Locator;

    constructor(page: Page){
        this.page= page;

        this.firstName  = page.getByLabel('First Name');
        this.lastName   = page.getByLabel('Last Name');
        this.dateOfBirth = page.getByLabel('Date of Birth *');
        this.street = page.getByLabel('Street');
        this.postalCode = page.getByLabel('Postal code');
        this.city = page.getByLabel('City');
        this.state = page.getByLabel('State');
        this.country = page.getByLabel('Country');
        this.phone = page.getByLabel('Phone');
        this.email = page.getByLabel('Email address');
        this.password = page.getByPlaceholder('Your password');

        this.registerButton = page.getByRole('button', {name: 'Register'});
    
    }

    async goToRegisterPage(){
        await this.page.goto('/auth/register');
    }

    async registerNewUser(){
        // 1. Generamos el usuario
        const user = generateUser();
        // 2. Rellenamos los campos
        await this.firstName.fill(user.firstName);
        await this.lastName.fill(user.lastName);
        await this.dateOfBirth.fill(user.dob);
        await this.street.fill(user.street);
        await this.postalCode.fill(user.postalCode);
        await this.city.fill(user.city);
        await this.state.fill(user.state);
        //este es un select, por lo que el manejo es distinto
        await this.country.selectOption({ label: user.country });
        await this.phone.fill(user.phone);
        await this.email.fill(user.email);
        await this.password.fill(user.password);
        // Espera explícita corta para evitar flakiness en formularios lentos
        // (idealmente reemplazar por espera a un selector o navegación)
        await this.page.waitForTimeout(3000);
         // 3. Clic en registrar
        await this.registerButton.click();
        await this.page.waitForTimeout(3000);

        // 4. Retornamos el objeto `user` para que quien invoque el método
        //    tenga acceso a email/password (útil para login por API o debug).
        return user;
    }
}