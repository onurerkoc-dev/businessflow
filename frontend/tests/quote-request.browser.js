// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Playwright MCP expects a callable function expression.
async (page) => {
  const baseUrl = new URL(page.url()).origin;
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const ready = async () => {
    await page.locator(".quote-form button[type='submit']").waitFor();
    await page.waitForFunction(() => !document.querySelector(".quote-form button[type='submit']").disabled);
  };
  const fillValid = async () => {
    for (const [field, value] of Object.entries({ customerName: "Kurgu Test Kullanıcısı", phone: "+90 (500) 000 00 00", email: "kurgu@example.test", vehicleBrand: "Kurgu Marka", vehicleModel: "Deneme Modeli", vehicleYear: "2020", message: "BF_TEST_ONLY_9 Araç bakımı denemesi." })) {
      await page.locator(`#${field}`).fill(value);
    }
    await page.locator("#serviceSlug").selectOption("ppf-kaplama");
  };
  const check = () => page.getByRole("button", { name: "Bilgileri Kontrol Et", exact: true }).click();
  const results = [];
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  const response = await page.goto(`${baseUrl}/teklif-al`);
  await ready();
  assert(response.status() === 200 && await page.title() === "Teklif Al | VANTA", "Quote route and metadata");
  assert(await page.locator("h1").textContent() === "Aracınız İçin Teklif Alın", "Quote H1");
  assert(await page.locator('meta[name="robots"]').getAttribute("content") === "noindex, nofollow", "Noindex retained");
  await check();
  await page.waitForFunction(() => document.activeElement.id === "customerName");
  assert(await page.locator(".quote-error").count() === 5, "Five required errors");
  assert(await page.locator("#customerName").getAttribute("aria-invalid") === "true", "Invalid field state");
  assert(await page.locator("#customerName").getAttribute("aria-describedby") === "customerName-error", "Error association");
  assert(await page.evaluate(() => {
    const luminance = (value) => {
      const rgb = value.match(/[\d.]+/g).slice(0, 3).map(Number).map((channel) => {
        const normalized = channel / 255;
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      });
      return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
    };
    const contrast = (a, b) => {
      const values = [luminance(a), luminance(b)].sort((a, b) => b - a);
      return (values[0] + 0.05) / (values[1] + 0.05);
    };
    const cta = getComputedStyle(document.querySelector(".desktop-nav .nav-cta"));
    const error = getComputedStyle(document.querySelector(".quote-error"));
    const panel = getComputedStyle(document.querySelector(".quote-panel"));
    const help = getComputedStyle(document.querySelector(".quote-hint"));
    const optional = getComputedStyle(document.querySelector('label[for="message"] span'));
    return contrast(cta.color, cta.backgroundColor) >= 4.5 && [error, help, optional].every((style) => contrast(style.color, panel.backgroundColor) >= 4.5);
  }), "Active header CTA, error, helper and optional text contrast");
  await page.locator("#customerName").fill("Kurgu Test Kullanıcısı");
  assert(await page.locator("#customerName-error").count() === 0, "Error clears while correcting");
  await fillValid();
  await page.locator("#phone").fill("02120000000");
  await page.locator("#email").fill("invalid-email");
  await page.locator("#vehicleYear").fill("9999");
  await check();
  await page.waitForFunction(() => document.activeElement.id === "phone");
  for (const field of ["phone", "email", "vehicleYear"]) assert(await page.locator(`#${field}-error`).isVisible(), `${field} validation`);
  await fillValid();
  await page.locator("#message").evaluate((el) => { el.removeAttribute("maxlength"); });
  await page.locator("#message").fill("x".repeat(1001));
  await check();
  assert(await page.locator("#message-error").isVisible(), "Validation rejects over-limit message even if HTML limit is bypassed");
  await page.locator("#message").evaluate((el) => { el.maxLength = 1000; });
  await page.locator("#message").fill("BF_TEST_ONLY_9 Araç bakımı denemesi.");

  const requests = [];
  const consoleMessages = [];
  const observeRequest = (request) => requests.push({ method: request.method(), text: `${request.url()} ${request.postData() ?? ""} ${JSON.stringify(request.headers())}` });
  const observeConsole = (message) => consoleMessages.push(message.text());
  page.on("request", observeRequest);
  page.on("console", observeConsole);
  const beforeStorage = await page.evaluate(() => JSON.stringify({ local: { ...localStorage }, session: { ...sessionStorage }, cookie: document.cookie }));
  try {
    assert(await page.locator("form").evaluate((form) => [...new FormData(form)].length === 0), "Native serialization contains no personal data");
    await check();
    await page.locator(".quote-review").waitFor();
    await page.waitForFunction(() => document.activeElement.id === "quote-review-title");
    const reviewText = await page.locator(".quote-review").textContent();
    assert(reviewText.includes("Kurgu Test Kullanıcısı") && reviewText.includes("+905000000000") && reviewText.includes("PPF Kaplama"), "Readable normalized summary");
    assert(reviewText.includes("Teklif gönderimi henüz aktif değil. Bilgileriniz kaydedilmedi veya gönderilmedi."), "Explicit non-submission disclosure");
    assert(!/başarıyla|talep numarası|gönderildi[.!]/i.test(reviewText), "No false success or tracking number");
    await page.getByRole("button", { name: "Bilgileri Düzenle", exact: true }).click();
    await page.waitForFunction(() => document.activeElement.id === "customerName");
    assert(await page.locator("#vehicleModel").inputValue() === "Deneme Modeli", "Edit restores values");
    await check();
    await page.locator(".quote-review").waitFor();
    await page.waitForTimeout(250);
    const markers = ["BF_TEST_ONLY_9", "Kurgu Test", "kurgu@example.test", "5000000000", "Deneme Modeli"];
    assert(requests.every((request) => ["GET", "HEAD"].includes(request.method) && !markers.some((marker) => decodeURIComponent(request.text).includes(marker))), "No personal data in any network request");
    assert(!consoleMessages.some((message) => markers.some((marker) => message.includes(marker))), "No personal data in console");
    assert(await page.evaluate(() => JSON.stringify({ local: { ...localStorage }, session: { ...sessionStorage }, cookie: document.cookie })) === beforeStorage, "No persistent application storage");
    results.push({ validation: true, errorFocus: true, longMessage: true, reviewAndEdit: true, noSubmission: true, noStorage: true, noConsoleData: true });
  } finally {
    page.off("request", observeRequest);
    page.off("console", observeConsole);
  }

  for (const slug of ["ppf-kaplama", "seramik-kaplama", "detailing"]) {
    await page.goto(`${baseUrl}/hizmetler/${slug}`);
    await page.locator(".detail-lead-actions").getByRole("link", { name: "Teklif Al", exact: true }).click();
    await page.waitForURL(`**/teklif-al?hizmet=${slug}`);
    await ready();
    assert(await page.locator("#serviceSlug").inputValue() === slug, "Service CTA preselection");
  }
  for (const query of ["?hizmet=unknown", "?hizmet=ppf-kaplama&hizmet=detailing", "?hizmet=%3Cscript%3E"]) {
    await page.goto(`${baseUrl}/teklif-al${query}`);
    await ready();
    assert(await page.locator("#serviceSlug").inputValue() === "", "Unknown or duplicate selection rejected");
    assert(await page.locator("#serviceSlug-hint").isVisible(), "Invalid selection is explained");
  }
  await page.goto(`${baseUrl}/teklif-al?other=detailing`);
  await ready();
  assert(await page.locator("#serviceSlug").inputValue() === "" && await page.locator("#serviceSlug-hint").count() === 0, "Unknown query keys ignored");

  for (const [width, height] of [[1440, 1000], [1280, 900], [1024, 900], [768, 1024], [390, 844], [375, 812]]) {
    await page.setViewportSize({ width, height });
    await page.goto(`${baseUrl}/teklif-al`);
    await ready();
    assert(await page.evaluate(() => {
      const label = getComputedStyle(document.querySelector('label[for="message"]'));
      const name = getComputedStyle(document.querySelector('label[for="customerName"]'));
      const headings = [...document.querySelectorAll(".quote-form legend")];
      return label.fontSize === name.fontSize && label.fontFamily === name.fontFamily && headings.length === 3 && headings.every((heading) => parseFloat(getComputedStyle(heading).fontSize) > parseFloat(label.fontSize));
    }), "Optional message uses field typography below three section headings");
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: "instant" }));
    const layout = await page.evaluate(() => {
      const intro = document.querySelector(".quote-intro");
      const rect = intro.getBoundingClientRect();
      return { position: getComputedStyle(intro).position, top: rect.top, bottom: rect.bottom, headerBottom: document.querySelector(".site-header").getBoundingClientRect().bottom, height: innerHeight };
    });
    if (width >= 1024) {
      assert(layout.position === "sticky" && layout.top >= layout.headerBottom + 16 && layout.bottom <= layout.height - 16, `Desktop intro stays visible below header at ${width}px`);
      await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
      assert(await page.evaluate(() => document.querySelector(".quote-intro").getBoundingClientRect().bottom < document.querySelector(".site-footer").getBoundingClientRect().top), `Sticky intro stops before footer at ${width}px`);
    } else assert(layout.position === "static" && layout.top < 0, `Natural single-column scrolling at ${width}px`);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    assert(await page.locator("#phone").getAttribute("type") === "tel" && await page.locator("#email").getAttribute("type") === "email" && await page.locator("#vehicleYear").getAttribute("inputmode") === "numeric", "Mobile input types");
    assert(await page.locator(".quote-form").evaluate((form) => [...form.querySelectorAll("input, select, textarea")].every((el) => el.labels.length === 1 && el.getBoundingClientRect().height >= 44)), "Labels and target sizes");
    await page.locator("#customerName").focus();
    await page.keyboard.press("Tab");
    assert(await page.locator("#phone").evaluate((el) => el === document.activeElement && getComputedStyle(el).outlineStyle !== "none"), "Tab order and visible focus");
    await check();
    await page.waitForFunction(() => document.activeElement.id === "customerName");
    assert(await page.locator("#customerName").evaluate((el) => el.getBoundingClientRect().top > document.querySelector(".site-header").getBoundingClientRect().bottom), `Error focus stays below header at ${width}px`);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Error layout at ${width}px`);
    await fillValid();
    await check();
    await page.locator(".quote-review").waitFor();
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth && document.querySelector(".site-footer").getBoundingClientRect().top >= document.querySelector("main").getBoundingClientRect().bottom - 1), `Summary and footer at ${width}px`);
    results.push({ width, sticky: width >= 1024, fieldTypography: true, errorFocusVisible: true, form: true, errors: true, summary: true, overflow: false });
  }

  await page.setViewportSize({ width: 1280, height: 600 });
  await page.goto(`${baseUrl}/teklif-al`);
  await ready();
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: "instant" }));
  assert(await page.locator(".quote-intro").evaluate((el) => getComputedStyle(el).position === "static" && el.getBoundingClientRect().top < 0), "Short desktop viewport uses natural flow");
  results.push({ shortViewport: true });

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${baseUrl}/`);
  await page.locator(".hero-actions").getByRole("link", { name: "Teklif Al", exact: true }).click();
  await page.waitForURL("**/teklif-al");
  assert(await page.locator('.desktop-nav a[aria-current="page"]').textContent() === "Teklif Al", "Header quote active state");
  await page.goto(`${baseUrl}/iletisim`);
  await page.locator(".contact-actions").getByRole("link", { name: "Teklif Al", exact: true }).click();
  await page.waitForURL("**/teklif-al");
  await page.goto(`${baseUrl}/galeri`);
  await page.locator(".footer-navigation").getByRole("link", { name: "Teklif Al", exact: true }).click();
  await page.waitForURL("**/teklif-al");

  const context = await page.context().browser().newContext({ javaScriptEnabled: false });
  const noJsPage = await context.newPage();
  try {
    await noJsPage.goto(`${baseUrl}/teklif-al?hizmet=detailing`);
    assert(await noJsPage.locator(".quote-intro noscript").textContent().then((text) => text.includes("JavaScript")), "No-JavaScript guidance");
    assert(await noJsPage.evaluate(() => [...document.querySelectorAll(".quote-form input, .quote-form select, .quote-form textarea, .quote-form button")].every((el) => el.matches(":disabled"))), "Server controls cannot submit without JavaScript");
    assert(await noJsPage.locator('.quote-form [name]').count() === 0, "No native personal-data serialization without JavaScript");
  } finally { await context.close(); }
  results.push({ servicePreselection: true, invalidQuery: true, entryLinks: true, noJavaScriptSafe: true });
  return results;
}
