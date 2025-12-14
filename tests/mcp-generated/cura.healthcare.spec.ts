import { test, expect } from "@playwright/test";

test.describe("CURA Healthcare Appointment Booking", () => {
  const BASE_URL = "https://katalon-demo-cura.herokuapp.com/";
  const HOME_URL = "https://katalon-demo-cura.herokuapp.com/";
  const LOGIN_URL = "https://katalon-demo-cura.herokuapp.com/profile.php#login";
  const APPOINTMENT_PAGE_URL = "https://katalon-demo-cura.herokuapp.com/#appointment";
  const APPOINTMENT_SUMMARY_URL = "https://katalon-demo-cura.herokuapp.com/appointment.php#summary";

  let selectedFacility: string;
  let selectedHealthcareProgram: string;
  const visitDate = "25/12/2025";
  const commentText = "This is a test appointment booking for healthcare services.";

  test("Complete appointment booking flow", async ({ page }) => {
    // Step 1: Navigate to home page and assert URL
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(HOME_URL);
    console.log("✓ Step 1: Successfully navigated to home page");

    // Step 2: Click Make Appointment button
    await page.getByRole('link', { name: 'Make Appointment' }).click();

    // Assert URL changed to login page and Login text is visible
    await expect(page).toHaveURL(LOGIN_URL);
    await expect(page.getByText('Please login to make')).toBeVisible();
    console.log("✓ Step 2: Successfully navigated to login page");

    // Step 3: Enter username
    await page.getByLabel('Username').fill("John Doe");
    console.log("✓ Step 3: Entered username 'John Doe'");

    // Step 4: Enter password
    await page.getByLabel('Password').fill("ThisIsNotAPassword");
    console.log("✓ Step 4: Entered password");

    // Step 5: Click Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Step 6: Assert appointment page loaded
    await expect(page).toHaveURL(APPOINTMENT_PAGE_URL);
    await expect(page.locator('h2')).toContainText('Make Appointment');
    console.log("✓ Step 6: Successfully logged in and on appointment page");

    // Step 7: Select facility dropdown and store value
    const facilityDropdown = page.getByLabel('Facility');
    const facilityOptions = await facilityDropdown.locator("option").all();
    
    // Select the second option (first non-default option)
    if (facilityOptions.length > 1) {
      selectedFacility = await facilityOptions[1].textContent();
      selectedFacility = selectedFacility?.trim() || "";
      const facilityValue = await facilityOptions[1].getAttribute("value");
      await facilityDropdown.selectOption(facilityValue || "");
      console.log(`✓ Step 7: Selected facility: ${selectedFacility}`);
    }

    // Step 8: Check hospital readmission checkbox
    await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
    console.log("✓ Step 8: Checked hospital readmission checkbox");

    // Step 9: Select healthcare program radio button and store value
    const programRadios = await page.getByRole('radio').all();
    
    if (programRadios.length > 0) {
      // Select the first radio button
      await programRadios[0].check();
      const radioLabel = await programRadios[0].getAttribute('aria-label');
      selectedHealthcareProgram = radioLabel || "";
      console.log(`✓ Step 9: Selected healthcare program: ${selectedHealthcareProgram}`);
    }

    // Step 10: Paste date into Visit Date field
    const visitDateField = page.getByRole('textbox', { name: 'Visit Date (Required)' });
    await visitDateField.click();
    // Type the date character by character to ensure it's pasted correctly
    for (const char of visitDate) {
      await page.keyboard.press(char);
    }
    // Press Enter to confirm the date
    await page.keyboard.press('Enter');
    console.log("✓ Step 10: Entered visit date: " + visitDate);

    // Step 11: Enter comment
    await page.getByRole('textbox', { name: 'Comment' }).fill(commentText);
    console.log("✓ Step 11: Entered comment in text area");

    // Step 12: Click Book Appointment button
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    console.log("✓ Step 12: Clicked Book Appointment button");

    // Step 13: Assert appointment confirmation page and validate summary
    // Wait for the page to navigate to the summary URL
    await page.waitForURL(APPOINTMENT_SUMMARY_URL, { timeout: 10000 });
    await expect(page).toHaveURL(APPOINTMENT_SUMMARY_URL);
    await expect(page.getByRole('heading', { name: 'Appointment Confirmation' })).toBeVisible();
    console.log("✓ Step 13: Confirmation page loaded with header visible");

    // Validate facility in summary
    if (selectedFacility) {
      await expect(page.locator('#facility')).toContainText(selectedFacility);
      console.log(`✓ Verified facility matches: ${selectedFacility}`);
    }

    // Validate hospital readmission status
    await expect(page.locator('#hospital_readmission')).toContainText('Yes');
    console.log("✓ Verified hospital readmission is checked");

    // Validate healthcare program
    if (selectedHealthcareProgram) {
      await expect(page.locator('#program')).toContainText(selectedHealthcareProgram);
      console.log(`✓ Verified healthcare program matches: ${selectedHealthcareProgram}`);
    }

    // Validate visit date
    await expect(page.locator('#visit_date')).toContainText(visitDate);
    console.log("✓ Verified visit date matches: " + visitDate);

    // Validate comment
    await expect(page.locator('#comment')).toContainText(commentText);
    console.log("✓ Verified comment matches entered text");

    console.log("\n✅ All steps completed successfully!");
  });
});
