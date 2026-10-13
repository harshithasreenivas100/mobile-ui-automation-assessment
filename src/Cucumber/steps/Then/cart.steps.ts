import { Then } from '@wdio/cucumber-framework';
import assert from 'node:assert/strict';
import CartPage from '../../../pages/CartPage';
import ProductsPage from '../../../pages/ProductsPage';

Then('Item should be successfully added to cart', async () => {
  assert.ok(
    await ProductsPage.isProductMarkedAsAdded(),
    'The product did not switch to REMOVE after tapping ADD TO CART.'
  );
});

Then('The cart contains {int} item(s)', async (expected: number) => {
  const actual = await CartPage.waitForItemCount(expected);
  assert.equal(actual, expected, `Expected ${expected} item(s) in the cart but found ${actual}.`);
});
