import fs from 'node:fs';
import path from 'node:path';
import { testConfig } from './config';
import { log } from './logger';

const safe = (value: string): string => value.replace(/[^a-z0-9-_]+/gi, '_');

/**
 * Saves a screenshot and the UI hierarchy (page source) for a failed scenario. The page source is
 * usually what you need to fix a locator, so it is captured alongside the picture.
 * Each step is isolated: a dead session must not hide the original failure.
 */
export async function captureFailureArtifacts(scenarioName: string): Promise<void> {
  if (!driver.sessionId) {
    log.warn('No active session; skipping failure artifacts.');
    return;
  }

  const baseName = `${new Date().toISOString().replace(/[:.]/g, '-')}-${testConfig.platform}-${safe(scenarioName)}`;

  try {
    const screenshotPath = path.resolve('./screenshots', `${baseName}.png`);
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    fs.writeFileSync(screenshotPath, await driver.takeScreenshot(), 'base64');
    log.error(`Failure screenshot: ${screenshotPath}`);
  } catch (error) {
    log.error(`Could not capture screenshot: ${String(error)}`);
  }

  try {
    const sourcePath = path.resolve('./reports/page-source', `${baseName}.xml`);
    fs.mkdirSync(path.dirname(sourcePath), { recursive: true });
    fs.writeFileSync(sourcePath, await driver.getPageSource(), 'utf8');
    log.error(`Failure page source: ${sourcePath}`);
  } catch (error) {
    log.error(`Could not capture page source: ${String(error)}`);
  }
}
