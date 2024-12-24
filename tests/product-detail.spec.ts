import { test, expect } from '@playwright/test';

test('product detail page is accessible and button text changes', async ({ page }) => {

    //sign in for user
    await page.goto('http://localhost:3000/login');
    const emailInput = page.getByPlaceholder('Nhập số điện thoại của bạn')
    await emailInput.fill('+84819190227').then(() => console.log("Email filled"));
    const passwordInput = page.getByPlaceholder('Nhập mật khẩu của bạn')
    await passwordInput.fill('123456').then(() => console.log("Password filled"));
    const submitButton = page.getByText("Tiếp tục với số điện thoại")


    await submitButton.click().then(() => {
        // expect(page.goto('http://localhost:3000'))
    });


    // Go to the product detail page
    await page.goto('http://localhost:3000/product-detail/8-4');
    const addButton = page.getByText("Thêm vào giỏ hàng");


    await addButton.click({timeout: 5000}).then(() => {
        setTimeout(async () => {
            console.log('add button clicked', addButton.innerText())
            await expect(addButton).toContainText("1")
        }, 3000)
    });


});