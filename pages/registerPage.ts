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
        const user = generateUser();
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

        await this.registerButton.click();
    }
}