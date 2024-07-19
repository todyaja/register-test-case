import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Registration Page", () => {
  test("should have melaka title", async ({ page }) => {
    await page.goto("https://dashboard.melaka.app/register");

    console.log("arrived at the page succesfully!");

    await expect(
      page.getByRole("heading", { name: "Selamat Datang di Melaka" })
    ).toBeVisible();
  });

  test("all field should be visible", async ({ page }) => {
    await page.goto("https://dashboard.melaka.app/register");

    console.log("arrived at the page succesfully!");

    await expect(page.getByTestId("register__text-field__name")).toBeVisible();

    await expect(
      page.getByTestId("register__text-field__phone-number")
    ).toBeVisible();

    await expect(
      page.getByTestId("register__text-field__business-name")
    ).toBeVisible();

    await expect(
      page.getByTestId("register__radio-button__distributor")
    ).toBeVisible();
    await expect(
      page.getByTestId("register__radio-button__toko-retail")
    ).toBeVisible();
    await expect(
      page.getByTestId("register__radio-button__brand")
    ).toBeVisible();
    await expect(
      page.getByTestId("register__radio-button__penjual-online")
    ).toBeVisible();

    await expect(page.getByTestId("register__text-field__email")).toBeVisible();

    await expect(
      page.getByTestId("register__text-field__password")
    ).toBeVisible();

    await expect(
      page.getByTestId("register__text-field__confirm-password")
    ).toBeVisible();

    await expect(page.getByTestId("register__checkbox__tnc")).toBeVisible();
  });

  test("button should be disabled if t&c is not checked", async ({ page }) => {
    await page.goto("https://dashboard.melaka.app/register");

    console.log("arrived at the page succesfully!");

    await expect(page.getByTestId("register__checkbox__tnc")).not.toBeChecked();

    await expect(page.getByTestId("register__button__sign-up")).toBeDisabled();
  });

  test("button should be enabled if t&c is checked", async ({ page }) => {
    await page.goto("https://dashboard.melaka.app/register");

    console.log("arrived at the page succesfully!");

    await page.getByTestId("register__checkbox__tnc").click();

    await expect(page.getByTestId("register__button__sign-up")).toBeEnabled();
  });

  test("required fields should show error messages if left empty", async ({
    page,
  }) => {
    await page.goto("https://dashboard.melaka.app/register");

    await page.getByTestId("register__checkbox__tnc").click();
    await page.getByTestId("register__button__sign-up").click();

    await expect(
      page.getByTestId("register__text-field__name__error")
    ).toContainText("Wajib diisi");

    await expect(
      page.getByTestId("register__text-field__phone-number__error")
    ).toContainText("Wajib diisi");

    await expect(
      page.getByTestId("register__text-field__business-name__error")
    ).toContainText("Wajib diisi");

    await expect(
      page.getByTestId("register__text-field__email__error")
    ).toContainText("Wajib diisi");

    await expect(
      page.getByTestId("register__text-field__password__error")
    ).toContainText("Wajib diisi");

    await expect(
      page.getByTestId("register__text-field__confirm-password__error")
    ).toContainText("Wajib diisi");
  });

  test("name should show error if under 5 character", async ({ page }) => {
    await page.goto("https://dashboard.melaka.app/register");

    await page.fill(
      'input[data-testid="register__text-field__name"]',
      faker.lorem.word({
        length: {
          min: 0,
          max: 4,
        },
      })
    );

    await expect(
      page.getByTestId("register__text-field__name__error")
    ).toContainText("Wajib diisi");
  });

  test("phone number should show error if under 10 character", async ({
    page,
  }) => {
    await page.goto("https://dashboard.melaka.app/register");

    await page.fill(
      'input[data-testid="register__text-field__phone-number"]',
      "123"
    );

    await expect(
      page.getByTestId("register__text-field__phone-number__error")
    ).toContainText("Wajib diisi");
  });

  test("bussiness name should show error if under 5 character", async ({
    page,
  }) => {
    await page.goto("https://dashboard.melaka.app/register");

    await page.fill(
      'input[data-testid="register__text-field__business-name"]',
      faker.lorem.word({
        length: {
          min: 0,
          max: 4,
        },
      })
    );

    await expect(
      page.getByTestId("register__text-field__business-name__error")
    ).toContainText("Wajib diisi");
  });

  test("email should show error if not valid", async ({ page }) => {
    await page.goto("https://dashboard.melaka.app/register");

    await page.fill(
      'input[data-testid="register__text-field__email"]',
      faker.internet.email().split("@")[0]
    );

    await expect(
      page.getByTestId("register__text-field__email__error")
    ).toContainText("Wajib diisi");
  });

  test("password should show error if under 8 character", async ({ page }) => {
    await page.goto("https://dashboard.melaka.app/register");

    await page.fill(
      'input[data-testid="register__text-field__password"]',
      "pa123"
    );

    await expect(
      page.getByTestId("register__text-field__password__error")
    ).toContainText("Min. 8 karakter, harus kombinasi dari huruf dan angka.");
  });

  test("password should show error if no numbers", async ({ page }) => {
    await page.goto("https://dashboard.melaka.app/register");

    await page.fill(
      'input[data-testid="register__text-field__password"]',
      "longpassword"
    );

    await expect(
      page.getByTestId("register__text-field__password__error")
    ).toContainText("Min. 8 karakter, harus kombinasi dari huruf dan angka.");
  });

  test(`confirm_password_should_show_error_if_not_the_same_as_password`, async ({
    page,
  }) => {
    await page.goto("https://dashboard.melaka.app/register");

    const password = "password123";

    await page.fill(
      'input[data-testid="register__text-field__password"]',
      password
    );

    await page.fill(
      'input[data-testid="register__text-field__confirm-password"]',
      password + "notSame"
    );

    await page.click(
      'input[data-testid="register__radio-button__toko-retail"]'
    );

    await expect(
      page.getByTestId("register__text-field__confirm-password__error")
    ).toContainText("Belum sesuai dengan kata sandi.");
  });

  test("should be able to register", async ({ page }) => {
    await page.context().clearCookies();
    await page.context().clearPermissions();
    await page.goto("https://dashboard.melaka.app/register");

    await page.fill(
      'input[data-testid="register__text-field__name"]',
      faker.lorem.word({
        length: {
          min: 5,
          max: 10,
        },
      })
    );

    await page.fill(
      'input[data-testid="register__text-field__phone-number"]',
      "85648646546"
    );

    await page.fill(
      'input[data-testid="register__text-field__business-name"]',
      faker.lorem.word({
        length: {
          min: 5,
          max: 10,
        },
      })
    );

    await page.click(
      'input[data-testid="register__radio-button__toko-retail"]'
    );

    await page.fill(
      'input[data-testid="register__text-field__email"]',
      faker.internet.email()
    );

    await page.fill(
      'input[data-testid="register__text-field__password"]',
      "password123"
    );

    await page.fill(
      'input[data-testid="register__text-field__confirm-password"]',
      "password123"
    );

    await page.getByTestId("register__checkbox__tnc").click();
    await Promise.all([
      page.getByTestId("register__button__sign-up").click(),
      page.waitForURL("https://dashboard.melaka.app/account-activation"),
    ]);

    await expect(
      page.getByRole("heading", { name: "Aktivasi Akun" })
    ).toBeVisible();
  });
});
