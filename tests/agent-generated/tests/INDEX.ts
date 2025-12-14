/**
 * ============================================================================
 * SAUCE DEMO LOGIN TEST SUITE - INDEX & NAVIGATION
 * ============================================================================
 * 
 * Test Suite Location: tests/agent-generated/tests/
 * Test Plan Location: tests/agent-generated/test-plan/sauce-demo-login-test-plan.md
 * 
 * This index provides a complete overview of all generated test files and
 * test cases for the Sauce Demo login functionality.
 * 
 * ============================================================================
 * FILE STRUCTURE
 * ============================================================================
 * 
 * tests/agent-generated/tests/
 * │
 * ├── 🟢 sauce-demo-login-positive.spec.ts
 * │   │ 4 test cases for successful login scenarios
 * │   │
 * │   ├── 1.1 Successful Login with Valid Credentials (standard_user)
 * │   ├── 1.2 Successful Login with problem_user
 * │   ├── 1.3 Successful Login with performance_glitch_user
 * │   └── 1.4 Verify Session is Active After Login
 * │
 * ├── 🔴 sauce-demo-login-negative.spec.ts
 * │   │ 12 test cases for login failures and error handling
 * │   │
 * │   ├── 2.1  Login with Empty Username and Empty Password
 * │   ├── 2.2  Login with Valid Username but Empty Password
 * │   ├── 2.3  Login with Invalid Username and Invalid Password
 * │   ├── 2.4  Login with Valid Username but Invalid Password
 * │   ├── 2.5  Login with Locked Out User Account
 * │   ├── 2.6  Login with Invalid Username and Valid Password
 * │   ├── 2.7  Close Error Message and Retry Login
 * │   ├── 2.8  Login with SQL Injection Attempt
 * │   ├── 2.9  Login with XSS Injection Attempt
 * │   ├── 2.10 Case Sensitivity Test for Username
 * │   ├── 2.11 Verify Login Button State During Submission
 * │   └── 2.12 Login with Extra Whitespace in Credentials
 * │
 * ├── 🔐 sauce-demo-login-edge-cases.spec.ts
 * │   │ 15 test cases for edge cases and security
 * │   │
 * │   ├── 3.1  Verify Login Page Elements Are Accessible
 * │   ├── 3.2  Login with Only Spaces in Username and Password
 * │   ├── 3.3  Verify Password Field Masks Input Characters
 * │   ├── 3.4  Login with Very Long Username
 * │   ├── 3.5  Login with Very Long Password
 * │   ├── 3.6  Verify No Autofill Security Issues
 * │   ├── 3.7  Login Attempt with Special HTML/XML Characters
 * │   ├── 3.8  Login with Unicode Characters
 * │   ├── 3.9  Verify Form Does Not Submit on Enter in Username Field
 * │   ├── 3.10 Verify Form Submits on Enter in Password Field
 * │   ├── 3.11 Verify No Console Errors on Login Page Load
 * │   ├── 3.12 Verify Network Security (HTTPS)
 * │   ├── 3.13 Login with Tab Navigation Between Fields
 * │   ├── 3.14 Verify Error Message Button Close Functionality
 * │   └── 3.15 Multiple Failed Login Attempts Rate Limiting
 * │
 * ├── 📋 TEST_SUITE_SUMMARY.ts
 * │   Comprehensive documentation of all 31 test cases with:
 * │   - Detailed descriptions
 * │   - All assertions for each test
 * │   - Test data reference
 * │   - Command examples
 * │   - Best practices implemented
 * │   - Maintenance notes
 * │
 * ├── 📖 SAUCE_DEMO_LOGIN_README.md
 * │   Quick reference guide with:
 * │   - Quick start commands
 * │   - Test category overview
 * │   - Key features summary
 * │   - Test data reference
 * │   - Expected errors
 * │   - Troubleshooting tips
 * │
 * └── 📑 INDEX.ts (This file)
 *     Navigation and overview of all files
 * 
 * ============================================================================
 * QUICK COMMAND REFERENCE
 * ============================================================================
 * 
 * Run All Tests:
 *   $ npx playwright test tests/agent-generated/tests/sauce-demo-login-*.spec.ts
 * 
 * Run Tests in Browser:
 *   $ npx playwright test --headed tests/agent-generated/tests/sauce-demo-login-*.spec.ts
 * 
 * Run Tests in Debug Mode:
 *   $ npx playwright test --debug tests/agent-generated/tests/sauce-demo-login-positive.spec.ts
 * 
 * Run Specific Test:
 *   $ npx playwright test -g "Successful Login with Valid Credentials"
 * 
 * Run Specific File:
 *   $ npx playwright test tests/agent-generated/tests/sauce-demo-login-positive.spec.ts
 *   $ npx playwright test tests/agent-generated/tests/sauce-demo-login-negative.spec.ts
 *   $ npx playwright test tests/agent-generated/tests/sauce-demo-login-edge-cases.spec.ts
 * 
 * View Report:
 *   $ npx playwright show-report
 * 
 * Run with Specific Browser:
 *   $ npx playwright test --project=chromium tests/agent-generated/tests/sauce-demo-login-*.spec.ts
 *   $ npx playwright test --project=firefox tests/agent-generated/tests/sauce-demo-login-*.spec.ts
 *   $ npx playwright test --project=webkit tests/agent-generated/tests/sauce-demo-login-*.spec.ts
 * 
 * ============================================================================
 * TEST STATISTICS
 * ============================================================================
 * 
 * Total Test Cases:              31
 * Total Test Files:              3
 * Total Assertions:              ~150+
 * 
 * Breakdown:
 *   Positive Tests:              4  (13%)
 *   Negative Tests:              12 (39%)
 *   Edge Cases & Security:       15 (48%)
 * 
 * Coverage Areas:
 *   ✓ Authentication             6 tests
 *   ✓ Form Validation            6 tests
 *   ✓ Error Handling             8 tests
 *   ✓ Security Testing           6 tests
 *   ✓ Accessibility              5 tests
 * 
 * ============================================================================
 * TEST DATA REFERENCE
 * ============================================================================
 * 
 * Application URL:
 *   https://www.saucedemo.com/
 * 
 * Valid Credentials:
 *   standard_user     / secret_sauce
 *   problem_user      / secret_sauce
 *   performance_glitch_user / secret_sauce
 * 
 * Special Test Accounts:
 *   locked_out_user   / secret_sauce   (cannot login)
 *   error_user        / secret_sauce   (causes errors)
 *   visual_user       / secret_sauce   (visual glitches)
 * 
 * After Successful Login:
 *   Redirects to: https://www.saucedemo.com/inventory.html
 *   Page title:  Swag Labs
 * 
 * ============================================================================
 * KEY TEST SCENARIOS
 * ============================================================================
 * 
 * POSITIVE SCENARIOS (Must Pass):
 *   ✓ Valid credentials allow login
 *   ✓ User session persists
 *   ✓ All user accounts work (except locked)
 *   ✓ Products display correctly
 *   ✓ Navigation elements visible
 * 
 * NEGATIVE SCENARIOS (Must Show Error):
 *   ✗ Empty username shows "Username is required"
 *   ✗ Empty password shows "Password is required"
 *   ✗ Invalid credentials show generic error
 *   ✗ Locked account shows specific error
 *   ✗ Users remain on login page
 * 
 * SECURITY SCENARIOS (Must Prevent Attack):
 *   🔒 SQL injection blocked
 *   🔒 XSS injection blocked
 *   🔒 Password field masked
 *   🔒 HTTPS enforced
 *   🔒 No information disclosure
 *   🔒 No console errors
 * 
 * EDGE CASES (Must Handle Gracefully):
 *   ↔ Very long inputs (1000+ chars)
 *   ↔ Special characters
 *   ↔ Unicode characters
 *   ↔ Whitespace-only input
 *   ↔ Multiple failed attempts
 *   ↔ Keyboard navigation
 * 
 * ============================================================================
 * ASSERTION CATEGORIES
 * ============================================================================
 * 
 * Navigation Assertions:
 *   - URL verification (contain, exact match)
 *   - Page title verification
 *   - Redirect behavior
 * 
 * Visibility Assertions:
 *   - Form fields visibility
 *   - Error messages visibility
 *   - Page elements visibility
 * 
 * Value Assertions:
 *   - Input field values
 *   - Field types (text, password, submit)
 *   - Button labels
 * 
 * Style Assertions:
 *   - Error class presence
 *   - Field highlighting
 *   - Visual indicators
 * 
 * Interaction Assertions:
 *   - Focus management
 *   - Click functionality
 *   - Keyboard behavior
 * 
 * Content Assertions:
 *   - Error message text
 *   - Page content
 *   - Product list presence
 * 
 * ============================================================================
 * GETTING STARTED
 * ============================================================================
 * 
 * 1. Read the Overview:
 *    - Start with SAUCE_DEMO_LOGIN_README.md for quick reference
 * 
 * 2. Understand the Plan:
 *    - Review tests/agent-generated/test-plan/sauce-demo-login-test-plan.md
 * 
 * 3. Run the Tests:
 *    - Execute: npx playwright test tests/agent-generated/tests/sauce-demo-login-*.spec.ts
 * 
 * 4. View Results:
 *    - Check HTML report: npx playwright show-report
 * 
 * 5. Debug if Needed:
 *    - Use --debug flag for step-by-step execution
 *    - Check selectors with --headed mode
 * 
 * 6. Maintain Tests:
 *    - Update selectors if application changes
 *    - Update error messages if they change
 *    - Add new tests following existing patterns
 * 
 * ============================================================================
 * BEST PRACTICES IMPLEMENTED
 * ============================================================================
 * 
 * Code Organization:
 *   ✓ Descriptive test names
 *   ✓ Logical test grouping
 *   ✓ Clear file structure
 *   ✓ Comprehensive documentation
 * 
 * Test Quality:
 *   ✓ No hardcoded waits (except where necessary)
 *   ✓ Proper use of Playwright assertions
 *   ✓ Meaningful error messages
 *   ✓ Comprehensive coverage
 * 
 * Maintainability:
 *   ✓ Consistent code style
 *   ✓ Meaningful comments
 *   ✓ Easy to update selectors
 *   ✓ Well-documented assertions
 * 
 * Reliability:
 *   ✓ Proper wait conditions
 *   ✓ Network idle waits
 *   ✓ Timeout handling
 *   ✓ Error handling
 * 
 * ============================================================================
 * SUPPORT & TROUBLESHOOTING
 * ============================================================================
 * 
 * Common Issues:
 * 
 *   Q: Test fails with "Element not found"
 *   A: Check if the selector changed on website. Use --debug mode to inspect.
 * 
 *   Q: Test times out
 *   A: Check network connectivity to saucedemo.com. Increase timeout if needed.
 * 
 *   Q: Error message doesn't match
 *   A: Verify exact error text. Update assertion if application changed.
 * 
 *   Q: How do I add a new test?
 *   A: Follow existing patterns. Add to appropriate file. Update documentation.
 * 
 * Resources:
 *   - TEST_SUITE_SUMMARY.ts - Full test documentation
 *   - SAUCE_DEMO_LOGIN_README.md - Quick reference guide
 *   - Playwright docs: https://playwright.dev
 *   - Sauce Demo: https://www.saucedemo.com
 * 
 * ============================================================================
 */

// Re-export test constants for programmatic access
export const TEST_SUITE = {
  name: 'Sauce Demo Login Test Suite',
  totalTests: 31,
  location: 'tests/agent-generated/tests/',
  testPlan: 'tests/agent-generated/test-plan/sauce-demo-login-test-plan.md',
  files: {
    positive: {
      path: 'sauce-demo-login-positive.spec.ts',
      tests: 4,
      description: 'Successful login scenarios'
    },
    negative: {
      path: 'sauce-demo-login-negative.spec.ts',
      tests: 12,
      description: 'Login failure scenarios'
    },
    edgeCases: {
      path: 'sauce-demo-login-edge-cases.spec.ts',
      tests: 15,
      description: 'Edge cases and security tests'
    }
  },
  applicationUrl: 'https://www.saucedemo.com/',
  inventoryUrl: 'https://www.saucedemo.com/inventory.html',
};

// Export test categories
export const TEST_CATEGORIES = {
  POSITIVE: 'Positive Tests',
  NEGATIVE: 'Negative Tests',
  EDGE_CASES: 'Edge Cases & Security',
  SECURITY: 'Security Testing',
  ACCESSIBILITY: 'Accessibility Testing',
  PERFORMANCE: 'Performance Testing',
};

// Export test commands
export const COMMANDS = {
  runAll: 'npx playwright test tests/agent-generated/tests/sauce-demo-login-*.spec.ts',
  runPositive: 'npx playwright test tests/agent-generated/tests/sauce-demo-login-positive.spec.ts',
  runNegative: 'npx playwright test tests/agent-generated/tests/sauce-demo-login-negative.spec.ts',
  runEdgeCases: 'npx playwright test tests/agent-generated/tests/sauce-demo-login-edge-cases.spec.ts',
  runHeaded: 'npx playwright test --headed tests/agent-generated/tests/sauce-demo-login-*.spec.ts',
  runDebug: 'npx playwright test --debug tests/agent-generated/tests/sauce-demo-login-*.spec.ts',
  showReport: 'npx playwright show-report',
};
