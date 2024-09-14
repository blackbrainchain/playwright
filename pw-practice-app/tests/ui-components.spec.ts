import { expect, test } from '@playwright/test';
import { Value } from 'sass';

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
});

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('Input texts', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card').filter({ hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" });
        await usingTheGridEmailInput.fill('test@test.com');
        await usingTheGridEmailInput.clear();

        //await usingTheGridEmailInput.pressSequentially('test@test.com'); // mimic keystroke

        await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 500 }); // mimic keystroke with delay

        // generic assertion -- without await
        const inputValue = await usingTheGridEmailInput.inputValue();
        expect(inputValue).toEqual('test2@test.com');

        // locator assertion -- with await
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com');
    });

    test('Radio Buttons', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card').filter({ hasText: "Using the Grid" });
        await usingTheGridEmailInput.getByLabel('Option 1').check({ force: true });
        await usingTheGridEmailInput.getByRole('radio', { name: 'Option 1' }).check({ force: true });
        const radioStatus = await usingTheGridEmailInput.getByLabel('Option 1').isChecked();
        expect(radioStatus).toBeTruthy();
        await expect(usingTheGridEmailInput.getByLabel('Option 1')).toBeChecked();

        await usingTheGridEmailInput.getByLabel('Option 2').check({ force: true });
        expect(await usingTheGridEmailInput.getByLabel('Option 1').isChecked()).toBeFalsy();
        expect(await usingTheGridEmailInput.getByLabel('Option 2').isChecked()).toBeTruthy();
    });
});

test('Checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();
    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true });
    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true });

    const allCheckboxes = page.getByRole('checkbox');

    for (const checkbox of await allCheckboxes.all()) {
        // await checkbox.check({ force: true });
        // expect(await checkbox.isChecked()).toBeTruthy();
        await checkbox.uncheck({ force: true });
        expect(await checkbox.isChecked()).toBeFalsy();
    }
});

test('Lists and Dropdowns', async ({ page }) => {
    const dropdownMenu = page.locator('ngx-header nb-select');
    await dropdownMenu.click();

    //const options = page.locator('list').locator('nb-option');

    const options = page.locator('nb-option-list nb-option');
    await expect(options).toHaveCount(4);
    await expect(options.first()).toHaveText('Light');
    await options.filter({ hasText: 'Cosmic' }).click();

    const header = page.locator('nb-layout-header');
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    };

    await dropdownMenu.click();
    for (const color in colors) {
        await options.filter({ hasText: color }).click();
        await expect(header).toHaveCSS('background-color', colors[color]);

        if (color != 'Corporate')
            await dropdownMenu.click();
    }
});

