import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false,
  // retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : undefined,

  reporter: 'html',
  use: {
    baseURL: "https://dev85236.service-now.com",
    extraHTTPHeaders: {
      Authorization: "Basic YWRtaW46bVR4MyRKZlJ3OVIh"
    }
  },
};

export default config;
