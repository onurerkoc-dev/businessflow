// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Playwright MCP expects a callable function expression.
async (page) => {
  const baseUrl = new URL(page.url()).origin;
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const services = [["ppf-kaplama", "PPF Kaplama"], ["seramik-kaplama", "Seramik Kaplama"], ["detailing", "Detailing"]];
  const results = [];
  const descriptions = new Set();
  const heroSources = new Set();
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const [slug, title] of services) {
    for (const [width, height] of [[1440, 1000], [1280, 900], [768, 1024], [390, 844], [375, 812]]) {
      await page.setViewportSize({ width, height });
      const response = await page.goto(`${baseUrl}/hizmetler/${slug}`);
      assert(response.status() === 200, `${slug}: HTTP 200`);
      assert(await page.locator("h1").count() === 1 && await page.locator("h1").textContent() === title, `${slug}: unique H1`);
      assert(await page.title() === `${title} | VANTA`, `${slug}: metadata title`);
      assert(await page.locator('meta[property="og:title"]').getAttribute("content") === await page.title(), "Open Graph title");
      assert(await page.locator('meta[name="robots"]').getAttribute("content") === "noindex, nofollow", "Global noindex retained");
      descriptions.add(await page.locator('meta[name="description"]').getAttribute("content"));
      heroSources.add(await page.locator(".detail-hero-media img").getAttribute("src"));
      assert(await page.locator(".detail-body h2").count() === 3, "Overview, process and FAQ headings");
      assert(await page.locator(".detail-benefits li").count() === 3 && await page.locator(".detail-steps li").count() === 3, "Benefits and process");
      assert(await page.locator(".detail-stock-note").isVisible(), "Visible stock photo disclosure");
      for (const image of await page.locator(".service-detail img").all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((el) => el.decode());
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth &&
        [...document.querySelectorAll(".service-detail img")].every((image) => {
          const bounds = image.getBoundingClientRect();
          return image.naturalWidth > 0 && image.alt.length > 20 && image.sizes && image.srcset &&
            bounds.width > 0 && bounds.left >= 0 && bounds.right <= innerWidth && getComputedStyle(image).objectFit === "cover";
        })), `${slug}: image loading, attributes and overflow at ${width}px`);
      assert(await page.locator(".detail-process-media img").getAttribute("loading") === "lazy", "Supporting photo is lazy");
      const question = page.locator(".detail-faq summary").first();
      await question.focus();
      await page.keyboard.press("Enter");
      assert(await page.locator(".detail-faq details").first().evaluate((el) => el.open), "FAQ opens with Enter");
      assert(await question.evaluate((el) => getComputedStyle(el).outlineStyle !== "none"), "Visible keyboard focus");
      await page.keyboard.press("Space");
      assert(await page.locator(".detail-faq details").first().evaluate((el) => !el.open), "FAQ closes with Space");
      const related = await page.locator(".detail-related-links a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
      assert(related.length === 2 && services.filter(([other]) => other !== slug).every(([other]) => related.includes(`/hizmetler/${other}`)), "Other service links");
      results.push({ slug, width, status: 200, photos: 2, overflow: false, keyboardFaq: true });
    }
  }
  assert(descriptions.size === 3 && heroSources.size === 3, "Unique descriptions and hero photos per service");

  for (const [slug] of services) {
    await page.goto(`${baseUrl}/hizmetler`);
    await page.locator(`.catalog-copy a[href="/hizmetler/${slug}"]`).click();
    await page.waitForURL(`**/hizmetler/${slug}`);
    await page.goto(`${baseUrl}/`);
    await page.locator(`.service-copy a[href="/hizmetler/${slug}"]`).click();
    await page.waitForURL(`**/hizmetler/${slug}`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/hizmetler/ppf-kaplama`);
  assert(await page.locator('.desktop-nav a[aria-current="page"]').textContent() === "PPF Kaplama", "Detail header active state");
  await page.locator(".detail-related-links a").first().focus();
  await page.keyboard.press("Enter");
  await page.waitForURL("**/hizmetler/seramik-kaplama");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.locator(".mobile-menu > summary").focus();
  await page.keyboard.press("Enter");
  assert(await page.locator('#mobile-navigation a[aria-current="page"]').textContent() === "Seramik Kaplama", "Mobile active state");
  await page.locator('#mobile-navigation a[href="/hizmetler/detailing"]').click();
  await page.waitForURL("**/hizmetler/detailing");
  assert(await page.locator(".mobile-menu").evaluate((el) => !el.open), "Menu closes after detail navigation");

  const missing = await page.goto(`${baseUrl}/hizmetler/gecersiz-hizmet`);
  assert(missing.status() === 404, "Unknown slug returns HTTP 404 before streaming");
  assert(await page.getByRole("heading", { level: 1, name: "Hizmet bulunamadı" }).isVisible(), "Service-specific 404");
  await page.getByRole("link", { name: "Tüm Hizmetler", exact: true }).click();
  await page.waitForURL("**/hizmetler");

  for (const width of [1440, 1280, 768, 390, 375]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`${baseUrl}/galeri`);
    const headingSize = await page.locator("h1").evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    assert(headingSize <= (width >= 768 ? 60 : 36), `Balanced gallery heading at ${width}px`);
  }
  results.push({ uniqueMetadata: true, uniqueHeroPhotos: true, homepageAndCatalogLinks: true, relatedLink: true, mobileNavigation: true, invalidSlugStatus: 404, galleryHeading: true });
  return results;
}
