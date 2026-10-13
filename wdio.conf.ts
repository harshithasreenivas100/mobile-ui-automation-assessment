import { buildCapabilities } from './src/utils/capabilities'
import { testConfig } from './src/utils/config'

const appium = new URL(testConfig.appiumServerUrl)
const isHttps = appium.protocol === 'https:'

export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: ['./src/Cucumber/features/**/*.feature'],
  maxInstances: 1,
  framework: 'cucumber',

  cucumberOpts: {
    requireModule: ['ts-node/register/transpile-only'],
    require: [
      './src/Cucumber/steps/Given/common.steps.ts',
      './src/Cucumber/steps/When/login.steps.ts',
      './src/Cucumber/steps/When/logout.steps.ts',
      './src/Cucumber/steps/When/cart.steps.ts',
      './src/Cucumber/steps/Then/login.steps.ts',
       './src/Cucumber/steps/Then/cart.steps.ts',
        './src/Cucumber/steps/Then/logout.steps.ts'
    ],
    timeout: 120000
  },

  capabilities: [buildCapabilities()],
  protocol: isHttps ? 'https' : 'http',
  hostname: appium.hostname,
  port: Number(appium.port || (isHttps ? 443 : 80)),
  path: appium.pathname,
  logLevel: 'info',
  waitforTimeout: testConfig.waitTimeout
}