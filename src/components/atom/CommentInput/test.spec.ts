import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  const emailInput = page.getByPlaceholder("Nhập số điện thoại của bạn");
  await emailInput.fill("+84819190227");
  const passwordInput = page.getByPlaceholder("Nhập mật khẩu của bạn");
  await passwordInput.fill("123456");
  const submitButton = page.getByText("Tiếp tục với số điện thoại");
  await submitButton.click();
  setTimeout(async () => {}, 2000);
});

test("product detail page is accessible and button text changes", async ({
  page,
}) => {
  setTimeout(async () => {}, 1000);
  await page.goto("http://localhost:3000/product-detail/8-4");
  const addButton = page.getByText("Thêm vào giỏ hàng");
  await addButton.click();
  setTimeout(async () => {
    await expect(addButton)?.toContainText("1");
  }, 2000);
});
