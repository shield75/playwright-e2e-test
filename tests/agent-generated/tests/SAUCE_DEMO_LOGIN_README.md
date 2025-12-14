/**
 * ============================================================================
 * SAUCE DEMO LOGIN TEST SUITE - QUICK REFERENCE
 * ============================================================================
 * 
 * Location: tests/agent-generated/tests/
 * 
 * Generated Files:
 * ├── sauce-demo-login-positive.spec.ts      (4 test cases)
 * ├── sauce-demo-login-negative.spec.ts      (12 test cases)
 * ├── sauce-demo-login-edge-cases.spec.ts    (15 test cases)
 * ├── TEST_SUITE_SUMMARY.ts                  (Documentation)
 * └── SAUCE_DEMO_LOGIN_README.md             (This file)
 * 
 * Total: 31 comprehensive test cases
 * 
 * ============================================================================
 * QUICK START
 * ============================================================================
 * 
 * Run all login tests:
 *   npx playwright test tests/agent-generated/tests/sauce-demo-login-*.spec.ts
 * 
 * Run with browser visible:
 *   npx playwright test --headed tests/agent-generated/tests/sauce-demo-login-*.spec.ts
 * 
 * Run specific category:
 *   npx playwright test tests/agent-generated/tests/sauce-demo-login-positive.spec.ts
 *   npx playwright test tests/agent-generated/tests/sauce-demo-login-negative.spec.ts
 *   npx playwright test tests/agent-generated/tests/sauce-demo-login-edge-cases.spec.ts
 * 
 * Run specific test:
 *   npx playwright test -g "Successful Login with Valid Credentials"
 * 
 * Generate report:
 *   npx playwright test tests/agent-generated/tests/sauce-demo-login-*.spec.ts
 *   npx playwright show-report
 * 
 * ============================================================================
 * TEST CATEGORIES
 * ============================================================================
 * 
 * ✅ POSITIVE TESTS (sauce-demo-login-positive.spec.ts)
 *    Tests successful login scenarios with valid credentials
 *    
 *    • 1.1  Successful Login - standard_user
 *    • 1.2  Successful Login - problem_user
 *    • 1.3  Successful Login - performance_glitch_user
 *    • 1.4  Session Persistence after Page Reload
 * 
 * ❌ NEGATIVE TESTS (sauce-demo-login-negative.spec.ts)
 *    Tests login failure scenarios and error handling
 *    
 *    • 2.1  Empty Username and Password
 *    • 2.2  Valid Username, Empty Password
 *    • 2.3  Invalid Username and Password
 *    • 2.4  Valid Username, Invalid Password
 *    • 2.5  Locked Out User Account
 *    • 2.6  Invalid Username, Valid Password
 *    • 2.7  Close Error and Retry with Valid Credentials
 *    • 2.8  SQL Injection Attack Prevention
 *    • 2.9  XSS Injection Attack Prevention
 *    • 2.10 Case Sensitivity Test
 *    • 2.11 Login Button State
 *    • 2.12 Extra Whitespace Handling
 * 
 * 🔐 EDGE CASES & SECURITY (sauce-demo-login-edge-cases.spec.ts)
 *    Tests edge cases, boundary conditions, and security
 *    
 *    • 3.1  Login Page Elements Accessibility
 *    • 3.2  Whitespace-Only Input
 *    • 3.3  Password Field Masking
 *    • 3.4  Very Long Username (1000 chars)
 *    • 3.5  Very Long Password (1000 chars)
 *    • 3.6  No Autofill Security Issues
 *    • 3.7  HTML/XML Special Characters
 *    • 3.8  Unicode Character Support
 *    • 3.9  Enter Key in Username Field
 *    • 3.10 Enter Key in Password Field
 *    • 3.11 No Console Errors
 *    • 3.12 HTTPS Connection
 *    • 3.13 Tab Navigation Between Fields
 *    • 3.14 Error Message Close Button
 *    • 3.15 Multiple Failed Attempts
 * 
 * ============================================================================
 * KEY FEATURES
 * ============================================================================
 * 
 * ✓ Comprehensive Coverage
 *   - 31 test cases covering all scenarios from the test plan
 *   - Positive, negative, and edge case tests
 *   - Security and accessibility testing
 * 
 * ✓ Proper Assertions
 *   - URL and navigation verification
 *   - Error message content validation
 *   - UI element visibility checks
 *   - Form field validation
 *   - Session management verification
 * 
 * ✓ Security Testing
 *   - SQL injection prevention
 *   - XSS attack prevention
 *   - Password field masking
 *   - HTTPS enforcement
 *   - No information disclosure
 * 
 * ✓ Accessibility Testing
 *   - Keyboard navigation (Tab key)
 *   - Form field focus management
 *   - Error dismissal capability
 *   - HTTPS security
 * 
 * ✓ Best Practices
 *   - Clear test descriptions
 *   - Proper Playwright locators
 *   - Meaningful assertions
 *   - No hardcoded waits
 *   - Proper use of beforeEach hooks
 *   - Well-organized test files
 *   - Comprehensive comments
 * 
 * ============================================================================
 * TEST DATA
 * ============================================================================
 * 
 * Valid Credentials (Use any for successful login):
 *   • standard_user / secret_sauce
 *   • problem_user / secret_sauce
 *   • performance_glitch_user / secret_sauce
 * 
 * Locked Account (Cannot login):
 *   • locked_out_user / secret_sauce
 * 
 * Application URL:
 *   • https://www.saucedemo.com/
 * 
 * After Login Redirect:
 *   • https://www.saucedemo.com/inventory.html
 * 
 * ============================================================================
 * EXPECTED ERRORS
 * ============================================================================
 * 
 * Error Message | Scenario
 * ─────────────────────────────────────────────────────────────────────────
 * Username is required | No username provided
 * Password is required | No password provided
 * Username and password do not match | Invalid credentials
 * Sorry, this user has been locked out | Locked account login attempt
 * 
 * ============================================================================
 * ASSERTION EXAMPLES
 * ============================================================================
 * 
 * URL Verification:
 *   expect(page.url()).toContain('/inventory.html');
 * 
 * Error Message Verification:
 *   await expect(errorAlert).toContainText('Epic sadface:');
 * 
 * Element Visibility:
 *   await expect(productContainer).toBeVisible();
 * 
 * Field Value:
 *   await expect(usernameField).toHaveValue('standard_user');
 * 
 * Error Styling:
 *   await expect(usernameField).toHaveClass(/error/);
 * 
 * Page Navigation:
 *   await page.waitForURL('**/inventory.html', { waitUntil: 'networkidle' });
 * 
 * ============================================================================
 * MAINTENANCE GUIDELINES
 * ============================================================================
 * 
 * When Locators Change:
 *   1. Update selectors in all test files
 *   2. Ensure data-test attributes match
 *   3. Re-run tests to verify changes
 * 
 * When Error Messages Change:
 *   1. Update expected text in toContainText() assertions
 *   2. Update TEST_SUITE_SUMMARY documentation
 *   3. Add comment explaining the change
 * 
 * When Adding New Tests:
 *   1. Follow existing naming convention
 *   2. Add test number sequentially
 *   3. Use appropriate file (positive/negative/edge-cases)
 *   4. Update documentation
 *   5. Run full test suite to ensure no conflicts
 * 
 * ============================================================================
 * TROUBLESHOOTING
 * ============================================================================
 * 
 * Test Fails with "Element Not Found":
 *   - Check if selector has changed on website
 *   - Verify data-test attributes are correct
 *   - Use 'npx playwright test --debug' to inspect
 * 
 * Test Times Out:
 *   - Check network connectivity to saucedemo.com
 *   - Increase timeout in waitForURL if needed
 *   - Check if application is accessible
 * 
 * Error Message Mismatch:
 *   - Verify exact error message text from application
 *   - Check for leading/trailing spaces
 *   - Update assertion if application changed
 * 
 * ============================================================================
 * RESOURCES
 * ============================================================================
 * 
 * Test Plan:
 *   • tests/agent-generated/test-plan/sauce-demo-login-test-plan.md
 * 
 * Playwright Documentation:
 *   • https://playwright.dev/docs/intro
 * 
 * Sauce Demo Application:
 *   • https://www.saucedemo.com/
 * 
 * Playwright Config:
 *   • playwright.config.ts (in project root)
 * 
 * ============================================================================
 */

export const SAUCE_DEMO_LOGIN_TESTS = 31;
export const TEST_FILES = [
  'sauce-demo-login-positive.spec.ts',
  'sauce-demo-login-negative.spec.ts',
  'sauce-demo-login-edge-cases.spec.ts',
];
