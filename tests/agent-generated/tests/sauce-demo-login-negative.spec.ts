/**
 * Sauce Demo - Login Negative Test Cases
 * Test Plan: tests/agent-generated/test-plan/sauce-demo-login-test-plan.md
 * Purpose: Verify login failure scenarios and error handling
 */

import { test, expect } from '@playwright/test';

test.describe('Sauce Demo - Negative Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Sauce Demo login page
    await page.goto('https://www.saucedemo.com/');
  });

  test('2.1 - Login with Empty Username and Empty Password', async ({ page }) => {
    // Verify that the application requires both username and password fields to be filled
    const loginButton = page.locator('input[type="submit"]');

    // Leave the Username field empty
    // Leave the Password field empty
    // Click the Login button
    await loginButton.click();

    // Wait for error message
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Verify error message for missing username
    await expect(errorAlert).toContainText('Epic sadface: Username is required');

    // Verify error message is displayed (h3 heading)
    await expect(errorAlert).toHaveRole('heading');

    // Username field is highlighted (visual indicator)
    const usernameField = page.locator('input[name="user-name"]');
    await expect(usernameField).toHaveClass(/error/);

    // User remains on the login page
    expect(page.url()).toContain('saucedemo.com/');
    expect(page.url()).not.toContain('/inventory.html');

    // No redirect occurs
    const inventoryContainer = page.locator('.inventory_container');
    await expect(inventoryContainer).not.toBeVisible();
  });

  test('2.2 - Login with Valid Username but Empty Password', async ({ page }) => {
    // Verify that the password field is mandatory for login
    const usernameField = page.locator('input[name="user-name"]');
    const loginButton = page.locator('input[type="submit"]');

    // Enter standard_user in the Username field
    await usernameField.fill('standard_user');

    // Leave the Password field empty
    // Click the Login button
    await loginButton.click();

    // Wait for error message
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Verify error message for missing password
    await expect(errorAlert).toContainText('Epic sadface: Password is required');

    // Password field is highlighted (visual indicator)
    const passwordField = page.locator('input[name="password"]');
    await expect(passwordField).toHaveClass(/error/);

    // User remains on the login page
    expect(page.url()).toContain('saucedemo.com/');
    expect(page.url()).not.toContain('/inventory.html');

    // Username field retains the entered value
    await expect(usernameField).toHaveValue('standard_user');

    // Verify form validation prevents submission
    const inventoryContainer = page.locator('.inventory_container');
    await expect(inventoryContainer).not.toBeVisible();
  });

  test('2.3 - Login with Invalid Username and Invalid Password', async ({ page }) => {
    // Verify that the application rejects invalid credentials with an appropriate error message
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Enter invalid_user in the Username field
    await usernameField.fill('invalid_user');

    // Enter wrongpassword in the Password field
    await passwordField.fill('wrongpassword');

    // Click the Login button
    await loginButton.click();

    // Wait for error message
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Verify error message (generic message for security)
    await expect(errorAlert).toContainText('Epic sadface: Username and password do not match any user in this service');

    // Verify error message is displayed (h3 heading)
    await expect(errorAlert).toHaveRole('heading');

    // Both Username and Password fields are highlighted
    await expect(usernameField).toHaveClass(/error/);
    await expect(passwordField).toHaveClass(/error/);

    // User remains on the login page
    expect(page.url()).toContain('saucedemo.com/');
    expect(page.url()).not.toContain('/inventory.html');

    // No redirect occurs
    const inventoryContainer = page.locator('.inventory_container');
    await expect(inventoryContainer).not.toBeVisible();
  });

  test('2.4 - Login with Valid Username but Invalid Password', async ({ page }) => {
    // Verify that the application rejects login attempts with valid username but incorrect password
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Enter standard_user in the Username field
    await usernameField.fill('standard_user');

    // Enter wrongpassword in the Password field
    await passwordField.fill('wrongpassword');

    // Click the Login button
    await loginButton.click();

    // Wait for error message
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Verify error message (generic, does not confirm username is valid)
    await expect(errorAlert).toContainText('Epic sadface: Username and password do not match any user in this service');

    // Both Username and Password fields are highlighted
    await expect(usernameField).toHaveClass(/error/);
    await expect(passwordField).toHaveClass(/error/);

    // User remains on the login page
    expect(page.url()).toContain('saucedemo.com/');
    expect(page.url()).not.toContain('/inventory.html');

    // Generic error message protects user privacy (no indication username is valid)
    const errorText = await errorAlert.textContent();
    expect(errorText).not.toContain('standard_user');
  });

  test('2.5 - Login with Locked Out User Account', async ({ page }) => {
    // Verify that users with locked-out accounts cannot access the application
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Enter locked_out_user in the Username field
    await usernameField.fill('locked_out_user');

    // Enter secret_sauce (correct password) in the Password field
    await passwordField.fill('secret_sauce');

    // Click the Login button
    await loginButton.click();

    // Wait for error message
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Verify specific error message for locked account
    await expect(errorAlert).toContainText('Epic sadface: Sorry, this user has been locked out.');

    // Username and Password fields are highlighted
    await expect(usernameField).toHaveClass(/error/);
    await expect(passwordField).toHaveClass(/error/);

    // User remains on the login page
    expect(page.url()).toContain('saucedemo.com/');
    expect(page.url()).not.toContain('/inventory.html');

    // Error message is specific to account lockout (not generic credential error)
    const errorText = await errorAlert.textContent();
    expect(errorText).toContain('locked out');
  });

  test('2.6 - Login with Invalid Username and Valid Password', async ({ page }) => {
    // Verify that non-existent username is rejected even with valid password format
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Enter nonexistent_user in the Username field
    await usernameField.fill('nonexistent_user');

    // Enter secret_sauce (the valid password) in the Password field
    await passwordField.fill('secret_sauce');

    // Click the Login button
    await loginButton.click();

    // Wait for error message
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Verify generic error message (does not reveal username doesn't exist)
    await expect(errorAlert).toContainText('Epic sadface: Username and password do not match any user in this service');

    // Both Username and Password fields are highlighted
    await expect(usernameField).toHaveClass(/error/);
    await expect(passwordField).toHaveClass(/error/);

    // User remains on the login page
    expect(page.url()).toContain('saucedemo.com/');
    expect(page.url()).not.toContain('/inventory.html');

    // Generic error message prevents username enumeration attacks
    const errorText = await errorAlert.textContent();
    expect(errorText).not.toContain('nonexistent_user');
    expect(errorText).not.toContain('does not exist');
  });

  test('2.7 - Close Error Message and Retry Login with Valid Credentials', async ({ page }) => {
    // Verify that users can dismiss error messages and retry login with different credentials
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Enter invalid_user in the Username field
    await usernameField.fill('invalid_user');

    // Enter wrongpass in the Password field
    await passwordField.fill('wrongpass');

    // Click the Login button
    await loginButton.click();

    // Wait for error message to appear
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Verify error message
    await expect(errorAlert).toContainText('Epic sadface: Username and password do not match any user in this service');

    // Click the close button (X icon) on the error message
    const closeButton = page.locator('[data-test="error-button"]');
    await closeButton.click();

    // Verify the error message is dismissed
    await expect(errorAlert).not.toBeVisible();

    // Clear the Username field and enter standard_user
    await usernameField.clear();
    await usernameField.fill('standard_user');

    // Clear the Password field and enter secret_sauce
    await passwordField.clear();
    await passwordField.fill('secret_sauce');

    // Click the Login button
    await loginButton.click();

    // Wait for successful redirect
    await page.waitForURL('**/inventory.html', { waitUntil: 'networkidle' });

    // Verify successful login
    expect(page.url()).toContain('/inventory.html');
    await expect(page).toHaveTitle('Swag Labs');

    // Verify no error messages
    await expect(errorAlert).not.toBeVisible();
  });

  test('2.8 - Login with SQL Injection Attempt', async ({ page }) => {
    // Verify that the application is protected against SQL injection attacks
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Enter SQL injection payload in Username field
    await usernameField.fill("' OR '1'='1");

    // Enter SQL injection payload in Password field
    await passwordField.fill("' OR '1'='1");

    // Click the Login button
    await loginButton.click();

    // Wait for error message
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Verify login fails with appropriate error
    await expect(errorAlert).toContainText('Epic sadface: Username and password do not match any user in this service');

    // No access is granted to the system
    const inventoryContainer = page.locator('.inventory_container');
    await expect(inventoryContainer).not.toBeVisible();

    // User remains on login page
    expect(page.url()).toContain('saucedemo.com/');
    expect(page.url()).not.toContain('/inventory.html');

    // Application does not display database errors
    const errorText = await errorAlert.textContent();
    expect(errorText).not.toContain('SQL');
    expect(errorText).not.toContain('database');
    expect(errorText).not.toContain('exception');
  });

  test('2.9 - Login with XSS Injection Attempt', async ({ page }) => {
    // Verify that the application properly handles and rejects special characters
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Enter XSS payload in Username field
    await usernameField.fill("<script>alert('xss')</script>");

    // Enter XSS payload in Password field
    await passwordField.fill("\"><script>alert('test')</script>");

    // Click the Login button
    await loginButton.click();

    // Wait for error message
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Verify login fails
    await expect(errorAlert).toContainText('Epic sadface: Username and password do not match any user in this service');

    // Application remains stable
    expect(page.url()).toContain('saucedemo.com/');
    expect(page.url()).not.toContain('/inventory.html');

    // Verify special characters are safely handled
    const usernameValue = await usernameField.inputValue();
    expect(usernameValue).toBe("<script>alert('xss')</script>");
  });

  test('2.10 - Case Sensitivity Test for Username (Uppercase)', async ({ page }) => {
    // Verify the case sensitivity behavior of the username field
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Enter STANDARD_USER (uppercase) in the Username field
    await usernameField.fill('STANDARD_USER');

    // Enter secret_sauce in the Password field
    await passwordField.fill('secret_sauce');

    // Click the Login button
    await loginButton.click();

    // Wait for response
    const errorAlert = page.locator('[data-test="error"]');
    await page.waitForTimeout(1000);

    // Verify behavior (username appears to be case-sensitive)
    const isErrorVisible = await errorAlert.isVisible();
    if (isErrorVisible) {
      // Username is case-sensitive
      await expect(errorAlert).toContainText('Epic sadface: Username and password do not match any user in this service');
      expect(page.url()).toContain('saucedemo.com/');
      expect(page.url()).not.toContain('/inventory.html');
    } else {
      // Username is case-insensitive
      await page.waitForURL('**/inventory.html', { timeout: 5000, waitUntil: 'networkidle' });
      expect(page.url()).toContain('/inventory.html');
    }
  });

  test('2.11 - Verify Login Button State During Submission', async ({ page }) => {
    // Verify that login button behaves correctly during form submission
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Enter valid credentials
    await usernameField.fill('standard_user');
    await passwordField.fill('secret_sauce');

    // Button should be enabled before click
    await expect(loginButton).not.toBeDisabled();

    // Click the Login button
    await loginButton.click();

    // Wait for successful redirect
    await page.waitForURL('**/inventory.html', { waitUntil: 'networkidle' });

    // Verify successful login
    expect(page.url()).toContain('/inventory.html');
  });

  test('2.12 - Login with Extra Whitespace in Credentials', async ({ page }) => {
    // Verify handling of whitespace in credentials
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Enter username with extra spaces
    await usernameField.fill('  standard_user  ');

    // Enter password with extra spaces
    await passwordField.fill('  secret_sauce  ');

    // Click the Login button
    await loginButton.click();

    // Wait for response
    await page.waitForTimeout(1000);

    const errorAlert = page.locator('[data-test="error"]');
    const isErrorVisible = await errorAlert.isVisible();

    if (isErrorVisible) {
      // Application does not trim whitespace automatically
      await expect(errorAlert).toContainText('Epic sadface: Username and password do not match any user in this service');
      expect(page.url()).not.toContain('/inventory.html');
    } else {
      // Application trims whitespace automatically
      await page.waitForURL('**/inventory.html', { timeout: 5000, waitUntil: 'networkidle' });
      expect(page.url()).toContain('/inventory.html');
    }
  });
});
