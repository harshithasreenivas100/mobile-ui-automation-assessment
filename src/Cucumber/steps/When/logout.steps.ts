import { When } from '@wdio/cucumber-framework';
import MenuPage from '../../../pages/MenuPage';

When('User attempts to logout from the app', async () => {
  await MenuPage.logout();
});
