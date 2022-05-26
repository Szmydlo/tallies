import { test, expect } from "@playwright/test";

const pass = process.env.NEXT_PUBLIC_TESTUSER_PASS as string;

test.beforeEach(async ({ page }) => {
	await page.goto("https://tallies-app.herokuapp.com/");
});

test.describe("Login", () => {
	test("Should open modal and login", async ({ page }) => {
		// Create 1st todo.
		await page.click("text=Login");

		await page.fill('input[type="email"]', "playwright@test.com");
		await page.fill('input[type="password"]', pass);

		await page.click("#overlays >> text=Login");

		await expect(page).toHaveURL(/.*overview/);
	});
});
