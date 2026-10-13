import { After, Before } from '@wdio/cucumber-framework';
import { restartApp } from '../utils/app';
import { captureFailureArtifacts } from '../utils/artifacts';
import { log } from '../utils/logger';

// Each feature file gets a fresh Appium session, so the app is already clean for its first scenario.
let isFirstScenarioInSession = true;

Before(async function (scenario) {
  const tags = scenario.pickle.tags.map((tag) => tag.name).join(' ');
  log.info(`START ${scenario.pickle.name} ${tags}`.trim());

  // Isolation: scenarios must not inherit login state or cart contents from the previous one.
  if (!isFirstScenarioInSession) {
    await restartApp();
  }
  isFirstScenarioInSession = false;
});

After(async function (scenario) {
  const status = String(scenario.result?.status);
  log.info(`${status} ${scenario.pickle.name}`);

  if (status === 'FAILED') {
    await captureFailureArtifacts(scenario.pickle.name);
  }
});
