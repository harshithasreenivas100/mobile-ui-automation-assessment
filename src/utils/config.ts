import 'dotenv/config';

/**
 * Single source of truth for everything driven by environment variables / .env.
 * Nothing else in the codebase should read process.env directly.
 */
export type PlatformName = 'android' | 'ios';

const rawPlatform = (process.env.PLATFORM || 'android').toLowerCase();
if (rawPlatform !== 'android' && rawPlatform !== 'ios') {
  throw new Error(`Unsupported PLATFORM "${process.env.PLATFORM}". Use "android" or "ios".`);
}
const platform: PlatformName = rawPlatform;
const isIOS = platform === 'ios';

export const testConfig = {
  platform,
  isIOS,

  // Execution
  waitTimeout: Number(process.env.WAIT_TIMEOUT || 10000),
  retries: Number(process.env.RETRIES || 0),
  tags: process.env.CUCUMBER_TAGS || '',
  logLevel: (process.env.LOG_LEVEL || 'info').toLowerCase(),

  // Appium server
  appiumServerUrl: process.env.APPIUM_SERVER_URL || 'http://127.0.0.1:4723',

  // Device
  device: {
    name: process.env.DEVICE_NAME || (isIOS ? '' : 'Android Emulator'),
    platformVersion: process.env.PLATFORM_VERSION || '',
    udid: process.env.UDID || ''
  },

  // App under test. `id` is the Android package / iOS bundle id (used to restart the app between scenarios).
  app: {
    path: (isIOS ? process.env.IOS_APP_PATH : process.env.ANDROID_APP_PATH) || '',
    id: isIOS
      ? process.env.IOS_BUNDLE_ID || 'com.saucelabs.SwagLabsMobileApp'
      : process.env.ANDROID_APP_PACKAGE || 'com.swaglabsmobileapp'
  },

  // Public demo credentials published with the Sauce Labs sample app.
  credentials: {
    username: process.env.APP_USERNAME || 'standard_user',
    password: process.env.APP_PASSWORD || 'secret_sauce'
  }
};
