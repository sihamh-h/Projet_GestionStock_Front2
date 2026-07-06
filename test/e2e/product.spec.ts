import { test, expect } from './fixtures/auth';

// Référence unique par run (timestamp + aléatoire, robuste même en exécution parallèle)
const uniqueRef = () => `E2E-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
 
test.describe('CRUD Produit', () => {
  test('un admin peut créer un produit', async ({ authedPage }) => {
    const ref = uniqueRef();
 
    await authedPage.goto('/admin/product');
    await authedPage.getByRole('button', { name: 'Créer un produit' }).click();
 
    await authedPage.getByLabel('Référence', { exact: true }).fill(ref);
    await authedPage.getByLabel('Nom du produit', { exact: true }).fill('Clavier mécanique E2E');
    await authedPage.getByLabel('Description', { exact: true }).fill('Créé par un test Playwright');
    await authedPage.getByLabel('Prix (€)', { exact: true }).fill('59.99');
    await authedPage.getByLabel('Stock actuel', { exact: true }).fill('50');
    await authedPage.getByLabel('Stock minimum', { exact: true }).fill('5');
    await authedPage.getByLabel('Catégorie', { exact: true }).click();
    await authedPage.getByRole('listbox').getByRole('option').first().click();
 
    await authedPage.getByRole('button', { name: 'Enregistrer' }).click();
 
    // Filtre par référence pour garantir que la ligne est visible malgré la pagination
    await authedPage.getByPlaceholder('Rechercher un produit...').fill(ref);
    const row = authedPage.getByRole('row').filter({ hasText: ref });
    await expect(row).toBeVisible();
  });
 
  test('un admin peut modifier un produit existant', async ({ authedPage }) => {
    const ref = uniqueRef();
 
    await authedPage.goto('/admin/product');
 
    // Création préalable
    await authedPage.getByRole('button', { name: 'Créer un produit' }).click();
    await authedPage.getByLabel('Référence', { exact: true }).fill(ref);
    await authedPage.getByLabel('Nom du produit', { exact: true }).fill('Souris E2E');
    await authedPage.getByLabel('Prix (€)', { exact: true }).fill('19.99');
    await authedPage.getByLabel('Stock actuel', { exact: true }).fill('30');
    await authedPage.getByLabel('Stock minimum', { exact: true }).fill('3');
    await authedPage.getByLabel('Catégorie', { exact: true }).click();
    await authedPage.getByRole('listbox').getByRole('option').first().click();
    await authedPage.getByRole('button', { name: 'Enregistrer' }).click();
 
    await authedPage.getByPlaceholder('Rechercher un produit...').fill(ref);
    const row = authedPage.getByRole('row').filter({ hasText: ref });
    await expect(row).toBeVisible();
 
    // Édition
    await row.getByTestId('EditIcon').click();
    await authedPage.getByLabel('Nom du produit', { exact: true }).fill('Souris E2E modifiée');
    await authedPage.getByRole('button', { name: 'Enregistrer' }).click();
 
    await expect(row).toContainText('Souris E2E modifiée');
  });
 
  test('un admin peut supprimer un produit', async ({ authedPage }) => {
    const ref = uniqueRef();
 
    await authedPage.goto('/admin/product');
 
    // Création préalable
    await authedPage.getByRole('button', { name: 'Créer un produit' }).click();
    await authedPage.getByLabel('Référence', { exact: true }).fill(ref);
    await authedPage.getByLabel('Nom du produit', { exact: true }).fill('Écran E2E');
    await authedPage.getByLabel('Prix (€)', { exact: true }).fill('149.99');
    await authedPage.getByLabel('Stock actuel', { exact: true }).fill('10');
    await authedPage.getByLabel('Stock minimum', { exact: true }).fill('2');
    await authedPage.getByLabel('Catégorie', { exact: true }).click();
    await authedPage.getByRole('listbox').getByRole('option').first().click();
    await authedPage.getByRole('button', { name: 'Enregistrer' }).click();
 
    await authedPage.getByPlaceholder('Rechercher un produit...').fill(ref);
    const row = authedPage.getByRole('row').filter({ hasText: ref });
    await expect(row).toBeVisible();
 
    // Suppression
    await row.getByTestId('DeleteIcon').click();
    await authedPage.getByRole('button', { name: 'Supprimer' }).click();
 
    await expect(row).not.toBeVisible();
  });
});