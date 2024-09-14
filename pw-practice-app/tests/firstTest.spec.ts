import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
})

test('Locator Syntax rules', async ({ page }) => {
    // By Tag Name
    page.locator("input").first().click();

    // By ID
    await page.locator("#inputEmail1").click();

    // By Class name
    page.locator(".shape-rectangle");

    // By Attribute
    page.locator("[placeholder='Email']");

    // By Class value (full)
    page.locator("[class='input-full-width size-medium status-basic shape-rectangle nb-transition']");

    // Combine different selectors
    page.locator("input[placeholder='Email'][type='text']");

    // By XPath (not recommended)
    page.locator("//input[@placeholder='Email']");

    // By Partial text match
    page.locator(":text-is('Using')");

    // By Exact text match
    page.locator(":text-is('Using the Grid')");

});

test('User Facing Locators', async ({ page }) => {
    // Get By Role
    await page.getByRole("textbox", { name: "Email" }).first().click();
    await page.getByRole("button", { name: "Sign in" }).first().click();

    // Get By Label
    await page.getByLabel("Email").first().click();

    // Get By Placeholder
    await page.getByPlaceholder("Jane Doe").first().click();

    // Get By Text
    await page.getByText("Using the Grid").click();

    // Get By Title
    await page.getByTitle("IoT Dashboard").click();

    // Get By Test Id
    // await page.getByTestId("Email").first().click();
});

test('Locating Child Elements', async ({ page }) => {
    await page.locator("nb-card nb-radio :text-is('Option 1')").click();

    // Chaining locators
    await page.locator("nb-card").locator("nb-radio").locator(":text-is('Option 2')").click();

    await page.locator("nb-card").getByRole("button", { name: "Sign in" }).first().click();

    // Index of an element -- to be avoided
    await page.locator("nb-card").nth(3).getByRole("button").first().click();
});

test('Locating Parent Elements', async ({ page }) => {
    await page.locator("nb-card", { hasText: "Using the Grid" }).getByRole("textbox", { name: "Email" }).click();
    await page.locator("nb-card", { has: page.locator("#inputEmail1") }).getByRole("textbox", { name: "Email" }).click();

    // Filter
    await page.locator("nb-card").filter({ hasText: "Basic form" }).getByRole("textbox", { name: "Email" }).click();
    await page.locator("nb-card").filter({ has: page.locator(".status-danger") }).getByRole("textbox", { name: "Password" }).click();
    await page.locator("nb-card").filter({ has: page.locator('nb-checkbox') }).filter({ hasText: "Sign in" })
        .getByRole("textbox", { name: "Password" }).click();

    await page.locator(":text-is('Using the Grid')").locator('..').getByRole("textbox", { name: "Password" }).click();
});

test('Reusing locators', async ({ page }) => {
    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
    const emailField = basicForm.getByRole("textbox", { name: "Email" });
    const passwordField = basicForm.getByRole("textbox", { name: "Password" });
    await emailField.fill('test@test.com');
    await passwordField.fill('Welcome12345');
    await basicForm.getByRole("button").click();

    await basicForm.locator('nb-checkbox').click();

    // Assertion
    await expect(emailField).toHaveValue("test@test.com");
});

test('Extracting Values', async ({ page }) => {
    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
    const buttonText = await basicForm.getByRole("button").textContent();
    console.log(buttonText);
    // assertion
    expect(buttonText).toEqual("Submit");

    // All text content
    const allRadioButtonTexts = await page.locator('nb-radio').allTextContents();
    expect(allRadioButtonTexts).toContain("Option 1");

    // Find Input value
    const emailField = basicForm.getByRole("textbox", { name: "Email" });
    const passwordField = basicForm.getByRole("textbox", { name: "Password" });
    await emailField.fill('test@test.com');
    await passwordField.fill('Welcome12345');
    const emailFieldValue = await emailField.inputValue();
    expect(emailFieldValue).toEqual('test@test.com');

    const placeholderValue = await emailField.getAttribute("placeholder");
    expect(placeholderValue).toEqual("Email");
});

test('Using Assertions', async ({ page }) => {
    // General Assertions
    const value = 5;
    expect(value).toEqual(5);
    expect(value).toBeGreaterThan(3);
    const basicFormButton = page.locator("nb-card").filter({ hasText: "Basic form" }).locator('button');
    const buttonText = await basicFormButton.textContent();
    expect(buttonText).toEqual("Submit");

    // Locator Assertions
    await expect(basicFormButton).toHaveText('Submit');

    // Soft Assertions
    await expect.soft(basicFormButton).toHaveText('Submit');
    await basicFormButton.click();

});

