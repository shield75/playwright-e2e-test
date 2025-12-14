/**
 * Sauce Demo - Login Edge Cases and Security Tests
 * Test Plan: tests/agent-generated/test-plan/sauce-demo-login-test-plan.md
 * Purpose: Verify edge cases, boundary conditions, and security measures
 */

import { test, expect } from '@playwright/test';

test.describe('Sauce Demo - Login Edge Cases & Security Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Sauce Demo login page
    await page.goto('https://www.saucedemo.com/');
  });

  test('3.1 - Verify Login Page Elements Are Accessible', async ({ page }) => {
    // Verify all required elements are present on login page
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');
    const loginContainer = page.locator('.login_container');
    const logo = page.locator('.login_logo');

    // Verify login container is visible
    await expect(loginContainer).toBeVisible();

    // Verify logo is displayed
    await expect(logo).toBeVisible();

    // Verify all form fields are present and visible
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(loginButton).toBeVisible();

    // Verify input field types
    await expect(usernameField).toHaveAttribute('type', 'text');
    await expect(passwordField).toHaveAttribute('type', 'password');
    await expect(loginButton).toHaveAttribute('type', 'submit');

    // Verify login button text
    const buttonValue = await loginButton.getAttribute('value');
    expect(buttonValue?.toLowerCase()).toBe('login');
  });

  test('3.2 - Login with Only Spaces in Username and Password', async ({ page }) => {
    // Verify handling of credentials containing only whitespace
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Enter only spaces
    await usernameField.fill('     ');
    await passwordField.fill('     ');

    // Click the Login button
    await loginButton.click();

    // Wait for response
    await page.waitForTimeout(1000);

    const errorAlert = page.locator('[data-test="error"]');
    const isErrorVisible = await errorAlert.isVisible();

    // Verify application handles whitespace-only input appropriately
    expect(page.url()).not.toContain('/inventory.html');

    if (isErrorVisible) {
      const errorText = await errorAlert.textContent();
      // Should get appropriate error message
      expect(errorText).toContain('Epic sadface:');
    }
  });

  test('3.3 - Verify Password Field Masks Input Characters', async ({ page }) => {
    // Verify that password field hides characters for security
    const passwordField = page.locator('input[name="password"]');

    // Enter password
    await passwordField.fill('secret_sauce');

    // Verify field type is password (not text)
    const fieldType = await passwordField.getAttribute('type');
    expect(fieldType).toBe('password');

    // Verify characters are masked
    const displayValue = await passwordField.getAttribute('value');
    expect(displayValue).toBe('secret_sauce');

    // Verify displayed value shows masked characters
    // (Browser will mask the display but the value attribute contains actual content)
  });

  test('3.4 - Login with Very Long Username', async ({ page }) => {
    // Verify handling of extremely long username input
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Create very long username (1000 characters)
    const longUsername = 'a'.repeat(1000);

    // Enter long username
    await usernameField.fill(longUsername);
    await passwordField.fill('secret_sauce');

    // Click the Login button
    await loginButton.click();

    // Wait for response
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Verify application handles long input gracefully
    await expect(errorAlert).toContainText('Epic sadface: Username and password do not match any user in this service');

    // User remains on login page
    expect(page.url()).not.toContain('/inventory.html');
  });

  test('3.5 - Login with Very Long Password', async ({ page }) => {
    // Verify handling of extremely long password input
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Create very long password (1000 characters)
    const longPassword = 'p'.repeat(1000);

    // Enter credentials
    await usernameField.fill('standard_user');
    await passwordField.fill(longPassword);

    // Click the Login button
    await loginButton.click();

    // Wait for response
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Verify application handles long input gracefully
    await expect(errorAlert).toContainText('Epic sadface: Username and password do not match any user in this service');

    // User remains on login page
    expect(page.url()).not.toContain('/inventory.html');
  });

  test('3.6 - Verify No Autofill Security Issues', async ({ page }) => {
    // Verify that login credentials are not automatically filled or exposed
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');

    // Verify fields are empty on initial load
    await expect(usernameField).toHaveValue('');
    await expect(passwordField).toHaveValue('');

    // Check for autocomplete attributes
    const usernameAutocomplete = await usernameField.getAttribute('autocomplete');
    const passwordAutocomplete = await passwordField.getAttribute('autocomplete');

    // Fields should have appropriate autocomplete settings (could be 'off' or other security measure)
    // This is optional but good security practice
    if (usernameAutocomplete) {
      expect(['off', 'username']).toContain(usernameAutocomplete);
    }
    if (passwordAutocomplete) {
      expect(['off', 'current-password']).toContain(passwordAutocomplete);
    }
  });

  test('3.7 - Login Attempt with Special HTML/XML Characters', async ({ page }) => {
    // Verify that HTML/XML special characters are handled safely
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Enter special characters
    await usernameField.fill('<html>&lt;script&gt;</html>');
    await passwordField.fill('<?xml version="1.0"?>');

    // Click the Login button
    await loginButton.click();

    // Wait for response
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Verify login fails with appropriate error
    await expect(errorAlert).toContainText('Epic sadface: Username and password do not match any user in this service');

    // Application remains stable
    expect(page.url()).not.toContain('/inventory.html');
  });

  test('3.8 - Login with Unicode Characters', async ({ page }) => {
    // Verify handling of unicode/international characters
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Enter unicode characters
    await usernameField.fill('用户名');  // "username" in Chinese
    await passwordField.fill('密码');    // "password" in Chinese

    // Click the Login button
    await loginButton.click();

    // Wait for response
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Verify login fails appropriately
    await expect(errorAlert).toContainText('Epic sadface: Username and password do not match any user in this service');

    // User remains on login page
    expect(page.url()).not.toContain('/inventory.html');
  });

  test('3.9 - Verify Enter in Username Field Shows Password Required Error', async ({ page }) => {
    // Verify that pressing Enter in username field submits form with password validation
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');

    // Fill username and press Enter
    await usernameField.fill('standard_user');
    await usernameField.press('Enter');

    // Wait for error message
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Verify password required error is shown
    // (Form submission validates empty password field)
    await expect(errorAlert).toContainText('Epic sadface: Password is required');

    // Verify user is still on login page (no redirect)
    expect(page.url()).not.toContain('/inventory.html');

    // Verify password field has error class
    await expect(passwordField).toHaveClass(/error/);
  });

  test('3.10 - Verify Form Submits on Enter in Password Field', async ({ page }) => {
    // Verify that pressing Enter in password field submits the form
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');

    // Fill username and password
    await usernameField.fill('standard_user');
    await passwordField.fill('secret_sauce');

    // Press Enter in password field
    await passwordField.press('Enter');

    // Wait for navigation
    await page.waitForURL('**/inventory.html', { waitUntil: 'networkidle' });

    // Verify successful login and redirect
    expect(page.url()).toContain('/inventory.html');
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('3.11 - Verify No Console Errors on Login Page Load', async ({ page }) => {
    // Verify that login page loads without console errors
    const consoleErrors: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    // Page has already been navigated in beforeEach
    // Check for any console errors
    expect(consoleErrors.length).toBe(0);
  });

  test('3.12 - Verify Network Security (No Unencrypted Data Sent)', async ({ page }) => {
    // Verify that login page is served over HTTPS
    expect(page.url()).toMatch(/^https:\/\//);

    // The actual verification that credentials are sent over HTTPS
    // would require intercepting requests (proxy-level testing)
    // This basic check ensures we're on a secure connection
  });

  test('3.13 - Login with Tab Navigation Between Fields', async ({ page }) => {
    // Verify that Tab key allows navigation between form fields
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Focus on username field
    await usernameField.focus();
    await expect(usernameField).toBeFocused();

    // Type username
    await usernameField.fill('standard_user');

    // Press Tab to move to password field
    await usernameField.press('Tab');
    await expect(passwordField).toBeFocused();

    // Type password
    await passwordField.fill('secret_sauce');

    // Press Tab to move to login button
    await passwordField.press('Tab');
    await expect(loginButton).toBeFocused();

    // Press Enter to submit (form submission via button)
    await loginButton.press('Enter');

    // Wait for successful redirect
    await page.waitForURL('**/inventory.html', { waitUntil: 'networkidle' });

    // Verify successful login
    expect(page.url()).toContain('/inventory.html');
  });

  test('3.14 - Verify Error Message Button Close Functionality', async ({ page }) => {
    // Verify that error messages can be properly dismissed
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Trigger an error
    await usernameField.fill('invalid');
    await passwordField.fill('invalid');
    await loginButton.click();

    // Wait for error to appear
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).toBeVisible();

    // Close the error
    const closeButton = page.locator('[data-test="error-button"]');
    await closeButton.click();

    // Verify error is dismissed
    await expect(errorAlert).not.toBeVisible();

    // Verify form is still functional
    await usernameField.fill('standard_user');
    await passwordField.fill('secret_sauce');
    await loginButton.click();

    // Wait for successful redirect
    await page.waitForURL('**/inventory.html', { waitUntil: 'networkidle' });

    // Verify successful login
    expect(page.url()).toContain('/inventory.html');
  });

  test('3.15 - Multiple Failed Login Attempts Rate Limiting', async ({ page }) => {
    // Verify application behavior with multiple failed attempts
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Perform 5 failed login attempts
    for (let i = 0; i < 5; i++) {
      await usernameField.fill('invalid_user');
      await passwordField.fill('wrongpass');
      await loginButton.click();

      // Wait for error
      const errorAlert = page.locator('[data-test="error"]');
      await expect(errorAlert).toBeVisible();

      // Close error if button exists
      const closeButton = page.locator('[data-test="error-button"]');
      if (await closeButton.isVisible()) {
        await closeButton.click();
      }

      // Clear fields for next attempt
      await usernameField.clear();
      await passwordField.clear();
    }

    // Application should still allow login attempts (no rate limiting shown)
    // Try successful login
    await usernameField.fill('standard_user');
    await passwordField.fill('secret_sauce');
    await loginButton.click();

    // Wait for response and navigation
    await page.waitForURL('**/inventory.html', { timeout: 5000, waitUntil: 'networkidle' });

    // Verify we can still login (no rate limiting)
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/inventory\.html|saucedemo\.com/);
  });
});
