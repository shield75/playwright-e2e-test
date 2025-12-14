# Playwright E2E Test Suite with AI Capabilities

A comprehensive end-to-end testing framework built with **Playwright** and **Node.js**, featuring AI-powered test generation through MCP (Model Context Protocol) integration. This project includes multiple testing scenarios across different web applications with advanced features like reporting, CI/CD integration, and helper utilities.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Categories](#test-categories)
- [Page Object Model](#page-object-model)
- [Helper Utilities](#helper-utilities)
- [CI/CD Integration](#cicd-integration)
- [Reporting](#reporting)
- [Author](#author)

---

## 🎯 Project Overview

This is an **enterprise-grade** Playwright testing framework built during the Udemy Playwright Course. It automates end-to-end tests for multiple web applications including:

- **CURA Healthcare System** - Appointment booking and healthcare management
- **NopCommerce** - E-commerce platform testing
- **Sauce Labs Demo** - Login and checkout flow automation
- **Various functional tests** - Login, sorting, parameterization, and more

The project leverages **AI-powered test generation** through MCP integration, allowing for intelligent test creation and validation.

**Version:** 1.0.0  
**Author:** Anisur Rahman Tonu  
**License:** ISC

---

## ✨ Features

✅ **Multi-browser testing** - Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari  
✅ **Page Object Model** - Clean, maintainable test architecture  
✅ **AI-powered test generation** - MCP and Agent-generated tests  
✅ **Comprehensive logging** - Custom logger with Allure integration  
✅ **Data-driven testing** - Parameterization support  
✅ **Hooks & Fixtures** - Custom fixtures and test lifecycle hooks  
✅ **Screenshot & video capture** - Automatic on failures  
✅ **Environment management** - Multi-environment configuration  
✅ **Allure reporting** - Beautiful, detailed test reports  
✅ **Jenkins CI/CD** - Built-in pipeline configuration  
✅ **API testing** - RESTful API automation  
✅ **Device testing** - Mobile and tablet automation  
✅ **Cookie handling** - Session and cookie management  
✅ **Helper utilities** - Date, file, sorting, and data helpers  

---

## 📁 Project Structure

```
playwright-e2e-test/
├── tests/                          # All test files
│   ├── e2e/                       # End-to-end tests
│   │   ├── cura.healthcare.spec.ts       # CURA healthcare flow
│   │   └── nopcommerce.e2e.spec.ts       # NopCommerce e-commerce flow
│   ├── functional/                 # Functional tests
│   │   ├── login.spec.ts                 # Login functionality
│   │   ├── make.appointment.spec.ts      # Appointment booking
│   │   ├── parameterization.make.appointment.spec.ts
│   │   └── swag-labs/                    # Sauce Labs demo tests
│   │       ├── checkout.spec.ts
│   │       ├── cookies.spec.ts
│   │       └── sorting.functionality.spec.ts
│   ├── api/                        # API automation tests
│   │   └── user.api.spec.ts              # RESTful API tests
│   ├── demo/                       # Demo & example tests
│   │   ├── mytest.spec.ts
│   │   ├── hooks.demo.spec.ts
│   │   └── element.handling.spec.ts
│   ├── devices/                    # Mobile & tablet testing
│   ├── mcp-generated/              # AI-generated tests (MCP)
│   │   └── cura.healthcare.spec.ts
│   ├── agent-generated/            # AI-generated tests (Agent)
│   │   └── tests/
│   │       ├── sauce-demo-login-positive.spec.ts
│   │       ├── sauce-demo-login-negative.spec.ts
│   │       └── sauce-demo-login-edge-cases.spec.ts
│   ├── page-objects/               # Page Object Model
│   │   ├── base.page.ts                  # Base page class
│   │   ├── cura-healthcare/              # CURA page objects
│   │   └── nop-commerce/                 # NopCommerce page objects
│   ├── helpers/                    # Utility & helper functions
│   │   ├── allure-defaults.ts            # Allure configuration
│   │   ├── attach-screenshot.ts          # Screenshot attachments
│   │   ├── config-fixtures.ts            # Custom fixtures
│   │   ├── data-helper.ts                # Data utilities
│   │   ├── date-helper.ts                # Date utilities
│   │   ├── file-helper.ts                # File operations
│   │   ├── logger.ts                     # Custom logging
│   │   ├── setup-env.ts                  # Environment setup
│   │   ├── sorting-helper.ts             # Sorting utilities
│   │   └── teardown-setup.ts             # Teardown logic
│   └── example.spec.ts             # Example test file
├── config/
│   └── test.playwright.config.ts   # Test-specific configuration
├── data/                           # Test data files
├── playwright.config.ts            # Main Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Project dependencies & scripts
├── Jenkinsfile                     # Jenkins CI/CD pipeline
├── allure-report/                  # Generated Allure reports
├── allure-results/                 # Allure test results
├── playwright-report/              # HTML test reports
└── README.md                       # This file
```

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** - v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** - v8.0.0 or higher (comes with Node.js)
- **Git** - For version control
- **Java** - Optional, required for Allure reports

**Supported Browsers:**
- Chromium
- Firefox
- WebKit
- Mobile Chrome
- Mobile Safari

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd playwright-e2e-test
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages:
- `@playwright/test` - Playwright testing framework
- `@types/node` - TypeScript Node types
- `allure-playwright` - Allure test reporting
- `allure-commandline` - Allure CLI tools
- `chalk` - Colored console output
- `dotenv` - Environment variable management

### 3. Install Playwright Browsers (if not already installed)
```bash
npx playwright install
```

### 4. Environment Configuration
Create a `.env` file in the project root:
```env
# User credentials
TEST_USERNAME=your_username
TEST_PASSWORD=your_password

# Base URLs
CURA_BASE_URL=https://katalon-demo-cura.herokuapp.com/
NOPCOMMERCE_BASE_URL=https://admin-demo.nopcommerce.com
API_BASE_URL=https://reqres.in/api

# Optional: Database configuration
DB_SERVER=your_db_server
DB_NAME=your_db_name
DB_CONNECTION_STR=your_connection_string
```

---

## ⚙️ Configuration

### Playwright Configuration
Main configuration is in [playwright.config.ts](playwright.config.ts) with environment-specific overrides in [config/test.playwright.config.ts](config/test.playwright.config.ts).

**Key Settings:**
- **Test Directory:** `./tests`
- **Base URL:** Configurable per environment
- **Browsers:** Chromium (default), Firefox, WebKit
- **Parallelization:** Enabled with workers
- **Retries:** 2 retries on CI, 0 on local
- **Trace:** Captured on first retry
- **Reports:** HTML + Allure

### TypeScript Configuration
[tsconfig.json](tsconfig.json) - Includes all test files and TypeScript compilation settings.

---

## 🚀 Running Tests

### Available Test Scripts

#### **E2E Tests**
```bash
# CURA Healthcare - with browser visible
npm run cura-e2e

# CURA Healthcare - headless mode
npm run cura-e2e-headless

# NopCommerce E2E
npm run demo-nopcommerce
```

#### **Functional Tests**
```bash
# Login functionality
npm run login-functionality

# Make appointment functionality
npm run make-appointment-functionality

# Checkout flow (Sauce Labs)
npm run checkout-flow

# Sorting functionality (Sauce Labs)
npm run sorting-functionality

# Parameterized appointment test
npm run param-data

# Cookie handling test
npm run demo-cookies
```

#### **API Tests**
```bash
# User API tests
npm run demo-api
```

#### **AI-Generated Tests**
```bash
# MCP-generated appointment booking test
npm run cura-appointment-booking-mcp

# Sauce Demo login - all variations
npm run sauce-demo-login-all

# Sauce Demo login - positive scenarios
npm run sauce-demo-login-positive

# Sauce Demo login - negative scenarios
npm run sauce-demo-login-negative

# Sauce Demo login - edge cases
npm run sauce-demo-login-edge-cases
```

#### **Demo & Examples**
```bash
# Basic demo test
npm run demo

# Firefox browser demo
npm run demo-firefox

# Hooks demo
npm run demo-hooks

# Logger demo
npm run demo-logger
```

#### **Smoke Tests**
```bash
# Run all tests tagged with @smoke
npm run smoke-test
```

### Custom Test Execution

```bash
# Run specific test file
npx playwright test tests/functional/login.spec.ts

# Run with specific project (browser)
npx playwright test --project=firefox

# Run in headed mode
npx playwright test --headed

# Run with single worker
npx playwright test --workers=1

# Run with specific grep tag
npx playwright test --grep @smoke

# View test report
npx playwright show-report
```

---

## 📊 Test Categories

### 1. **E2E Tests** (`tests/e2e/`)
Complete user journey tests across full applications:
- CURA Healthcare: Login → Make Appointment → Verify
- NopCommerce: Search customers → Verify results

### 2. **Functional Tests** (`tests/functional/`)
Individual feature tests:
- **Login Tests** - Credential validation, error handling
- **Appointment Tests** - Booking flow, data validation
- **Checkout Tests** - Sauce Labs e-commerce flow
- **Sorting Tests** - Product sorting functionality
- **Cookie Tests** - Session management

### 3. **API Tests** (`tests/api/`)
RESTful API automation:
- User API endpoints testing

### 4. **Demo Tests** (`tests/demo/`)
Learning examples and demonstrations

### 5. **Device Tests** (`tests/devices/`)
Mobile and tablet browser automation

### 6. **AI-Generated Tests** (`tests/mcp-generated/` & `tests/agent-generated/`)
Intelligent test generation:
- **MCP Generated** - Model Context Protocol integration
- **Agent Generated** - AI agent-powered test creation

---

## 🏗️ Page Object Model

The project uses **Page Object Model** pattern for maintainability and reusability.

### Base Page Class
[tests/page-objects/base.page.ts](tests/page-objects/base.page.ts)
- Provides common page interactions
- Navigation, click, fill, wait utilities
- Logging integration

### Application-Specific Page Objects

**CURA Healthcare:**
- Login Page
- Appointment Page
- Confirmation Page

**NopCommerce:**
- Customer search pages
- Product pages
- Checkout pages

### Example Usage
```typescript
import { CuraLoginPage } from './page-objects/cura-healthcare/login.page';

test('Login test', async ({ page }) => {
  const loginPage = new CuraLoginPage(page);
  await loginPage.navigate();
  await loginPage.login('admin', 'password');
  await loginPage.verifyLoginSuccess();
});
```

---

## 🔧 Helper Utilities

Located in [tests/helpers/](tests/helpers/):

| Helper | Purpose |
|--------|---------|
| **logger.ts** | Custom logging with color support |
| **data-helper.ts** | Test data generation and management |
| **date-helper.ts** | Date/time utilities |
| **file-helper.ts** | File operations (read, write, delete) |
| **sorting-helper.ts** | Array sorting and comparison |
| **config-fixtures.ts** | Custom Playwright fixtures |
| **attach-screenshot.ts** | Screenshot attachment utilities |
| **allure-defaults.ts** | Allure report configuration |
| **setup-env.ts** | Environment initialization |
| **teardown-setup.ts** | Test cleanup logic |

### Example: Using Logger
```typescript
import { logger } from '../helpers/logger';

logger.info('Test started');
logger.error('Test failed');
logger.debug('Debug information');
```

---

## 🔄 CI/CD Integration

### Jenkins Pipeline
[Jenkinsfile](Jenkinsfile) - Automated testing in Jenkins

**Pipeline Stages:**
1. **Install System Dependencies** - Node.js, Playwright dependencies
2. **Install Project Dependencies** - npm install
3. **Run Tests** - Execute Playwright tests
4. **Generate Reports** - Allure report generation
5. **Publish Results** - Publish reports to Jenkins

**Environment Variables:**
- `TEST_CREDS_USR` - Username from Jenkins credentials
- `TEST_CREDS_PSW` - Password from Jenkins credentials

**Configuration:**
- **Timeout:** 20 minutes
- **Node Tool:** node25
- **Allure Tool:** allure

---

## 📈 Reporting

### Allure Reports
Beautiful, detailed test reports with trends and analytics.

#### Generate Allure Report
```bash
npm run allure-report
```

This will:
1. Generate HTML report from test results
2. Preserve report history
3. Create interactive dashboards

#### View Reports
```bash
# HTML Report
npx playwright show-report

# Allure Report (after generation)
open allure-report/index.html
```

#### Report Artifacts
- **playwright-report/** - Standard Playwright HTML reports
- **allure-report/** - Interactive Allure reports with charts
- **allure-results/** - Raw test result data
- **test-results/** - Playwright test execution logs

---

## 📝 Example Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { logger } from '../helpers/logger';
import { LoginPage } from '../page-objects/login.page';

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Login with valid credentials @smoke', async ({ page }) => {
    // Step 1: Enter credentials
    await loginPage.enterUsername('admin');
    await loginPage.enterPassword('password');

    // Step 2: Submit login
    await loginPage.clickLoginButton();

    // Step 3: Verify success
    await expect(page).toHaveURL(/dashboard/);
    logger.info('Login successful');
  });

  test('Login with invalid credentials @negative', async ({ page }) => {
    await loginPage.enterUsername('invalid');
    await loginPage.enterPassword('wrong');
    await loginPage.clickLoginButton();

    // Verify error message
    await expect(loginPage.errorMessage).toContainText('Invalid credentials');
  });
});
```

---

## 📚 Best Practices Implemented

✅ **DRY Principle** - Reusable page objects and helpers  
✅ **Clear Naming** - Descriptive test and method names  
✅ **Explicit Waits** - Proper element waiting strategies  
✅ **Error Handling** - Comprehensive try-catch blocks  
✅ **Logging** - Detailed test execution logs  
✅ **Data-Driven** - Parameterized test support  
✅ **Isolation** - Independent test execution  
✅ **Fixtures** - Custom setup and teardown  
✅ **Reports** - Multiple reporting formats  

---

## 🐛 Troubleshooting

### Tests Failing to Run
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npx playwright install
```

### Browser Not Found
```bash
# Reinstall Playwright browsers
npx playwright install
npx playwright install-deps
```

### Port Already in Use
- Change the port in configuration
- Kill process using the port

### Environment Variables Not Loading
- Verify `.env` file exists in root directory
- Check `dotenv` is imported in config files
- Restart test runner after changing `.env`

### Allure Report Not Generating
```bash
# Ensure Allure is installed
npm install allure-commandline --save-dev

# Generate manually
npx allure generate allure-results --clean -o allure-report
```

---

## 🤝 Contributing

When adding new tests:
1. Follow the Page Object Model pattern
2. Use meaningful test names with `@tags`
3. Add logging at critical steps
4. Update this README if adding new test categories
5. Ensure tests are independent and isolated

---

## 📖 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Allure Reporting](https://docs.qameta.io/allure/)
- [Test Configuration](playwright.config.ts)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📄 License

ISC License - See package.json for details

---

## 👨‍💼 Author

**Anisur Rahman Tonu**

Built as part of the Udemy Playwright E2E Testing course with AI/MCP integration.

---

## 🎓 Keywords

`playwright` `playwright-e2e-tests` `playwright-mcp` `test-automation` `ai-generated-tests` `allure-reporting` `ci-cd` `jenkins`

---

**Last Updated:** December 2024  
**Project Version:** 1.0.0
