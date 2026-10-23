// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Playwright MCP expects a callable function expression.
async (page) => {
  const baseUrl = new URL(page.url()).origin;
  const output = "frontend/.next/qa/phase10";
  const routes = ["/", "/hizmetler", "/hizmetler/ppf-kaplama", "/hizmetler/seramik-kaplama", "/hizmetler/detailing", "/galeri", "/hakkimizda", "/iletisim", "/teklif-al"];
  const widths = [1920, 1440, 1280, 1024, 768, 430, 390, 375, 320];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const rows = [];
  const axeResults = [];
  const heroContrast = [];
  const warnings = [];
  const onConsole = (message) => { if (["warning", "error"].includes(message.type())) warnings.push({ route: page.url(), message: message.text() }); };
  const onPageError = (error) => warnings.push({ route: page.url(), message: error.message });
  page.on("console", onConsole);
  page.on("pageerror", onPageError);
  const visit = async (route) => {
    const response = await page.goto(`${baseUrl}${route}`);
    assert(response.status() === 200, `${route}: HTTP 200`);
    if (route.startsWith("/teklif-al")) await page.waitForFunction(() => !document.querySelector(".quote-form button[type='submit']").disabled);
  };
  const runAxe = async (label) => {
    if (!await page.evaluate(() => Boolean(window.axe))) await page.addScriptTag({ path: "frontend/node_modules/axe-core/axe.min.js" });
    const result = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] } }));
    const entry = { label, version: result.testEngine.version, violations: result.violations.map((item) => ({ id: item.id, targets: item.nodes.map((node) => node.target) })), incomplete: result.incomplete.map((item) => ({ id: item.id, count: item.nodes.length })) };
    axeResults.push(entry);
    assert(!entry.violations.length, `${label}: axe violations ${JSON.stringify(entry.violations)}`);
  };
  try {
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const width of widths) {
      await page.setViewportSize({ width, height: width >= 1440 ? 1080 : width === 768 ? 1024 : 900 });
      for (const route of routes) {
        await visit(route);
        for (const img of await page.locator("main img").all()) {
          await img.scrollIntoViewIfNeeded();
          await img.evaluate((el) => el.decode());
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        const audit = await page.evaluate(() => {
          const main = document.querySelector("main");
          const visible = (el) => el.checkVisibility({ visibilityProperty: true });
          const ids = [...document.querySelectorAll("[id]")].map((el) => el.id);
          const missingRefs = [...document.querySelectorAll("[aria-describedby],[aria-labelledby],[aria-controls]")].filter(visible).flatMap((el) => ["aria-describedby", "aria-labelledby", "aria-controls"].flatMap((attr) => (el.getAttribute(attr) || "").split(/\s+/).filter(Boolean).filter((id) => !document.getElementById(id))));
          const headings = [...main.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(visible).map((el) => Number(el.tagName[1]));
          const captionLeaves = [...main.querySelectorAll("figcaption")].flatMap((el) => el.children.length ? [...el.children] : [el]);
          const controls = [...document.querySelectorAll("a,button,input,select,textarea,summary")].filter(visible);
          const smallTargets = controls.filter((el) => { const rect = el.getBoundingClientRect(); return rect.width < 24 || rect.height < 24; }).map((el) => el.outerHTML.slice(0, 100));
          const photos = [...main.querySelectorAll("img")];
          return {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content,
            ogTitle: document.querySelector('meta[property="og:title"]')?.content,
            ogDescription: document.querySelector('meta[property="og:description"]')?.content,
            robots: document.querySelector('meta[name="robots"]')?.content,
            canonical: Boolean(document.querySelector('link[rel="canonical"]')),
            h1: main.querySelectorAll("h1").length,
            headingJump: headings.some((level, index) => index && level > headings[index - 1] + 1),
            duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index), missingRefs, smallTargets,
            labels: [...main.querySelectorAll("input,select,textarea")].every((el) => el.labels.length === 1),
            images: photos.every((el) => el.naturalWidth > 0 && el.alt.length > 10 && el.sizes && el.srcset && el.getBoundingClientRect().height > 0),
            captionMin: captionLeaves.length ? Math.min(...captionLeaves.map((el) => parseFloat(getComputedStyle(el).fontSize))) : null,
            overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
            footer: document.querySelector(".site-footer").getBoundingClientRect().top >= main.getBoundingClientRect().bottom - 1,
            reducedMotion: getComputedStyle(document.documentElement).scrollBehavior === "auto",
            links: [...document.querySelectorAll("a")].map((el) => el.getAttribute("href")),
          };
        });
        assert(audit.title && audit.description && audit.ogTitle === audit.title && audit.ogDescription === audit.description, `${route}: complete route metadata`);
        assert(audit.robots === "noindex, nofollow" && !audit.canonical, `${route}: demo indexing and domain policy`);
        assert(audit.h1 === 1 && !audit.headingJump && !audit.duplicateIds.length && !audit.missingRefs.length && audit.labels, `${route}: semantic structure and ARIA references`);
        assert(audit.images && (audit.captionMin === null || audit.captionMin >= 14), `${route}: images and readable captions`);
        if (route === "/") {
          assert(await page.locator(".hero-category").evaluate((el) => parseFloat(getComputedStyle(el).fontSize) >= 12), "Hero category remains readable on narrow screens");
          const items = await page.locator(".hero-category,.hero h1,.hero-description,.hero-actions a").evaluateAll((elements) => elements.map((el) => {
            const range = document.createRange();
            range.selectNodeContents(el);
            return { selector: el.className || el.tagName, color: getComputedStyle(el).color, font: parseFloat(getComputedStyle(el).fontSize), rects: [...range.getClientRects()].map(({ x, y, width, height }) => ({ x, y, width, height })) };
          }));
          await page.screenshot({ path: `${output}/hero-visible-${width}.png` });
          const hiddenText = await page.addStyleTag({ content: ".hero-copy,.hero-copy *{color:transparent!important;text-shadow:none!important;outline:none!important;}" });
          const backdrop = await page.screenshot({ path: `${output}/hero-backdrop-${width}.png` });
          await hiddenText.evaluate((el) => el.remove());
          const contrasts = await page.evaluate(async ({ base64, items }) => {
            const image = new Image();
            image.src = `data:image/png;base64,${base64}`;
            await image.decode();
            const canvas = document.createElement("canvas");
            canvas.width = image.width; canvas.height = image.height;
            const context = canvas.getContext("2d");
            context.drawImage(image, 0, 0);
            const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
            const luminance = (rgb) => rgb.map((v) => v / 255).map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
            return items.map((item) => {
              let minimum = Infinity;
              const foreground = luminance(item.color.match(/[\d.]+/g).slice(0, 3).map(Number));
              for (const rect of item.rects) {
                for (let y = Math.max(0, Math.ceil(rect.y)); y < Math.min(canvas.height, Math.floor(rect.y + rect.height)); y++) {
                  for (let x = Math.max(0, Math.ceil(rect.x)); x < Math.min(canvas.width, Math.floor(rect.x + rect.width)); x++) {
                    const index = (y * canvas.width + x) * 4;
                    const background = luminance([data[index], data[index + 1], data[index + 2]]);
                    minimum = Math.min(minimum, (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05));
                  }
                }
              }
              return { selector: item.selector, minimum: +minimum.toFixed(2), required: item.font >= 24 ? 3 : 4.5 };
            });
          }, { base64: backdrop.toString("base64"), items });
          assert(contrasts.every((item) => Number.isFinite(item.minimum) && item.minimum >= item.required), `Hero text backdrop contrast at ${width}px: ${JSON.stringify(contrasts)}`);
          heroContrast.push({ width, contrasts });
        }
        assert(!audit.overflow && audit.footer && !audit.smallTargets.length && audit.reducedMotion, `${route}: targets, motion and layout at ${width}px`);
        for (const href of audit.links) {
          const url = new URL(href, `${baseUrl}${route}`);
          assert(url.origin === baseUrl && routes.includes(url.pathname), `${route}: real internal destination ${href}`);
          if (url.pathname === route && url.hash) assert(await page.locator(url.hash).count() === 1, `${route}: anchor ${url.hash}`);
        }
        await page.keyboard.press("Tab");
        assert(await page.locator(".skip-link").evaluate((el) => el === document.activeElement && el.getBoundingClientRect().top >= 0), `${route}: first keyboard stop is visible skip link`);
        await page.keyboard.press("Enter");
        await page.waitForFunction(() => document.activeElement.id === "main-content");
        await page.locator("main").evaluate((el) => el.blur());
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await page.screenshot({ path: `${output}/after/${route.replaceAll("/", "_")}-${width}.png`, fullPage: true });
        if (width === 1440 || width === 390) await runAxe(`${route} ${width}px`);
        rows.push({ route, width, ...audit });
      }
    }
    for (const width of [768, 430, 390, 375, 320]) {
      await page.setViewportSize({ width, height: 812 });
      await visit("/galeri");
      const toggle = page.locator(".menu-toggle");
      await toggle.focus();
      await page.keyboard.press("Enter");
      await page.locator("#mobile-navigation a").last().focus();
      await page.keyboard.press("Tab");
      assert(await page.locator(".mobile-menu").evaluate((el) => !el.open), "Tab leaving menu closes overlay");
      assert(await page.getByRole("button", { name: "Tamamı", exact: true }).evaluate((el) => el === document.activeElement && el.contains(document.elementFromPoint(el.getBoundingClientRect().x + 10, el.getBoundingClientRect().y + 10))), "Next control has unobscured focus");
      if (width === 375) await page.screenshot({ path: `${output}/after/menu-focus-375.png` });
      await toggle.focus();
      await page.keyboard.press("Space");
      await page.keyboard.press("Shift+Tab");
      assert(await page.locator(".mobile-menu").evaluate((el) => !el.open), "Backward Tab leaving menu closes overlay");
    }
    for (const [width, height] of [[1920, 1080], [768, 1024], [320, 568], [320, 320]]) {
      await page.setViewportSize({ width, height });
      await visit("/galeri");
      const opener = page.locator(".collection-media").first();
      await opener.click();
      await page.locator("dialog").waitFor({ state: "visible" });
      assert(await page.locator("dialog").evaluate((el) => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight && r.right <= innerWidth; }), "Lightbox fits narrow and short screens");
      await runAxe(`lightbox ${width}x${height}`);
      await page.keyboard.press("Escape");
      await page.waitForFunction(() => document.activeElement.classList.contains("collection-media"));
    }
    await page.setViewportSize({ width: 320, height: 812 });
    await visit("/teklif-al?hizmet=unknown");
    await page.getByRole("button", { name: "Bilgileri Kontrol Et", exact: true }).click();
    await runAxe("quote errors and invalid query 320px");
    for (const [id, value] of Object.entries({ customerName: "Çağrı Şen Öztürk ".repeat(6).slice(0, 100), phone: "05000000000", vehicleBrand: "Örnek araç markası", vehicleModel: "Uzun Türkçe model açıklaması", message: "Çiziklerin ve yüzeyin değerlendirilmesini istiyorum. ".repeat(20).slice(0, 1000) })) await page.locator(`#${id}`).fill(value);
    await page.locator("#serviceSlug").selectOption("ppf-kaplama");
    await page.getByRole("button", { name: "Bilgileri Kontrol Et", exact: true }).click();
    await page.locator(".quote-review").waitFor();
    assert(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth), "Long Turkish summary fits 320px");
    await runAxe("quote long summary 320px");
    for (const [width, height] of [[960, 540], [640, 450], [512, 384]]) {
      await page.setViewportSize({ width, height });
      for (const route of routes) {
        await visit(route);
        assert(await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth), `${route}: reduced CSS viewport ${width}x${height}`);
      }
    }
    assert(!warnings.length, `Browser warnings/errors: ${JSON.stringify(warnings)}`);
    return { engine: page.context().browser().version(), routeWidths: rows.length, widths, axeChecks: axeResults.length, axeViolations: 0, axeIncomplete: axeResults.filter((r) => r.incomplete.length), heroContrast, keyboardMenuExit: true, shortLightbox: true, longSummary: true, reducedViewportChecks: 27, actualBrowserZoomTested: false, consoleWarnings: warnings.length, routes: rows.filter((row) => row.width === 1440).map(({ route, title, description, captionMin }) => ({ route, title, description, captionMin })) };
  } finally {
    page.off("console", onConsole);
    page.off("pageerror", onPageError);
  }
}
