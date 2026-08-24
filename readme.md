````markdown
# PlaywrightProject – Playwright Cucumber Automation Framework

A scalable and maintainable UI automation framework built using **Playwright, Cucumber (BDD), and TypeScript** for the **LMS (Learning Management System)** application. This project was developed to implement modern test automation practices using industry-standard design patterns, reusable components, and reporting tools.

---

## 🚀 Features

- Cross-browser support (Chromium, Firefox, and WebKit)
- Headless and headed execution modes
- Page Object Model (POM) design pattern
- Behavior Driven Development (BDD) using Cucumber and Gherkin
- Centralized environment configuration using the `env/` folder
- Custom Cucumber World for shared test context
- Reusable hooks for browser setup, teardown, screenshots, and reporting
- Structured logging using Winston
- Data-driven testing using Excel (`exceljs`) and CSV (`csv-parse`)
- Tag-based execution (`@smoke`, `@regression`, etc.)
- Automatic rerun of failed scenarios
- Allure Reporting integration
- Multiple Cucumber HTML Reporting
- CI/CD ready with GitHub Actions

---

## 🌐 Application Under Test

**WaveIn LMS – Learning Management System**

https://www.waveinitlms.online/

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| TypeScript | Programming Language |
| Playwright `^1.61.1` | Browser Automation |
| @cucumber/cucumber `^13.1.0` | BDD Framework |
| ts-node | TypeScript Execution |
| dotenv | Environment Configuration |
| cross-env | Cross-platform Environment Variables |
| allure-cucumberjs | Allure Reporting |
| multiple-cucumber-html-reporter | HTML Reporting |
| winston | Logging |
| exceljs / xlsx | Excel Data Handling |
| csv-parse | CSV Data Handling |

---

## 📁 Project Structure

```text
PlaywrightProject
│
├── .github/
│   └── workflows/
│
├── docs/
│
├── env/
│
├── reports/
│
├── rerun/
│
├── src/
│   └── test/
│       ├── features/
│       ├── hooks/
│       ├── pages/
│       ├── steps/
│       ├── utils/
│       └── world/
│
├── testdata/
│
├── cucumber.js
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
````

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone <repository-url>
cd PlaywrightProject
```

### Install Dependencies

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install --with-deps
```

---

## 🔧 Configuration

Create an environment file inside the `env/` folder.

Example:

`env/.env.qa`

```ini
BASE_URL=https://www.waveinitlms.online/

BROWSER=chromium

HEADLESS=true

DEFAULT_TIMEOUT=30000

USERNAME=your_username

PASSWORD=your_password
```

---

## 📦 package.json Scripts

```json
{
  "scripts": {
    "test": "cross-env ENV=qa cucumber-js",
    "test:smoke": "cross-env ENV=qa cucumber-js --tags @smoke",
    "test:regression": "cross-env ENV=qa cucumber-js --tags @regression",
    "test:rerun": "cucumber-js @rerun/rerun.txt",
    "report:generate": "node src/test/utils/generateReport.js",
    "report:allure": "allure generate ./allure-results --clean && allure open"
  }
}
```

---

## ▶️ Running Tests

### Run All Tests

```bash
npm run test
```

### Run a Specific Feature

```bash
npx cucumber-js src/test/features/login.feature
```

### Run Smoke Tests

```bash
npm run test:smoke
```

### Run Regression Tests

```bash
npm run test:regression
```

### Run Using Custom Tags

```bash
npm run test -- --tags "@smoke and not @wip"
```

### Run in Headed Mode

```bash
cross-env HEADLESS=false npm run test
```

### Run on Firefox

```bash
cross-env BROWSER=firefox npm run test
```

---

## ⚡ Parallel Execution

Execute scenarios in parallel:

```bash
npm run test -- --parallel 4
```

---

## 🔄 Rerun Failed Scenarios

Failed scenarios can be rerun using the generated rerun file:

```bash
npm run test:rerun
```

---

## 📊 Reports

### Generate Multiple Cucumber HTML Report

```bash
npm run report:generate
```

The generated report can be found at:

```text
reports/html-report/index.html
```

### Generate Allure Report

Run the tests first:

```bash
npm run test
```

Then generate and open the Allure report:

```bash
npm run report:allure
```

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Follow the Page Object Model (POM) design.
4. Write reusable and maintainable code.
5. Add assertions and logging where necessary.
6. Execute tests across Chromium, Firefox, and WebKit.
7. Submit a Pull Request.

---

## 🚀 Future Enhancements

* API Testing Integration
* Docker Support
* BrowserStack Integration
* LambdaTest Integration
* Visual Regression Testing
* Performance Testing Integration
* Advanced Reporting Dashboard
* Test Analytics

---

## 👥 Contributors

* **JOTHIKA R**
* **SRIRAM K**
* **JAGADEEP K C**
* **HARINI R G**
* **SUBHASHREE R**

---

## 📄 License

This project is intended for learning and educational purposes.

---

Built using **Playwright, Cucumber (BDD), and TypeScript** to automate the **WaveIn LMS** application, following industry-standard automation practices including **Page Object Model (POM), reusable test components, cross-browser testing, data-driven testing, logging, and comprehensive reporting**.

```
```
