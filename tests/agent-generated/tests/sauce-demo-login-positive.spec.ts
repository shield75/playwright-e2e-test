/**
 * Sauce Demo - Login Positive Test Cases
 * Test Plan: tests/agent-generated/test-plan/sauce-demo-login-test-plan.md
 * Purpose: Verify successful login scenarios with valid credentials
 */

import { test, expect } from '@playwright/test';

test.describe('Sauce Demo - Positive Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Sauce Demo login page
    await page.goto('https://www.saucedemo.com/');
  });

  test('1.1 - Successful Login with Valid Credentials (standard_user)', async ({ page }) => {
    // Verify the login page is displayed with Username and Password input fields
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(loginButton).toBeVisible();

    // Enter valid credentials
    await usernameField.fill('standard_user');
    await passwordField.fill('secret_sauce');

    // Click the Login button
    await loginButton.click();

    // Wait for page to load and verify redirection
    await page.waitForURL('**/inventory.html', { waitUntil: 'networkidle' });

    // User is successfully authenticated and redirected to inventory page
    expect(page.url()).toContain('/inventory.html');

    // Verify page title remains "Swag Labs"
    await expect(page).toHaveTitle('Swag Labs');

    // Verify product list is displayed with items available for purchase
    const productContainer = page.locator('.inventory_container');
    await expect(productContainer).toBeVisible();

    const inventoryItems = page.locator('.inventory_item');
    const itemCount = await inventoryItems.count();
    expect(itemCount).toBeGreaterThan(0);

    // Verify navigation menu and shopping cart icon are visible
    const appLogo = page.locator('.app_logo');
    const shoppingCart = page.locator('[data-test="shopping-cart-link"]');
    await expect(appLogo).toBeVisible();
    await expect(shoppingCart).toBeVisible();

    // Verify no error messages are displayed
    const errorAlert = page.locator('[data-test="error"]');
    await expect(errorAlert).not.toBeVisible();
  });

  test('1.2 - Successful Login with problem_user', async ({ page }) => {
    // Verify login with problem_user account (has display issues but can login)
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    await expect(usernameField).toBeVisible();

    // Enter problem_user credentials
    await usernameField.fill('problem_user');
    await passwordField.fill('secret_sauce');

    // Click the Login button
    await loginButton.click();

    // Wait for page to load
    await page.waitForURL('**/inventory.html', { waitUntil: 'networkidle' });

    // Verify successful redirection despite display issues
    expect(page.url()).toContain('/inventory.html');
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('1.3 - Successful Login with performance_glitch_user', async ({ page }) => {
    // Verify login with performance_glitch_user account
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    await expect(usernameField).toBeVisible();

    // Enter performance_glitch_user credentials
    await usernameField.fill('performance_glitch_user');
    await passwordField.fill('secret_sauce');

    // Click the Login button
    await loginButton.click();

    // Wait for page to load (may take longer due to performance issues)
    await page.waitForURL('**/inventory.html', { timeout: 30000, waitUntil: 'networkidle' });

    // Verify successful redirection
    expect(page.url()).toContain('/inventory.html');
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('1.4 - Verify Session is Active After Login', async ({ page }) => {
    // Verify that user session is properly established
    const usernameField = page.locator('input[name="user-name"]');
    const passwordField = page.locator('input[name="password"]');
    const loginButton = page.locator('input[type="submit"]');

    // Perform login
    await usernameField.fill('standard_user');
    await passwordField.fill('secret_sauce');
    await loginButton.click();

    // Wait for navigation
    await page.waitForURL('**/inventory.html', { waitUntil: 'networkidle' });

    // Verify user stays on inventory page after refresh (session is active)
    await page.reload();

    // After reload, should still be on inventory page (session maintained)
    expect(page.url()).toContain('/inventory.html');

    // Verify products are still visible
    const inventoryItems = page.locator('.inventory_item');
    const itemCount = await inventoryItems.count();
    expect(itemCount).toBeGreaterThan(0);
  });
});
