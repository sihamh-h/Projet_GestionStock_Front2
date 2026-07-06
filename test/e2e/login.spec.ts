import { test, expect } from './fixtures/auth';
import { login, SEED_USERS } from './fixtures/auth'

test.describe('Connexion', () => {
 test('affiche une erreur avec des identifiants invalides', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Connexion', exact: true }).click();
 
    await page.getByLabel('Email', { exact: true }).fill('inconnu@mail.com');
    await page.getByLabel('Mot de passe', { exact: true }).fill('MauvaisMotDePasse1!');
    await page.getByRole('button', { name: /Se connecter/ }).click();
 
    // Message affiché dans la zone serverError de LoginDialog.jsx
    await expect(page.getByText(/incorrect/i)).toBeVisible();
  });

 test('redirige vers le dashboard admin avec un compte admin', async ({ page }) => {
    await login(page, SEED_USERS.admin.email, SEED_USERS.admin.password);
 
    await expect(page).toHaveURL(/\/admin\/dashboard/);
  });

  test('empêche la soumission avec des champs vides', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Connexion', exact: true }).click();
    await page.getByRole('button', { name: /Se connecter/ }).click();

    // La validation zod bloque la soumission : la modale reste affichée
    await expect(page.getByText('Accédez à votre espace StockiFlow')).toBeVisible();
  });
});