let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

// Задача 1
describe("Github team page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1", { timeout: 5000 });
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub · Build and ship software on a single, collaborative platform · GitHub"
    );
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 8000);

  test("The page contains 'Get started with Team' button", async () => {
    const btnSelector = "div.col-md-8 a.btn-mktg.btn-large-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
      timeout: 10000,
    });
    const buttonText = await page.$eval(btnSelector, (el) =>
      el.textContent.trim()
    );
    expect(buttonText).toContain("Get started with Team");
  }, 20000);
});

// Задача 2
describe("Github other pages tests", () => {
  test("GitHub Issues page title", async () => {
    await page.goto("https://github.com/features/issues");
    await page.waitForSelector("title", { timeout: 5000 });
    const title = await page.title();
    expect(title).toEqual(
      "GitHub Issues · Project planning for developers · GitHub"
    );
  }, 10000);

  test("GitHub for Startups page title", async () => {
    await page.goto("https://github.com/enterprise/startups");
    await page.waitForSelector("title", { timeout: 5000 });
    const title = await page.title();
    expect(title).toEqual(
      "GitHub for Startups: Build your startup on GitHub · GitHub"
    );
  }, 10000);

  test("GitHub Sponsors page title", async () => {
    await page.goto("https://github.com/sponsors");
    await page.waitForSelector("title", { timeout: 5000 });
    const title = await page.title();
    expect(title).toEqual("GitHub Sponsors · GitHub");
  }, 10000);
});
