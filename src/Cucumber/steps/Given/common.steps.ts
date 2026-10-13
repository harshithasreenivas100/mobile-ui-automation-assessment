import { Given } from '@wdio/cucumber-framework'
import assert from 'node:assert/strict'
import LoginPage from '../../../pages/LoginPage'
import ProductsPage from '../../../pages/ProductsPage'
import { testConfig } from '../../../utils/config'

Given('App is launched successfully', async () => {
  assert.ok(await LoginPage.isLoginScreenVisible(), 'Login screen was not displayed.')
})

Given('User is logged in successfully', async () => {
  await LoginPage.login(testConfig.credentials.username, testConfig.credentials.password)
  assert.ok(await ProductsPage.isProductsScreenVisible(), 'Could not reach the products screen after login.')
})