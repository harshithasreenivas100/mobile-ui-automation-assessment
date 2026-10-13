import { When } from '@wdio/cucumber-framework';
import LoginPage from '../../../pages/LoginPage';

When('User attempts to login with username {string} and password {string}', async (username: string, password: string) => {
  await LoginPage.login(username, password);
});
