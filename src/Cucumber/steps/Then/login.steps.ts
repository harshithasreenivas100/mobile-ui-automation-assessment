import { Then } from '@wdio/cucumber-framework';
import assert from 'node:assert/strict';
import LoginPage from '../../../pages/LoginPage';
import ProductsPage from '../../../pages/ProductsPage';

Then('User is navigated to product page', async () => {
  assert.ok(await ProductsPage.isProductsScreenVisible(), 'Products screen was not displayed after login.');
});

Then('Login error message is displayed', async () => {
  assert.ok(await LoginPage.isErrorVisible(), 'Expected login error message was not displayed.');
});

Then('Login error message says {string}', async (message: string) => {
  assert.ok(await LoginPage.isErrorTextDisplayed(message), `Login error text not found: "${message}"`);
});
