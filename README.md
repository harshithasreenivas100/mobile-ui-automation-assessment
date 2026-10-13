# Mobile UI Automation Framework

A mobile test automation framework built with **WebdriverIO 9, Appium, Cucumber, and TypeScript** to automate Android and iOS app flows.

## Tech Stack

* WebdriverIO 9
* Appium 2
* Cucumber (BDD)
* TypeScript
* JUnit reporting

## Prerequisites

Install the following before running the tests:

* Node.js and npm
* Java JDK
* Android Studio and Android SDK
* Appium
* Xcode (for iOS testing)

For Android, enable USB debugging and connect your phone.

## Setup

**1. Install dependencies**

```bash
npm install
```

**2. Configure environment variables**

Create a `.env` file in the project root with your device and app details:

```dotenv
PLATFORM=android
DEVICE_NAME=Local Android Phone
PLATFORM_VERSION=YOUR_ANDROID_VERSION
UDID=YOUR_DEVICE_ID
ANDROID_APP_PATH=./apps/your-app.apk
APPIUM_SERVER_URL=http://127.0.0.1:4723
```

Replace the example values with your actual device details and APK path.

**3. Verify your device**

```bash
adb devices
```

**4. Start Appium**

Open a separate terminal and run:

```bash
npx appium
```

## Running Tests

Run the commands from the project root.

**Android tests**

```bash
npm run test:android
```

**iOS tests**

```bash
npm run test:ios
```

**Smoke tests**

```bash
npm run test:smoke
```

**Regression tests**

```bash
npm run test:regression
```

**Run a specific feature**

```bash
npx wdio run wdio.conf.ts --spec ./src/Cucumber/features/login.feature
```

**Check TypeScript errors**

```bash
npm run typecheck
```

## Project Structure

```text
mobile-ui-automation/
├── src/
│   ├── Cucumber/
│   │   ├── features/
│   │   └── steps/
│   ├── pages/
│   ├── support/
│   └── utils/
├── reports/
│   └── junit/
├── screenshots/
├── logs/
├── wdio.conf.ts
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

## Framework Design

* **Feature files:** Describe test scenarios using Gherkin.
* **Step definitions:** Connect feature steps to automation code.
* **Page objects:** Encapsulate screen elements and actions.
* **Utilities:** Store reusable configuration and helper functions.
* **WebdriverIO and Appium:** Manage test execution and mobile device interactions.
* **JUnit reporter:** Generates test reports in `reports/junit/`.

## Reports

JUnit XML reports are generated under:

```text
reports/junit/
```

Framework logs and screenshots are stored in their respective folders when configured by the tests.

## Troubleshooting

* **Device not detected:** Check USB debugging and run `adb devices`.
* **App fails to launch:** Verify the Appium server, device capabilities, and APK path.
* **Undefined Cucumber steps:** Ensure feature steps match the registered step definitions.
* **Tests not found:** Verify the feature file path and test tags.
* **TypeScript errors:** Run `npm run typecheck`.

## AI Usage

AI assisted with configuration reviews, troubleshooting Cucumber step definitions, debugging test execution, and improving documentation. Test implementation and validation remain part of the development process.

## License

For assessment and internal automation use unless otherwise specified.
