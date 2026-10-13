import { When } from '@wdio/cucumber-framework';
import ProductsPage from '../../../pages/ProductsPage';

When('User adds the first item to the cart', async () => {
  await ProductsPage.addFirstProductToCart();
});

When('User opens the cart', async () => {
  await ProductsPage.openCart();
});
