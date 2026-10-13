import fs from 'node:fs';
import path from 'node:path';
import { testConfig } from './config';

const REMOTE_APP = /^(https?:|storage:)/i;

function resolveAppPath(): string {
  const envVar = testConfig.isIOS ? 'IOS_APP_PATH' : 'ANDROID_APP_PATH';
  const appPath = testConfig.app.path;

  if (!appPath) {
    throw new Error(`Set ${envVar} in your .env file (see .env.example).`);
  }
  // URLs / cloud storage references are passed straight to Appium.
  if (REMOTE_APP.test(appPath)) {
    return appPath;
  }
  const resolved = path.resolve(appPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`App not found: ${resolved}. Download the build (see README) and update ${envVar}.`);
  }
  return resolved;
}

/** Builds the Appium capabilities for the platform selected via PLATFORM. */
export function buildCapabilities(): WebdriverIO.Capabilities {
  const { isIOS, device } = testConfig;

  if (isIOS && !device.name) {
    throw new Error('Set DEVICE_NAME to an installed simulator. List them with: xcrun simctl list devices available');
  }

  return {
    platformName: isIOS ? 'iOS' : 'Android',
    'appium:automationName': isIOS ? 'XCUITest' : 'UiAutomator2',
    'appium:deviceName': device.name,
    'appium:app': resolveAppPath(),
    'appium:newCommandTimeout': 120,
    'appium:noReset': true,
    'appium:fullReset': false,
    'appium:ignoreHiddenApiPolicyError': true,
    ...(device.platformVersion ? { 'appium:platformVersion': device.platformVersion } : {}),
    ...(device.udid ? { 'appium:udid': device.udid } : {}),
    ...(isIOS
      ? { 'appium:noReset': true, 'appium:wdaLaunchTimeout': 180000 } // first WebDriverAgent build can be slow
      : { 'appium:autoGrantPermissions': true })
  };
}
