// playwright.config.ts
// Configuración central de Playwright:
// - `globalSetup` genera el estado autenticado (test-artifacts/auth.json)
// - `use.storageState` reutiliza ese estado en los tests para evitar repetir login UI
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  // globalSetup se ejecuta UNA vez antes de comenzar la suite y aquí
  // generamos `test-artifacts/auth.json` para reusar sesión autenticada.
  // Esto acelera los tests ya que evitan logearse por UI repetidamente.
  
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    // URL base de tu aplicación
    // Base URL de la aplicación bajo prueba. Usar rutas relativas en tests.
    baseURL: 'https://practicesoftwaretesting.com/',
    // `storageState` apunta al archivo generado por `global-setup.ts`.
    // Playwright usará cookies/localStorage de ese JSON en cada test.
    storageState: 'test-artifacts/auth.json',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    //agrego estas lineas para que las pruebas se vean más claras
    // Tiempo de espera para que las acciones (click, fill) y las aserciones se completen.
    // Un valor de 10 segundos es un buen punto de partida.
    actionTimeout: 90000, 
    navigationTimeout: 90000, 

    // Aquí puedes añadir opciones de visualización para debugging local
    // Añadimos 'headless: false' como default SÓLO si no estamos en CI, 
    // lo cual te dará la visualización que buscabas.
    // **NOTA:** Esto es opcional, pero ayuda mucho en la fase junior/trainee.
    headless: !!process.env.CI,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
