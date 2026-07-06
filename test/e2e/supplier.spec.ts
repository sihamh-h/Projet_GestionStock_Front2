import { test, expect } from './fixtures/auth';

// Numéro/SIRET uniques par run (timestamp + aléatoire, robuste même en exécution parallèle)
const uniqueNumber = () => `E2E-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
const uniqueSiret = () => `${Date.now()}${Math.floor(Math.random() * 100000)}`.padEnd(14, '0').slice(0, 14);
const uniquePhone = () => `06${Math.floor(10000000 + Math.random() * 89999999)}`;
const uniqueEmail = () => `e2e-${Date.now()}-${Math.floor(Math.random() * 100000)}@e2e-test.fr`;
 
test.describe('CRUD Fournisseur', () => {
  test('un admin peut créer un fournisseur', async ({ authedPage }) => {
    const number = uniqueNumber();
    const siret = uniqueSiret();
    const phone = uniquePhone();
    const email = uniqueEmail();
 
    await authedPage.goto('/admin/supplier');
    await authedPage.getByRole('button', { name: 'Ajouter un fournisseur' }).click();
 
    await authedPage.getByLabel('Numéro', { exact: true }).fill(number);
    await authedPage.getByLabel('Nom', { exact: true }).fill('Fournisseur E2E');
    await authedPage.getByLabel('Email', { exact: true }).fill(email);
    await authedPage.getByLabel('Téléphone', { exact: true }).fill(phone);
    await authedPage.getByLabel('SIRET', { exact: true }).fill(siret);
 
    await authedPage.getByRole('button', { name: 'Enregistrer' }).click();
    // Attend que la modale se ferme (= création terminée côté serveur) avant de continuer
    await expect(authedPage.getByRole('heading', { name: 'Ajouter un fournisseur' })).not.toBeVisible();
 
    await authedPage.getByPlaceholder('Rechercher un fournisseur...').fill(number);
    const row = authedPage.getByRole('row').filter({ hasText: number });
    await expect(row).toBeVisible();
  });
 
  test('un admin peut modifier un fournisseur existant', async ({ authedPage }) => {
    const number = uniqueNumber();
    const siret = uniqueSiret();
    const phone = uniquePhone();
    const email = uniqueEmail();
 
    await authedPage.goto('/admin/supplier');
 
    // Création préalable
    await authedPage.getByRole('button', { name: 'Ajouter un fournisseur' }).click();
    await authedPage.getByLabel('Numéro', { exact: true }).fill(number);
    await authedPage.getByLabel('Nom', { exact: true }).fill('Fournisseur E2E');
    await authedPage.getByLabel('Email', { exact: true }).fill(email);
    await authedPage.getByLabel('Téléphone', { exact: true }).fill(phone);
    await authedPage.getByLabel('SIRET', { exact: true }).fill(siret);
    await authedPage.getByRole('button', { name: 'Enregistrer' }).click();
    await expect(authedPage.getByRole('heading', { name: 'Ajouter un fournisseur' })).not.toBeVisible();
 
    await authedPage.getByPlaceholder('Rechercher un fournisseur...').fill(number);
    const row = authedPage.getByRole('row').filter({ hasText: number });
    await expect(row).toBeVisible();
 
    // Édition
    await row.getByTestId('EditIcon').click();
    await authedPage.getByLabel('Nom', { exact: true }).fill('Fournisseur E2E modifié');
    await authedPage.getByRole('button', { name: 'Enregistrer' }).click();
    await expect(authedPage.getByRole('heading', { name: 'Modifier le fournisseur' })).not.toBeVisible();
 
    await expect(row).toContainText('Fournisseur E2E modifié');
  });
 
  test('un admin peut supprimer un fournisseur', async ({ authedPage }) => {
    const number = uniqueNumber();
    const siret = uniqueSiret();
    const phone = uniquePhone();
    const email = uniqueEmail();
 
    await authedPage.goto('/admin/supplier');
 
    // Création préalable
    await authedPage.getByRole('button', { name: 'Ajouter un fournisseur' }).click();
    await authedPage.getByLabel('Numéro', { exact: true }).fill(number);
    await authedPage.getByLabel('Nom', { exact: true }).fill('Fournisseur E2E');
    await authedPage.getByLabel('Email', { exact: true }).fill(email);
    await authedPage.getByLabel('Téléphone', { exact: true }).fill(phone);
    await authedPage.getByLabel('SIRET', { exact: true }).fill(siret);
    await authedPage.getByRole('button', { name: 'Enregistrer' }).click();
    await expect(authedPage.getByRole('heading', { name: 'Ajouter un fournisseur' })).not.toBeVisible();
 
    await authedPage.getByPlaceholder('Rechercher un fournisseur...').fill(number);
    const row = authedPage.getByRole('row').filter({ hasText: number });
    await expect(row).toBeVisible();
 
    // Suppression
    await row.getByTestId('DeleteIcon').click();
    await authedPage.getByRole('button', { name: 'Supprimer' }).click();
 
    await expect(row).not.toBeVisible();
  });
});