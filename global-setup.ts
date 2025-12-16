// global-setup.ts
// Este archivo se ejecuta una vez antes de la suite de Playwright.
// Propósito:
// - Generar un usuario de prueba (via `utils/userFactory`) y crear un
//   `storageState` (auth.json) reutilizable con cookies y localStorage.
// - Intentar crear la sesión vía API (más rápido) si `USE_API=true`.
// - Si la vía API falla, realiza el registro por UI como fallback.
// Artefactos creados: `test-artifacts/auth.json` y `test-artifacts/generated-user.json`.
// Notas: mantener `test-artifacts/` en .gitignore.
// filesystem and path utilities to write/read artifact files
import fs from 'fs';
import path from 'path';

// Playwright types and browser/request helpers
import { FullConfig, chromium, request as playwrightRequest } from '@playwright/test';

// Factory that generates a test user (see `utils/userFactory.js`).
// We import the JS module with require to match existing project style.
const { generateUser } = require('./utils/userFactory');

async function tryApiRegister(base: string, user: any) {
  try {
    // Crear un contexto HTTP (no-browser) para llamar al API directamente.
    // Esto es mucho más rápido y estable que pasar por la UI cuando el
    // backend expone endpoints REST para registrar/login.
    const apiContext = await playwrightRequest.newContext({ baseURL: base });

    // POST a /api/register para crear el usuario en el backend.
    // Ajusta este endpoint si tu API usa otra ruta o payload.
    await apiContext.post('/api/register', { data: user });

    // POST a /api/login para obtener el token/session del usuario.
    const loginResp = await apiContext.post('/api/login', { data: { email: user.email, password: user.password } });
    if (loginResp.ok()) {
      const body = await loginResp.json();
      // Intentamos varias claves comunes para recuperar el token del body
      // (varía según implementación: token, accessToken, access_token...).
      const token = body.token || body.accessToken || body.access_token || null;

      // Liberar recursos del contexto HTTP
      await apiContext.dispose();
      return token; // token será usado para inyectar sesión en localStorage
    }
    await apiContext.dispose();
    return null; // login falló
  } catch (e) {
    return null;
  }
}

async function globalSetup(config: FullConfig) {
  const base = process.env.BASE_URL ?? 'https://practicesoftwaretesting.com/';
  const useApi = process.env.USE_API === 'true';

  const user = generateUser();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    if (useApi) {
      // Si la variable de entorno USE_API=true, intentamos el flujo por API.
      const token = await tryApiRegister(base, user);
      if (token) {
        // Asegurarnos de que existe la carpeta donde guardaremos artefactos
        const artifactsDir = path.resolve(process.cwd(), 'test-artifacts');
        if (!fs.existsSync(artifactsDir)) fs.mkdirSync(artifactsDir);

        // Ruta final donde guardaremos el storageState (Playwright espera JSON)
        const storagePath = path.resolve(artifactsDir, 'auth.json');

        // Clave en localStorage donde tu app espera el token (ajustable via AUTH_TOKEN_KEY)
        const tokenKey = process.env.AUTH_TOKEN_KEY || 'auth_token';

        // Navegamos a la base para que la ejecución de page.evaluate tenga el dominio correcto
        await page.goto(base);

        // Inyectamos el token en localStorage: esto simula que el usuario ya está autenticado.
        // page.evaluate corre en el contexto del navegador.
        // Pasamos un objeto { k, t } y lo desestructuramos en la función del navegador
        await page.evaluate(
        ({ k, t }: { k: string; t: string }) => {
            localStorage.setItem(k, t);
        }, 
        { k: tokenKey, t: token as string }
        );
        // Guardamos el estado de sesión (cookies + localStorage) en un JSON que luego
        // podemos reutilizar desde `playwright.config.ts` o desde tests individuales.
        await context.storageState({ path: storagePath });

        // Guardamos también el objeto `user` usado para crear la sesión, útil para debugging.
        fs.writeFileSync(path.join(artifactsDir, 'generated-user.json'), JSON.stringify(user, null, 2));
        return; // terminamos globalSetup porque ya tenemos auth.json
      }
      // si no conseguimos token por API, continuamos y haremos el registro por UI
    }

    // Fallback: realizar registro por UI
    await page.goto(new URL('/auth/register', base).toString());

    // Rellenar formulario de registro por UI (fallback cuando no existe API pública)
    await page.getByLabel('First Name').fill(user.firstName);
    await page.getByLabel('Last Name').fill(user.lastName);
    await page.getByLabel('Date of Birth *').fill(user.dob);
    await page.getByLabel('Street').fill(user.street);
    await page.getByLabel('Postal code').fill(user.postalCode);
    await page.getByLabel('City').fill(user.city);
    await page.getByLabel('State').fill(user.state);
    // `selectOption` para los selects; usamos label para mayor robustez si cambia el value
    await page.getByLabel('Country').selectOption({ label: user.country });
    await page.getByLabel('Phone').fill(user.phone);
    await page.getByLabel('Email address').fill(user.email);
    await page.getByPlaceholder('Your password').fill(user.password);

    await page.getByRole('button', { name: 'Register' }).click();

    try {
      // Esperamos que la app redirija a /dashboard tras registro. Si no, usamos fallback.
      await page.waitForURL('**/dashboard', { timeout: 15000 });
    } catch {
      // Si no hubo redirect claro, esperaremos a que no queden requests de red
      await page.waitForLoadState('networkidle');
    }

    // Guardar state y usuario en test-artifacts/ para que los tests puedan reutilizarlo.
    const artifactsDir = path.resolve(process.cwd(), 'test-artifacts');
    if (!fs.existsSync(artifactsDir)) fs.mkdirSync(artifactsDir);
    const outPath = path.resolve(artifactsDir, 'auth.json');
    // storageState escribe un JSON con cookies y localStorage; es el formato esperado
    // por Playwright en `use.storageState`.
    await context.storageState({ path: outPath });
    // Guardar datos del usuario para debugging (no versionar este archivo)
    fs.writeFileSync(path.join(artifactsDir, 'generated-user.json'), JSON.stringify(user, null, 2));
  } finally {
    await browser.close();
  }
}

export default globalSetup;
