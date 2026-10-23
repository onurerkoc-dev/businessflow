// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Playwright MCP expects a callable function expression.
async (page) => {
  const baseUrl = new URL(page.url()).origin;
  const routes = ["/", "/hizmetler", "/hizmetler/ppf-kaplama", "/hizmetler/seramik-kaplama", "/hizmetler/detailing", "/galeri", "/hakkimizda", "/iletisim", "/teklif-al"];
  const rows = [];
  for (const [profile, width, height, dpr] of [["desktop", 1440, 900, 1], ["mobile", 390, 844, 2]]) {
    for (const route of [...routes, "/teklif-al", "/teklif-al?hizmet=unknown"]) {
      const context = await page.context().browser().newContext({ viewport: { width, height }, deviceScaleFactor: dpr });
      try {
        const tab = await context.newPage();
        const cdp = await context.newCDPSession(tab);
        await cdp.send("Network.enable");
        await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
        await context.addInitScript(() => {
          window.__performanceAudit = { lcp: [], shifts: [], longtasks: [] };
          for (const [type, key] of [["largest-contentful-paint", "lcp"], ["layout-shift", "shifts"], ["longtask", "longtasks"]]) {
            new PerformanceObserver((list) => window.__performanceAudit[key].push(...list.getEntries().map((entry) => ({ time: entry.startTime, value: entry.value || 0, input: entry.hadRecentInput || false, duration: entry.duration, url: entry.url || "", element: entry.element?.tagName || "" })))).observe({ type, buffered: true });
          }
        });
        const warnings = [];
        tab.on("console", (message) => { if (["warning", "error"].includes(message.type())) warnings.push(message.text()); });
        tab.on("pageerror", (error) => warnings.push(error.message));
        await tab.goto(`${baseUrl}${route}`);
        await tab.waitForLoadState("networkidle");
        await tab.waitForTimeout(350);
        const metrics = await tab.evaluate(() => {
          const resources = performance.getEntriesByType("resource");
          const scripts = resources.filter((entry) => entry.initiatorType === "script");
          const css = resources.filter((entry) => entry.name.includes(".css"));
          const images = resources.filter((entry) => entry.name.includes("/_next/image"));
          const lcp = window.__performanceAudit.lcp.at(-1);
          let cls = 0, session = 0, start = 0, last = 0;
          for (const shift of window.__performanceAudit.shifts.filter((entry) => !entry.input)) {
            if (shift.time - last > 1000 || shift.time - start > 5000) { session = 0; start = shift.time; }
            session += shift.value;
            last = shift.time;
            cls = Math.max(cls, session);
          }
          return {
            ttfb: Math.round(performance.getEntriesByType("navigation")[0].responseStart),
            fcp: Math.round(performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0),
            lcp: Math.round(lcp?.time || 0), lcpTag: lcp?.element, cls: +cls.toFixed(4),
            scriptBytes: scripts.reduce((sum, entry) => sum + entry.encodedBodySize, 0),
            cssBytes: css.reduce((sum, entry) => sum + entry.encodedBodySize, 0),
            imageBytes: images.reduce((sum, entry) => sum + entry.encodedBodySize, 0),
            scripts: scripts.length, images: images.length, longTasks: window.__performanceAudit.longtasks.length,
            renderBlocking: resources.filter((entry) => entry.renderBlockingStatus === "blocking").map((entry) => ({ type: entry.initiatorType, duration: Math.round(entry.duration) })),
            eagerImages: [...document.images].filter((image) => image.loading === "eager").length,
          };
        });
        rows.push({ profile, route, ...metrics, warnings });
      } finally { await context.close(); }
    }
  }
  const quote = rows.filter((row) => row.route.startsWith("/teklif-al"));
  if (quote.some((row) => row.cls > 0.01)) throw new Error(`Quote loading layout shift: ${JSON.stringify(quote)}`);
  if (rows.some((row) => row.warnings.length)) throw new Error(`Production console warnings/errors: ${JSON.stringify(rows.filter((row) => row.warnings.length))}`);
  return rows;
}
