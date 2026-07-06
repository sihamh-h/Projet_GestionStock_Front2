import { test as base, expect, type Page } from '@playwright/test';

// TODO : remplacer par de vrais comptes de test seedés en base de test
// (correspond aux rôles ROLE_ADMIN / ROLE_MANAGER / ROLE_EMPLOYEE vus dans DataInitializer)
export const SEED_USERS = {
  admin: { email: 'hasamsouma@mail.com', password: 'NouveauMotDePasse1234!', roles: ['ROLE_ADMIN'] as const },
  manager: { email: 'manager@stockiflow.com', password: 'ChangeMe123!', roles: ['ROLE_MANAGER'] as const },
  employee: { email: 'employee@stockiflow.com', password: 'ChangeMe123!', roles: ['ROLE_EMPLOYEE'] as const },
};

// Les <label> de LoginDialog.jsx sont maintenant liés aux <input> via htmlFor/id,
// donc getByLabel() fonctionne. On scope au <form> car le footer contient un lien mailto
// avec aria-label="Email" identique (exact:true ne suffit pas à lever l'ambiguïté).
export async function login(page: Page, email: string, password: string): Promise<void> {
  await page.goto('/');
  await page.getByRole('button', { name: 'Connexion', exact: true }).click();
 
  // Attend que la modale soit réellement ouverte avant de remplir le formulaire
  await page.getByText('Accédez à votre espace StockiFlow').waitFor({ state: 'visible', timeout: 10000 });
 
  const loginForm = page.locator('form').filter({ hasText: 'Mot de passe' });
  await loginForm.getByLabel('Email', { exact: true }).fill(email);
  await loginForm.getByLabel('Mot de passe', { exact: true }).fill(password);
  await loginForm.getByRole('button', { name: /Se connecter/ }).click();
 
  // Après un login réussi, LoginDialog appelle navigate(redirectTo) qui change la route
  await page.waitForURL((url) => url.pathname !== '/', { timeout: 15000 });
}
 
export const test = base.extend<{ authedPage: Page }>({
  authedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
 
    await login(page, SEED_USERS.admin.email, SEED_USERS.admin.password);
    await use(page);
 
    await context.clearCookies();
    await context.close();
  },
});
 
export const testManager = base.extend<{ authedManagerPage: Page }>({
  authedManagerPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
 
    await login(page, SEED_USERS.manager.email, SEED_USERS.manager.password);
    await use(page);
 
    await context.clearCookies();
    await context.close();
  },
});
 
export const testEmployee = base.extend<{ authedEmployeePage: Page }>({
  authedEmployeePage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
 
    await login(page, SEED_USERS.employee.email, SEED_USERS.employee.password);
    await use(page);
 
    await context.clearCookies();
    await context.close();
  },
});
 
export { expect };
 