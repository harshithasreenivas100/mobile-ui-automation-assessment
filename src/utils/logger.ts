import fs from 'node:fs';
import path from 'node:path';
import { testConfig } from './config';

const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 } as const;
type Level = keyof typeof LEVELS;

const LOG_FILE = path.resolve('./logs/test-run.log');
const threshold = LEVELS[testConfig.logLevel as Level] ?? LEVELS.info;

try {
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
} catch {
  /* logging must never break a test run */
}

function write(level: Level, message: string): void {
  if (LEVELS[level] < threshold) return;
  const line = `${new Date().toISOString()} [${testConfig.platform}] ${level.toUpperCase()} ${message}`;
  console[level](line);
  try {
    fs.appendFileSync(LOG_FILE, `${line}\n`);
  } catch {
    /* ignore file-system errors */
  }
}

export const log = {
  debug: (message: string) => write('debug', message),
  info: (message: string) => write('info', message),
  warn: (message: string) => write('warn', message),
  error: (message: string) => write('error', message)
};
