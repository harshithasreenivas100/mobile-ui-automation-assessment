import { Then } from '@wdio/cucumber-framework';
import assert from 'node:assert/strict';
import LoginPage from '../../../pages/LoginPage';

Then('User is navigated to Login page', async () => {
  assert.ok(await LoginPage.isLoginScreenVisible(), 'Login screen was not displayed after logout.');
});
