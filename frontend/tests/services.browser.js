// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Playwright MCP expects a callable function expression.
async (page) => {
  const baseUrl = new URL(page.url()).origin;
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const results = [];
  const titles = ["PPF Kaplama", "Seramik Kaplama", "Detailing"];
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const [width, height] of [[1440, 1000], [1280, 900], [768, 1024], [390, 844], [375, 812]]) {
    await page.setViewportSize({ width, height });
    const response = await page.goto(`${baseUrl}/hizmetler`);
    assert(response.status() === 200, "Services route must return HTTP 200");
    assert(await page.locator("h1").allTextContents().then((items) => items.length === 1 && items[0] === "Hizmetler"), "Services H1");
    assert(JSON.stringify(await page.locator(".catalog-copy h2").allTextContents()) === JSON.stringify(titles), "Three service headings");
    assert(await page.locator('meta[name="robots"]').getAttribute("content") === "noindex, nofollow", "Global noindex must remain");
    assert(await page.locator('meta[name="description"]').getAttribute("content") === "PPF kaplama, seramik kaplama ve iç/dış araç bakımı uygulamalarını inceleyin.", "Services meta description");
    assert(await page.locator('a[href^="/hizmetler/"]').count() === 0, "No links to unbuilt detail routes");
    for (const image of await page.locator(".catalog-media img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((el) => el.decode());
    }
    assert(await page.evaluate(() => {
      const entries = [...document.querySelectorAll(".catalog-entry")];
      return document.documentElement.scrollWidth <= document.documentElement.clientWidth && entries.length === 3 &&
        entries.every((entry) => {
          const image = entry.querySelector("img");
          return image.naturalWidth > 0 && image.alt && image.sizes && image.srcset && image.loading === "lazy";
        });
    }), `Images and overflow at ${width}px`);
    results.push({ width, height, route: true, images: 3, overflow: false });
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/`);
  const preview = await page.locator(".service-copy").allTextContents();
  assert(preview.length === 3, "Homepage retains three services");
  await page.locator(".desktop-nav").getByRole("link", { name: "Hizmetleri İncele", exact: true }).click();
  await page.waitForURL("**/hizmetler");
  assert(await page.locator('.desktop-nav a[aria-current="page"]').textContent() === "Hizmetleri İncele", "Services navigation must be active");
  await page.goto(`${baseUrl}/`);
  await page.getByRole("link", { name: "Tüm Hizmetler", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page.waitForURL("**/hizmetler");
  await page.locator(".desktop-nav").getByRole("link", { name: "Galeri", exact: true }).click();
  await page.waitForURL("**/galeri");
  assert(await page.locator(".gallery-tile").count() === 8, "Gallery retains eight photos");
  await page.locator(".desktop-nav").getByRole("link", { name: "Hizmetleri İncele", exact: true }).click();
  await page.waitForURL("**/hizmetler");

  await page.setViewportSize({ width: 375, height: 812 });
  await page.locator("summary").focus();
  await page.keyboard.press("Enter");
  assert(await page.locator('#mobile-navigation a[aria-current="page"]').textContent() === "Hizmetleri İncele", "Mobile services active state");
  await page.locator("#mobile-navigation").getByRole("link", { name: "Galeri", exact: true }).click();
  await page.waitForURL("**/galeri");
  await page.locator("summary").focus();
  await page.keyboard.press("Space");
  await page.locator("#mobile-navigation").getByRole("link", { name: "Hizmetleri İncele", exact: true }).click();
  await page.waitForURL("**/hizmetler");
  assert(await page.locator(".mobile-menu").evaluate((el) => !el.open), "Mobile menu closes on navigation");
  await page.goto(`${baseUrl}/`);
  assert(JSON.stringify(await page.locator(".service-copy").allTextContents()) === JSON.stringify(preview), "Homepage services unchanged after navigation");
  results.push({ headerLink: true, previewLink: true, mobileMenu: true, galleryLink: true, homepageContent: true, unbuiltDetailLinks: false });
  return results;
}
