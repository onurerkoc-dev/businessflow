// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Playwright MCP expects a callable function expression.
async (page) => {
  const baseUrl = new URL(page.url()).origin;
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const destinations = ["/hizmetler/ppf-kaplama", "/hizmetler/seramik-kaplama", "/hizmetler/detailing", "/galeri", "/teklif-al"];
  const results = [];
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const [width, height] of [[1440, 1000], [1280, 900], [1024, 900], [768, 1024], [390, 844], [375, 812]]) {
    await page.setViewportSize({ width, height });
    const response = await page.goto(`${baseUrl}/iletisim`);
    assert(response.status() === 200, "Contact route HTTP 200");
    assert(await page.title() === "İletişim | VANTA", "Contact title");
    assert(await page.locator('meta[name="description"]').getAttribute("content").then((value) => value.includes("PPF, seramik kaplama ve detailing")), "Contact description");
    assert(await page.locator('meta[property="og:title"]').getAttribute("content") === await page.title(), "Open Graph title");
    assert(await page.locator('meta[name="robots"]').getAttribute("content") === "noindex, nofollow", "Global noindex");
    assert(await page.locator("h1").count() === 1 && await page.locator("h1").textContent() === "İletişim", "Unique contact H1");
    assert(await page.locator(".contact-page h2").count() === 3, "Information, service guide and gallery headings");
    assert(await page.locator(".contact-information").textContent().then((value) => value.includes("demo marka") && value.includes("henüz paylaşılmadı")), "Honest contact disclosure");
    assert(await page.locator(".contact-page form, .contact-page input, .contact-page textarea, .contact-page iframe, .contact-details").count() === 0, "No contact form, fake map or empty contact records");
    assert(await page.locator('.contact-page a[href^="tel:"], .contact-page a[href^="mailto:"]').count() === 0, "No invented contact channels");
    assert(await page.locator(".contact-services li").count() === 3, "Three service destinations");
    const hrefs = await page.locator(".contact-page a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    assert(hrefs.length === 5 && destinations.every((href) => hrefs.includes(href)), "Only real internal links");
    const image = page.locator(".contact-photo img");
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((el) => el.decode());
    assert(await image.evaluate((el) => el.naturalWidth > 0 && el.alt.length > 30 && el.sizes && el.srcset), "Optimized image loads with meaningful alt");
    const layout = await page.locator(".contact-layout").evaluate((el) => {
      const photo = el.querySelector("figure").getBoundingClientRect();
      const intro = el.querySelector("header").getBoundingClientRect();
      const services = el.querySelector(".contact-services").getBoundingClientRect();
      const media = el.querySelector(".contact-photo-media").getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        photoRight: photo.left >= intro.right,
        photoBeforeServices: photo.bottom <= services.top,
        photoWidth: media.width,
        photoHeight: media.height,
      };
    });
    assert(!layout.overflow && layout.photoWidth > 0 && layout.photoHeight > 0, `Contact layout at ${width}px`);
    assert(width >= 1024 ? layout.photoRight : layout.photoBeforeServices, `Contact grid order at ${width}px`);
    assert(await page.locator('.site-footer a[href="/iletisim"]').count() === 1, "Global footer contact link");
    results.push({ width, status: 200, image: true, overflow: false, layout: true });
  }

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseUrl}/galeri`);
  await page.locator(".desktop-nav").getByRole("link", { name: "İletişim", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page.waitForURL("**/iletisim");
  assert(await page.locator('.desktop-nav a[aria-current="page"]').textContent() === "İletişim", "Contact active navigation");

  for (const href of destinations) {
    await page.goto(`${baseUrl}/iletisim`);
    const link = page.locator(`.contact-page a[href="${href}"]`);
    await link.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    assert(await link.evaluate((el) => getComputedStyle(el).outlineStyle !== "none"), "Contact visible keyboard focus");
    await page.keyboard.press("Enter");
    await page.waitForURL(`${baseUrl}${href}`);
  }
  await page.locator(".footer-navigation").getByRole("link", { name: "İletişim", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page.waitForURL("**/iletisim");

  for (const width of [768, 390, 375]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(`${baseUrl}/hakkimizda`);
    const toggle = page.locator(".mobile-menu > summary");
    await toggle.focus();
    await page.keyboard.press("Enter");
    await page.locator("#mobile-navigation").getByRole("link", { name: "İletişim", exact: true }).click();
    await page.waitForURL("**/iletisim");
    assert(await page.locator(".mobile-menu").evaluate((el) => !el.open), "Mobile menu closes on contact navigation");
    await toggle.focus();
    await page.keyboard.press("Space");
    assert(await page.locator('#mobile-navigation a[aria-current="page"]').textContent() === "İletişim", "Mobile contact active state");
    await page.keyboard.press("Escape");
    assert(await toggle.evaluate((el) => el === document.activeElement), "Menu focus restored");
  }
  results.push({ headerContact: true, footerContact: true, mobileNavigation: true, keyboardDestinations: 5 });
  return results;
}
