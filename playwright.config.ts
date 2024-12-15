import { defineConfig, devices } from '@playwright/test';
import type {TestOptions} from './test-options';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
 require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 * 
 * EVERYTHING THAT CAN BE CONFIGURED ON THE CONFIG BELLOW CAN BE CONFIGURED ON PROJECT LEVEL AS WELL
 */
export default defineConfig<TestOptions>({
  timeout:40000,
  globalTimeout:60000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1, //this means that retries are set to be done on CI two times, and 1 is that locally it will have one retry
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined, // when running local is undefined but we can add multiple workers on CI/CD as well on local
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['json'], 
             ['junit', {outputFile: 'test-results/junitReport.xml'}],
             ["allure-playwright"]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
     baseURL: 'http://localhost:4200/',

     // we can use trenary condition to re-modify the URLs in the base URL SECTION
     /*baseURL: process.env.DEV === '1' ? 'http://localhost:4200/'
            : process.env.STAGE === '1'? 'http://localhost:4201/'
            :'http://localhost:4201/',*/

     globalsQaURL:"https://www.globalsqa.com/demo-site/draganddrop/#google_vignette",
     //globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/#google_vignette',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'off' //will save video only if test fails
    // video:{
    //   mode:'retain-on-failure',
    //   size:{width:1920,height:1000}
    // }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      timeout:20000,
      //fullyParallel:true fully pararel can be added per project but we will need to remove the default fully pararel.
    },

    {
      name:'mobile',
      testMatch:'testMobile.spec.ts',
      use:{
        //...devices['iPhone 11 Pro'],
        viewport: {width:430, height:932}
        
      }
    },

    // {
    //   name: 'dev',
    //   use: { ...devices['Desktop Chrome'],
    //     baseURL: 'http://localhost:4201/' // we can use different urls based on the project we run the tests.
    //    },
    // },

    // {
    //   name: 'stage',
    //   use: { ...devices['Desktop Chrome'],
    //     baseURL:'http://localhost:4202/'
    //    },
    // },

    {
      name: 'firefox',
      use: {
        browserName:'firefox',
        video:{
          mode:'retain-on-failure',
         size:{width:1920,height:1000}
         //The videos will be retain only for firefox
        }
       },
      
    },

    {
      name:'pageObjectFullScreen',
      testMatch: 'useOfPageObjects.spec.ts',
      use:{
        //viewport:{width:1920, height:1080}
      }
    }

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
