// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Playwright MCP expects a callable function expression.
async (page) => {
  const baseUrl = new URL(page.url()).origin;
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const routes = ["/", "/hizmetler", "/galeri", "/hakkimizda", "/hizmetler/ppf-kaplama", "/hizmetler/seramik-kaplama", "/hizmetler/detailing"];
  const results = [];
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const [width, height] of [[1440, 1000], [1280, 900], [1024, 900], [768, 1024], [390, 844], [375, 812]]) {
    await page.setViewportSize({ width, height });
    for (const route of routes) {
      const response = await page.goto(`${baseUrl}${route}`);
      assert(response.status() === 200, `Direct route ${route}`);
      const footer = page.getByRole("contentinfo");
      assert(await footer.count() === 1, `${route}: one global footer`);
      const hrefs = await footer.locator("nav a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
      assert(hrefs.length === 7 && routes.every((href) => hrefs.includes(href)), "All seven footer destinations");
      await footer.scrollIntoViewIfNeeded();
      assert(await page.evaluate(() => {
        const footer = document.querySelector(".site-footer");
        return document.documentElement.scrollWidth <= innerWidth &&
          footer.getBoundingClientRect().top >= document.querySelector("main").getBoundingClientRect().bottom - 1 &&
          [...footer.querySelectorAll("a")].every((link) => {
            const bounds = link.getBoundingClientRect();
            return bounds.left >= 0 && bounds.right <= innerWidth && bounds.height >= 44;
          });
      }), `${route}: footer layout and overflow at ${width}px`);
      assert(await page.locator('meta[name="robots"]').getAttribute("content") === "noindex, nofollow", "Noindex retained");

      if (width >= 1024) {
        assert(await page.locator(".desktop-nav").isVisible(), "Desktop navigation remains available");
        assert(await page.locator(".header-inner").evaluate((header) => {
          const brand = header.querySelector(".brand").getBoundingClientRect();
          const nav = header.querySelector(".desktop-nav").getBoundingClientRect();
          const links = [...header.querySelectorAll(".desktop-nav a")].map((link) => link.getBoundingClientRect());
          return nav.left - brand.right >= 16 && nav.right <= header.getBoundingClientRect().right + 1 &&
            links.every((bounds, index) => !index || bounds.left - links[index - 1].right >= 12) && header.getBoundingClientRect().height <= 85;
        }), `Header must fit without collisions at ${width}px`);
      }
      if (route === "/galeri") {
        const size = await page.locator("h1").evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
        assert(size <= (width >= 768 ? 60 : 36), "Gallery heading scale retained");
      }
      if (route === "/hakkimizda") {
        assert(await page.title() === "Hakkımızda | VANTA", "About metadata title");
        assert(await page.locator('meta[name="description"]').getAttribute("content").then((value) => value.includes("yüzey değerlendirmesi")), "About description");
        assert(await page.locator("h1").count() === 1 && await page.locator("h1").textContent() === "VANTA'yı Tanıyın", "One about H1");
        assert(await page.locator(".about-page h2").count() === 3 && await page.locator(".about-steps li").count() === 4, "About structure");
        assert(await page.locator(".about-demo-note").textContent().then((value) => value.includes("demo marka")), "Explicit demo disclosure");
        for (const image of await page.locator(".about-page img").all()) {
          await image.scrollIntoViewIfNeeded();
          await image.evaluate((el) => el.decode());
          assert(await image.evaluate((el) => el.naturalWidth > 0 && el.alt.length > 30 && el.sizes && el.srcset), "About photo attributes and loading");
        }
        assert(await page.locator(".about-preparation img").getAttribute("loading") === "lazy", "Supporting photo lazy loading");
      }
    }
    results.push({ width, routes: 7, footer: true, headerFits: true, overflow: false, aboutPhotos: 2, galleryHeading: true });
  }

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseUrl}/galeri`);
  await page.locator(".desktop-nav").getByRole("link", { name: "Hakkımızda", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page.waitForURL("**/hakkimizda");
  assert(await page.locator('.desktop-nav a[aria-current="page"]').textContent() === "Hakkımızda", "Desktop about active state");
  await page.locator(".about-actions").getByRole("link", { name: "Hizmetleri İncele", exact: true }).click();
  await page.waitForURL("**/hizmetler");

  for (const [name, route] of [["Ana Sayfa", "/"], ["Hizmetler", "/hizmetler"], ["Galeri", "/galeri"], ["Hakkımızda", "/hakkimizda"], ["PPF Kaplama", "/hizmetler/ppf-kaplama"], ["Seramik Kaplama", "/hizmetler/seramik-kaplama"], ["Detailing", "/hizmetler/detailing"]]) {
    const link = page.locator(".footer-navigation").getByRole("link", { name, exact: true });
    await link.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    assert(await link.evaluate((el) => getComputedStyle(el).outlineStyle !== "none"), "Footer visible keyboard focus");
    await page.keyboard.press("Enter");
    await page.waitForURL(`${baseUrl}${route}`);
  }

  for (const width of [768, 390, 375]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(`${baseUrl}/galeri`);
    const toggle = page.locator(".mobile-menu > summary");
    await toggle.focus();
    await page.keyboard.press("Enter");
    await page.locator("#mobile-navigation").getByRole("link", { name: "Hakkımızda", exact: true }).click();
    await page.waitForURL("**/hakkimizda");
    assert(await page.locator(".mobile-menu").evaluate((el) => !el.open), "Menu closes after about navigation");
    await toggle.focus();
    await page.keyboard.press("Space");
    assert(await page.locator('#mobile-navigation a[aria-current="page"]').textContent() === "Hakkımızda", "Mobile about active state");
    await page.keyboard.press("Escape");
    assert(await toggle.evaluate((el) => el === document.activeElement), "Menu focus restored");
  }
  await page.locator(".about-actions").getByRole("link", { name: "Galeriyi İncele", exact: true }).click();
  await page.waitForURL("**/galeri");
  results.push({ desktopAboutLink: true, mobileAboutLink: true, footerKeyboardLinks: 7, aboutActions: true });
  return results;
}
