// tests/login.spec.ts
// Pruebas relacionadas con el login:
// - `Login con email invalido` verifica validación del campo.
// - `Debe permitir el inicio de sesión exitoso` reutiliza `test-artifacts/auth.json`
//   para evitar repetir el flujo de autenticación por UI.
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { MainPage } from '../pages/mainPage';

/*
    tests/login.spec.ts

    Comportamiento:
    - `global-setup.ts` crea un estado autenticado y lo guarda en
        `test-artifacts/auth.json` (o lo genera vía UI si no hay API).
    - El test "Debe permitir el inicio de sesión exitoso" utiliza ese
        `storageState` creando un nuevo contexto de `browser` con
        `storageState: 'test-artifacts/auth.json'`. De este modo no necesita
        repetir el flujo de login por UI y es más rápido/estable.

    Nota:
    - El test de "email inválido" sigue usando el fixture `page` y
        realiza interacciones sobre la página de login.
    - `test-artifacts/` está ignorado por git y contiene `auth.json`
        y `generated-user.json` (usuario creado para debugging).
*/

test.describe('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
    });

    test('Login con email invalido', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('userexample.com', 'passwordSegura123');
        await loginPage.expectEmailErrorVisible();
    });

    test('Debe permitir el inicio de sesión exitoso', async ({ browser }) => {
        // Crear un contexto nuevo usando el storageState generado por global-setup
        const context = await browser.newContext({ storageState: 'test-artifacts/auth.json' });
        const page = await context.newPage();

        const mainPage = new MainPage(page);

        // Navegar a la página principal (usa baseURL de playwright.config.ts)
        await page.goto('/');

        // Verificar que la página principal cargó correctamente
        await mainPage.waitForLoaded();

        await context.close();
    });

});
