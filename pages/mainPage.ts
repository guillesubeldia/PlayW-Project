import {Page , Locator, expect} from '@playwright/test'; 

// pages/mainPage.ts
// Page Object para la página principal / landing.
// Uso:
// - `waitForLoaded()` valida que la página principal y sus elementos clave
//   estén presentes (ej. banner). Se usa después de login o al abrir `/`.
export class MainPage {
  readonly page: Page;
  readonly banner: Locator;

  constructor(page: Page) {
    this.page = page;

    // Si el elemento <img> tiene un alt estable, es ideal para selectores
    this.banner = page.getByAltText('Banner');

    // Alternativa por CSS si no existe alt:
    // this.banner = page.locator('img[src*="banner"]');
  }

  async waitForLoaded() {
    // `toHaveURL` usa la `baseURL` de playwright.config.ts cuando pasamos
    // rutas relativas (aquí usamos la absoluta para mayor claridad).
    await expect(this.page).toHaveURL('https://practicesoftwaretesting.com/');

    // Verificar que el banner esté visible como indicación de carga completa
    await expect(this.banner).toBeVisible();
  }
}