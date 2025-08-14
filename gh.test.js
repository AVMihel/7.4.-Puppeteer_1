let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
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
