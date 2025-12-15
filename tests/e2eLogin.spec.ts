import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage'; // Asegúrate de la ruta correcta
import { LoginPage } from '../pages/loginPage';
// No necesitas importar MainPage aquí si el LoginPage ya te lleva allí

test.describe('Flujo End-to-End: Registro y Login', () => {

    test('Registro de nuevo usuario y login exitoso inmediato', async ({ page }) => {
        
        // --- 1. Preparación ---
        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);
        
        // --- 2. REGISTRO y Captura de Usuario ---
        await registerPage.goToRegisterPage();
        const newUser = await registerPage.registerNewUser(); // Objeto {email, password, ...}
        
        // 3. Verificación de éxito de registro (opcional pero recomendado)
        // Por ejemplo, que la página redirigió o mostró un mensaje
        // await expect(page.locator('.success-message')).toBeVisible(); 
        
        // --- 4. LOGIN con las credenciales capturadas ---
        
        // Vamos a la página de login (o quizás el registro ya te dejó en Home, verifica el flujo)
        await loginPage.goToLoginPage(); 
        
        // ¡Usamos el usuario dinámico!
        await loginPage.login(newUser.email, newUser.password);

        // --- 5. Verificación de Login ---
        // Asumiendo que MainPage.waitForLoaded() espera algo que indica que estás logueado
        // await new MainPage(page).waitForLoaded();
        
        // Verificación recomendada (ejemplo):
        await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible(); 
    });

});