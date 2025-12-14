# Sauce Demo - Login Test Plan

## Application Overview

Swag Labs (SauceDemo) is a demo e-commerce web application designed for testing and learning purposes. The application provides a login mechanism with multiple user accounts that demonstrate different testing scenarios.

### Key Features:
- **User Authentication**: Login system with multiple test accounts
- **Role-Based Access**: Different user types with varying behaviors
- **Error Messaging**: Clear, user-friendly error messages for validation failures
- **Session Management**: Authentication state persistence

### Available Test Users:
- `standard_user` - Normal user with full functionality
- `locked_out_user` - User account that is locked
- `problem_user` - User with display issues
- `performance_glitch_user` - User with performance issues
- `error_user` - User that triggers error responses
- `visual_user` - User with visual glitches

### Default Password:
All users use the same password: `secret_sauce`

---

## Test Scenarios

### 1. Positive Test Cases

#### 1.1 Successful Login with Valid Credentials
**Seed:** `tests/seed.spec.ts`

**Objective:** Verify that a user can successfully log in with valid username and password.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Verify the login page is displayed with Username and Password input fields
3. Enter `standard_user` in the Username field
4. Enter `secret_sauce` in the Password field
5. Click the "Login" button
6. Wait for page to load

**Expected Results:**
- User is successfully authenticated
- Browser redirects to the inventory page (`/inventory.html`)
- Page title remains "Swag Labs"
- Product list is displayed with items available for purchase
- Navigation menu and shopping cart icon are visible
- No error messages are displayed

**Success Criteria:**
- Successful redirection to inventory page
- Products are loaded and displayed
- User session is active

---

### 2. Negative Test Cases

#### 2.1 Login with Empty Username and Empty Password
**Seed:** `tests/seed.spec.ts`

**Objective:** Verify that the application requires both username and password fields to be filled.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Verify the login page is displayed
3. Leave the Username field empty
4. Leave the Password field empty
5. Click the "Login" button

**Expected Results:**
- Login fails
- An error message is displayed: **"Epic sadface: Username is required"**
- Error message is displayed as a red banner/alert box
- Username field is highlighted (visual indicator)
- User remains on the login page
- No redirect occurs

**Success Criteria:**
- Appropriate error message for missing username is shown
- User is prevented from logging in with empty credentials
- Form is not submitted

---

#### 2.2 Login with Valid Username but Empty Password
**Seed:** `tests/seed.spec.ts`

**Objective:** Verify that the password field is mandatory for login.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Verify the login page is displayed
3. Enter `standard_user` in the Username field
4. Leave the Password field empty
5. Click the "Login" button

**Expected Results:**
- Login fails
- An error message is displayed: **"Epic sadface: Password is required"**
- Error message is displayed as a red banner/alert box
- Password field is highlighted (visual indicator)
- User remains on the login page
- No redirect occurs
- Username field retains the entered value

**Success Criteria:**
- Password field validation is enforced
- Appropriate error message is displayed
- Form validation prevents submission with empty password

---

#### 2.3 Login with Invalid Username and Invalid Password
**Seed:** `tests/seed.spec.ts`

**Objective:** Verify that the application rejects invalid credentials with an appropriate error message.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Verify the login page is displayed
3. Enter `invalid_user` in the Username field
4. Enter `wrongpassword` in the Password field
5. Click the "Login" button
6. Wait for response from authentication server

**Expected Results:**
- Login fails
- An error message is displayed: **"Epic sadface: Username and password do not match any user in this service"**
- Error message is displayed as a red banner/alert box
- Both Username and Password fields are highlighted (visual indicator)
- User remains on the login page
- No redirect occurs
- User credentials are not stored or logged

**Success Criteria:**
- Generic error message is displayed (does not reveal whether username or password is incorrect)
- Security best practice: No information disclosure about valid usernames
- Form prevents submission with invalid credentials

---

#### 2.4 Login with Valid Username but Invalid Password
**Seed:** `tests/seed.spec.ts`

**Objective:** Verify that the application rejects login attempts with a valid username but incorrect password.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Verify the login page is displayed
3. Enter `standard_user` in the Username field
4. Enter `wrongpassword` in the Password field (not the correct `secret_sauce`)
5. Click the "Login" button
6. Wait for response from authentication server

**Expected Results:**
- Login fails
- An error message is displayed: **"Epic sadface: Username and password do not match any user in this service"**
- Error message is displayed as a red banner/alert box
- Both Username and Password fields are highlighted (visual indicator)
- User remains on the login page
- No redirect occurs
- Generic error message is used (does not confirm the username is valid)

**Success Criteria:**
- Authentication fails with invalid password
- Generic error message protects user privacy
- Form prevents access with incorrect password

---

#### 2.5 Login with Locked Out User Account
**Seed:** `tests/seed.spec.ts`

**Objective:** Verify that users with locked-out accounts receive an appropriate error message and cannot access the application.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Verify the login page is displayed
3. Enter `locked_out_user` in the Username field
4. Enter `secret_sauce` in the Password field (correct password for this account)
5. Click the "Login" button
6. Wait for response from authentication server

**Expected Results:**
- Login fails even with correct credentials
- An error message is displayed: **"Epic sadface: Sorry, this user has been locked out."**
- Error message is displayed as a red banner/alert box
- Username and Password fields are highlighted (visual indicator)
- User remains on the login page
- No redirect occurs
- Error message is specific to account lockout (not generic credential error)

**Success Criteria:**
- Locked-out user cannot access the application
- Specific error message indicates account lockout
- Security measure is enforced preventing unauthorized access to locked accounts

---

#### 2.6 Login with Invalid Username and Valid Password
**Seed:** `tests/seed.spec.ts`

**Objective:** Verify that the application rejects login attempts with a non-existent username even when the password format is valid.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Verify the login page is displayed
3. Enter `nonexistent_user` in the Username field
4. Enter `secret_sauce` in the Password field (the valid password)
5. Click the "Login" button
6. Wait for response from authentication server

**Expected Results:**
- Login fails
- An error message is displayed: **"Epic sadface: Username and password do not match any user in this service"**
- Error message is displayed as a red banner/alert box
- Both Username and Password fields are highlighted (visual indicator)
- User remains on the login page
- No redirect occurs
- Generic error message does not reveal that the username doesn't exist

**Success Criteria:**
- Non-existent username is rejected
- Generic error message prevents username enumeration attacks
- Form prevents access with invalid username

---

#### 2.7 Close Error Message and Retry Login
**Seed:** `tests/seed.spec.ts`

**Objective:** Verify that users can dismiss error messages and retry login with different credentials.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Verify the login page is displayed
3. Enter `invalid_user` in the Username field
4. Enter `wrongpass` in the Password field
5. Click the "Login" button
6. Wait for error message to appear
7. Verify error message: "Epic sadface: Username and password do not match any user in this service"
8. Click the close button (X icon) on the error message
9. Verify the error message is dismissed
10. Clear the Username field and enter `standard_user`
11. Clear the Password field and enter `secret_sauce`
12. Click the "Login" button

**Expected Results:**
- Error message appears with close button (X icon)
- Clicking close button removes the error message from display
- Form fields retain their values after closing error message
- User can retry login with corrected credentials
- Second login attempt succeeds and redirects to inventory page

**Success Criteria:**
- Error message can be dismissed by user
- User experience is not blocked by persistent error messages
- Users can correct their input and retry

---

## Edge Cases and Boundary Conditions

#### 2.8 Login with SQL Injection Attempt
**Seed:** `tests/seed.spec.ts`

**Objective:** Verify that the application is protected against SQL injection attacks through the login form.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Verify the login page is displayed
3. Enter `' OR '1'='1` in the Username field
4. Enter `' OR '1'='1` in the Password field
5. Click the "Login" button

**Expected Results:**
- Login fails
- An error message is displayed: **"Epic sadface: Username and password do not match any user in this service"**
- No access is granted to the system
- Malicious input is safely handled
- Application does not display database errors

**Success Criteria:**
- SQL injection attempt is prevented
- Application handles special characters safely
- No sensitive information is disclosed

---

#### 2.9 Login with Special Characters in Credentials
**Seed:** `tests/seed.spec.ts`

**Objective:** Verify that the application properly handles and rejects special characters in login fields.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Verify the login page is displayed
3. Enter `<script>alert('xss')</script>` in the Username field
4. Enter `"><script>alert('test')</script>` in the Password field
5. Click the "Login" button

**Expected Results:**
- Login fails
- An error message is displayed: **"Epic sadface: Username and password do not match any user in this service"**
- No script execution occurs
- XSS attack is prevented
- Application remains stable

**Success Criteria:**
- Special characters are safely escaped
- No code injection vulnerabilities exist
- Application handles malicious input gracefully

---

#### 2.10 Case Sensitivity Test for Username
**Seed:** `tests/seed.spec.ts`

**Objective:** Verify the case sensitivity behavior of the username field during login.

**Steps:**
1. Navigate to `https://www.saucedemo.com/`
2. Verify the login page is displayed
3. Enter `STANDARD_USER` (uppercase) in the Username field
4. Enter `secret_sauce` in the Password field
5. Click the "Login" button

**Expected Results:**
- Login fails (if username is case-sensitive)
- OR Login succeeds (if username is case-insensitive)
- An error message appears OR redirect to inventory occurs
- Behavior is consistent and documented

**Success Criteria:**
- Username case sensitivity behavior is clearly defined
- Application behaves consistently with its design
- Documentation matches actual behavior

---

## Test Execution Notes

### Assumptions:
- All tests assume a fresh browser session with cleared cache
- Network connectivity is available to `www.saucedemo.com`
- JavaScript is enabled in the browser
- The application is running and accessible

### Preconditions:
- User is on a computer with internet access
- Browser is in a clean state (no pre-filled login data)
- Application is loaded from the official Sauce Labs demo site

### Cleanup:
- No cleanup required for login tests
- Each test scenario starts with a fresh page load
- Browser cookies are cleared between test sessions if needed

---

## Error Messages Summary

| Scenario | Error Message |
|----------|---------------|
| No username, no password | Epic sadface: Username is required |
| Valid username, no password | Epic sadface: Password is required |
| No username, any password | Epic sadface: Username is required |
| Invalid username/password combination | Epic sadface: Username and password do not match any user in this service |
| Locked-out user with correct password | Epic sadface: Sorry, this user has been locked out. |
| Valid credentials | No error - Redirect to inventory.html |

---

## Success Criteria Summary

### For Positive Tests:
- ✅ User successfully redirects to inventory page
- ✅ Browser URL changes to `/inventory.html`
- ✅ Products are loaded and displayed
- ✅ No error messages appear

### For Negative Tests:
- ✅ User remains on login page
- ✅ Appropriate error message is displayed
- ✅ Error message is visible and readable
- ✅ No redirect to protected pages occurs
- ✅ User can dismiss error and retry

---

## Test Data Reference

### Valid Test Accounts:
```
Username: standard_user
Password: secret_sauce
(Provides full access to all features)

Username: locked_out_user  
Password: secret_sauce
(Account is locked, demonstrates locked account error handling)
```

### Invalid Test Data:
```
Username: invalid_user
Password: wrongpassword
(Generic "do not match" error)

Username: (empty)
Password: (empty)
(Username required error)

Username: standard_user
Password: (empty)
(Password required error)
```
