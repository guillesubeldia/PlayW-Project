import {Page , Locator, expect} from '@playwright/test'; 

export class MainPage {
  readonly page: Page;
  readonly banner: Locator;

  constructor(page: Page) {
    this.page = page;

    // Opción ideal: por alt
    this.banner = page.getByAltText('Banner');

    // Si no hay alt, probar CSS:
    // this.banner = page.locator('img[src*="banner"]');
  }

  async waitForLoaded() {
    // Validar URL
    await expect(this.page).toHaveURL('https://practicesoftwaretesting.com/');
    // Validar banner visible
    await expect(this.banner).toBeVisible();
  }
}