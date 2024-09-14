import { expect, test } from '@playwright/test';
// import { timeout } from 'rxjs-compat/operator/timeout';

// test.beforeEach(async ({ page }, testInfo) => {
//     await page.goto("http://uitestingplayground.com/ajax/");
//     await page.getByText("Button Triggering AJAX Request").click();
//     testInfo.setTimeout(testInfo.timeout + 2000); // Add 2 Seconds to the default timeout
// });

test.beforeEach(async ({ page }) => {
    await page.goto("http://uitestingplayground.com/ajax/");
    await page.getByText("Button Triggering AJAX Request").click();
});

test("Auto Waiting", async ({ page }) => {
    const successButton = page.locator(".bg-success");
    expect(successButton).toHaveText("Data loaded with AJAX get request.", { timeout: 20000 });
    await successButton.waitFor({ state: "attached" });
    const text = await successButton.allTextContents();
    successButton.click();

    expect(text).toContain("Data loaded with AJAX get request.");
});

test("Alternative Wait", async ({ page }) => {
    const successButton = page.locator(".bg-success");

    //-- Wait for element
    // await page.waitForSelector(".bg-success");

    // -- Wait for particular response
    // await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

    // -- Wait for network call to be completed ( NOT RECOMMENDED )
    await page.waitForLoadState("networkidle");

    const text = await successButton.allTextContents();
    expect(text).toContain("Data loaded with AJAX get request.");
});

test("Timeouts", async ({ page }) => {
    // test.setTimeout(10000);
    test.slow();
    const successButton = page.locator(".bg-success");
    // await successButton.click({ timeout: 16000 });
    await successButton.click();
});


