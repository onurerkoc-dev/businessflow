// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Playwright MCP expects a callable function expression.
async (page) => {
  const baseUrl = new URL(page.url()).origin;
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const results = [];
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  const response = await page.goto(`${baseUrl}/galeri`);
  assert(response.status() === 200, "Gallery route must return HTTP 200");
  assert(await page.title() === "Uygulama Galerisi | VANTA", "Gallery metadata title");
  assert(await page.locator("h1").count() === 1, "One page heading");
  assert(await page.locator('meta[property="og:title"]').getAttribute("content") === await page.title(), "Open Graph title");

  for (const [category, count] of [
    ["PPF Kaplama", 2], ["Seramik Kaplama", 2], ["Boya Düzeltme", 3],
    ["Detaylı Bakım", 1], ["Tamamı", 8],
  ]) {
    const filter = page.getByRole("button", { name: category, exact: true });
    await filter.focus();
    await page.keyboard.press("Enter");
    await page.waitForFunction((expected) => document.querySelectorAll(".gallery-tile").length === expected, count);
    assert(await filter.getAttribute("aria-pressed") === "true", "Selected filter state");
    const labels = await page.locator(".collection-category").allTextContents();
    assert(category === "Tamamı" || labels.every((label) => label === category), "Filtered metadata must match");
    results.push({ category, count });
  }

  const opener = page.locator(".collection-media").first();
  await opener.focus();
  await page.keyboard.press("Space");
  await page.locator("dialog").waitFor({ state: "visible" });
  assert(await page.locator("dialog").evaluate((el) => el.matches(":modal")), "Native modal must be active");
  assert(await page.getByRole("button", { name: "Kapat", exact: true }).evaluate((el) => el === document.activeElement), "Initial modal focus");
  assert(await page.evaluate(() => document.body.style.overflow === "hidden"), "Background scroll lock");
  await page.locator(".brand").evaluate((el) => el.focus());
  assert(await page.locator("dialog").evaluate((el) => el.contains(document.activeElement)), "Background focus must be blocked");
  for (let index = 0; index < 6; index++) {
    await page.keyboard.press("Tab");
    assert(await page.evaluate(() => document.querySelector("dialog").contains(document.activeElement) || document.activeElement === document.body), "Tab must not reach background controls");
  }
  await page.keyboard.press("Escape");
  await page.locator("dialog").waitFor({ state: "hidden" });
  await page.waitForFunction(() => document.activeElement.classList.contains("collection-media") && document.body.style.overflow !== "hidden");
  results.push({ keyboardModal: true, backgroundInert: true, focusRestored: true });

  for (const [width, height] of [[1440, 1000], [1280, 900], [1024, 900], [768, 1024], [390, 844], [375, 812]]) {
    await page.setViewportSize({ width, height });
    await page.goto(`${baseUrl}/galeri`);
    for (const image of await page.locator(".collection-media img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((el) => el.decode());
    }
    const valid = await page.evaluate(() => {
      const photos = [...document.querySelectorAll(".gallery-tile")];
      return document.documentElement.scrollWidth <= document.documentElement.clientWidth &&
        photos.length === 8 && photos.every((photo) => {
          const image = photo.querySelector("img");
          return image.naturalWidth > 0 && image.alt && image.sizes && image.srcset &&
            photo.querySelector("figcaption").getBoundingClientRect().top >= photo.querySelector("button").getBoundingClientRect().bottom;
        });
    });
    assert(valid, `Image loading, alt, caption and overflow checks at ${width}px`);
    await page.locator(".collection-media").first().click();
    await page.locator("dialog").waitFor({ state: "visible" });
    await page.locator(".lightbox-media img").evaluate((el) => el.decode());
    assert(await page.locator("dialog").evaluate((el) => {
      const bounds = el.getBoundingClientRect();
      return bounds.left >= 0 && bounds.top >= 0 && bounds.right <= innerWidth && bounds.bottom <= innerHeight;
    }), `Modal must fit at ${width}px`);
    await page.getByRole("button", { name: "Kapat", exact: true }).click();
    await page.locator("dialog").waitFor({ state: "hidden" });
    results.push({ width, height, imagesLoaded: true, overflow: false, modalFits: true });
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/`);
  assert(await page.locator(".gallery-preview figure").count() === 4, "Homepage preview must retain four photos");
  await page.getByRole("link", { name: "Tüm Galeriyi Gör", exact: true }).click();
  await page.waitForURL("**/galeri");
  assert(await page.locator('.desktop-nav a[aria-current="page"]').textContent() === "Galeri", "Active gallery navigation");
  for (const id of ["home", "ppf", "ceramic", "detailing", "services-intro"]) {
    await page.goto(`${baseUrl}/galeri`);
    await page.locator(`.desktop-nav a[href="/#${id}"]`).click();
    await page.waitForURL(`**/#${id}`);
    await page.waitForFunction((target) => {
      const bounds = document.getElementById(target)?.getBoundingClientRect();
      return bounds && bounds.top >= 84 && bounds.top < innerHeight;
    }, id);
  }
  await page.locator(".desktop-nav").getByRole("link", { name: "Galeri", exact: true }).click();
  await page.waitForURL("**/galeri");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.locator("summary").focus();
  await page.keyboard.press("Enter");
  assert(await page.locator('#mobile-navigation a[aria-current="page"]').textContent() === "Galeri", "Mobile active gallery navigation");
  await page.locator('#mobile-navigation a[href="/#ceramic"]').click();
  await page.waitForURL("**/#ceramic");
  await page.locator("summary").click();
  await page.locator("#mobile-navigation").getByRole("link", { name: "Galeri", exact: true }).click();
  await page.waitForURL("**/galeri");
  assert(await page.locator(".mobile-menu").evaluate((el) => !el.open), "Mobile menu must close after navigation");
  results.push({ previewLink: true, headerLinks: true, homepageAnchors: true, mobileNavigation: true });
  return results;
}
