# DNIF QA — ITSM Tests

Automated Playwright test suite for the DNIF ITSM module.

## Setup

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation

```bash
cd /home/yohanns/Desktop/bloo/DNIF-Testing
npm install
```

This installs `@playwright/test` v1.60.0 and its dependencies.

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run a single test file
```bash
npx playwright test dnif-temp/Dnif-itsm.spec.js
```
### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run with debug mode
```bash
PWDEBUG=1 npx playwright test dnif-temp/Dnif-itsm.spec.js
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Files
### Core Tests (Production)
- **Dnif-itsm.spec.js** — Test suite for DNIF ITSM, covering module functionality.

## Configuration

### playwright.config.ts
- **timeout**: 60s per test
- **navigationTimeout**: 60s for page.goto() and navigations
- **actionTimeout**: 15s for clicks, fills, etc.
- **Environment Variables**: Loads variables from `.env` using `dotenv`.

## Credentials

Tests use environment variables for authentication. Create a `.env` file in the root directory:

```env
DNIFTEST_EMAIL=your-email@dnif.it
DNIFTEST_PASSWORD=your-password
ATLASSIAN_TOKEN=you-atlassian-token
URL=DNIF-URL
```

**Note**: The `.env` file is excluded from version control via `.gitignore`.

## CI/CD Integration

To run tests in a CI pipeline (e.g., GitHub Actions, GitLab CI):

```yaml
- name: Run Playwright tests
  run: npm install && npx playwright test
```

Ensure Node.js >= 18 is available in the CI environment.

## Troubleshooting

### Test timeouts
- Increase `timeout` in `playwright.config.ts`.
- Check if the DNIF server is running and responsive.
- Run with `PWDEBUG=1` to inspect element states in real-time.

### Element not found
- Verify the selector matches the current DOM (inspect with DevTools or Playwright Inspector).
- Use `getByRole()` and `getByLabel()` for more robust selectors.

### Login failures
- Ensure the test account credentials are correct and the user is not locked out.
- Check if the login page layout has changed (may require selector updates).

## Maintenance

### Adding new tests
1. Add the new test inside `dnif-temp/Dnif-itsm.spec.js`.
2. Follow the existing pattern:
- Login
- Navigate
- Interact
- Assert
- Cleanup any created test data
3. Use role-based and accessible selectors whenever possible.
4. Prefer scoped locators (filter({ has: ... })) over brittle CSS chains.

### Updating selectors
- If the app UI changes, update selectors in affected tests.
- Prefer role/label selectors over CSS/XPath where possible.
- Test the new selector in Playwright Inspector before committing.

## License

Internal QA suite for DNIF. Not for external distribution.
