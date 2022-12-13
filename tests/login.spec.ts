import { expect, test } from "./baseFixtures";

const pass = process.env.NEXT_PUBLIC_TESTUSER_PASS as string;

type Sources = {
	source: string;
};

test.beforeEach(async ({ page }) => {
	await page.goto("https://szmydlo.github.io/tallies/");
	// await page.goto("http://localhost:3000/");
});

test.describe("Login", () => {
	test("Should open modal and login", async ({ page }) => {
		await page.click("text=Log in");

		await page.fill('input[type="email"]', "playwright@test.com");
		await page.fill('input[type="password"]', pass);

		await page.click("#overlays >> text=Login");

		await expect(page).toHaveURL(/.*overview/);
	});
});
