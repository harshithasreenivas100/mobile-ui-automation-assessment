import { testConfig } from './config';
import { log } from './logger';

/**
 * Terminates and relaunches the app under test so every scenario starts from the login screen with an
 * empty cart. The app keeps session state in memory only, so a restart is enough and is much faster
 * than creating a new Appium session.
 */
export async function restartApp(): Promise<void> {
  const { id } = testConfig.app;
  log.debug(`Restarting app ${id}`);
  await driver.terminateApp(id);
  await driver.activateApp(id);
}
