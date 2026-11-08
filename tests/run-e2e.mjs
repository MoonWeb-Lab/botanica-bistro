import { chromium } from 'playwright';

export async function runTestSuite(targetUrl) {
  const url = targetUrl || 'https://moonweb-lab.github.io/botanica-bistro/';
  console.log('🚀 Starting MoonWeb Lab E2E Suite for Botanica Bistro on:', url);

  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  });

  let testsPassed = 0;
  let testsFailed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      testsPassed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      testsFailed++;
    }
  }

  // 1. DESKTOP TEST SUITE (1280x800)
  console.log('\n--- 1. DESKTOP EXPERIENCE AUDIT (1280x800) ---');
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await desktopContext.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  assert(response.status() === 200, `Page loaded with HTTP 200 (Got ${response.status()})`);

  const title = await page.title();
  assert(title.includes('Botanica Bistro') && title.includes('Минск'), `Page title contains 'Botanica Bistro' and 'Минск': "${title}"`);

  // SEO & Schema.org Restaurant
  const metaDesc = await page.$eval('meta[name="description"]', (el) => el.getAttribute('content'));
  assert(metaDesc && metaDesc.length > 20, `Meta description exists: "${metaDesc.slice(0, 50)}..."`);

  const jsonLd = await page.$eval('script[type="application/ld+json"]', (el) => JSON.parse(el.textContent || '{}'));
  assert(jsonLd['@type'] === 'Restaurant', `Schema.org JSON-LD @type is "Restaurant"`);
  assert(jsonLd.name === 'Botanica Bistro', `Schema.org name matches "Botanica Bistro"`);
  assert(jsonLd.address.addressLocality === 'Минск', `Schema.org locality is "Минск"`);
  assert(jsonLd.telephone === '+375 (29) 720-33-88', `Schema.org phone is Belarusian "+375 (29) 720-33-88"`);

  // Hero Section
  const heroHeading = await page.locator('h1').first().textContent();
  assert(heroHeading.includes('Гармония вкусов'), `Hero H1 rendered properly: "${heroHeading.replace(/\s+/g, ' ').trim()}"`);

  // Menu Category & Tag Filtering
  console.log('\n  Testing Menu Filtering & BYN Currency...');
  await page.locator('#menu').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.click('button:has-text("Паста & Ризотто")');
  await page.waitForTimeout(300);
  const pastaCount = await page.locator('#menu h3').count();
  assert(pastaCount >= 2, `Category "Паста & Ризотто" displays matching dishes (Count: ${pastaCount})`);

  await page.click('button:has-text("Вегетарианское")');
  await page.waitForTimeout(300);
  const veganCount = await page.locator('#menu h3').count();
  assert(veganCount >= 1, `Tag filter "Вегетарианское" filtered correctly (Count: ${veganCount})`);

  await page.click('button:has-text("Все меню")');
  await page.locator('button:has-text("Вегетарианское")').click(); // toggle off
  await page.waitForTimeout(800);

  // Check currency is BYN
  const hasBynPrice = await page.locator('span:has-text("BYN")').count();
  assert(hasBynPrice > 0, `Prices formatted in Belarusian BYN (Found ${hasBynPrice} price tags)`);

  // Check all images in menu
  const menuImages = await page.locator('#menu img').evaluateAll((imgs) =>
    imgs.every((img) => img.complete && img.naturalWidth > 0)
  );
  assert(menuImages, 'All menu food photos loaded with natural dimensions > 0 (Zero broken images)');

  // Seating Zones Pre-selection
  console.log('\n  Testing Seating Zones & Direct Table Booking Trigger...');
  const firstZoneBtn = page.locator('#zones button:has-text("Забронировать стол в этой зоне")').first();
  await firstZoneBtn.scrollIntoViewIfNeeded();
  await firstZoneBtn.click();
  await page.waitForTimeout(400);

  const modalHeading = page.locator('div.fixed h3');
  assert(await modalHeading.isVisible(), 'Booking modal opened from Seating Zone card');

  // Verify it skipped to Step 2 with Zone Pre-selected
  assert((await modalHeading.textContent()).includes('Персоны'), 'Skipped to Step 2 with Zone already pre-selected');

  // Step 2: Select 4 guests & Occasion
  await page.locator('div.fixed button:has-text("4")').first().click();
  await page.click('button:has-text("День рождения")');
  await page.click('button:has-text("Продолжить")');
  await page.waitForTimeout(300);

  // Step 3: Date & Time
  assert((await modalHeading.textContent()).includes('Дата и время'), 'Navigated to Step 3: Date & Time');
  await page.locator('div.fixed button:has-text("19:30")').click();
  await page.click('button:has-text("Продолжить")');
  await page.waitForTimeout(300);

  // Step 4: Contact details & Validation
  assert((await modalHeading.textContent()).includes('Данные'), 'Navigated to Step 4: Contact Information');
  await page.click('button:has-text("Подтвердить бронь")');
  await page.waitForTimeout(200);
  const nameError = await page.locator('text=Укажите имя для резерва стола').isVisible();
  assert(nameError, 'Form validation caught empty guest name properly');

  await page.fill('input[placeholder="Константин"]', 'Екатерина (MoonWeb VIP)');
  await page.fill('input[placeholder="+375 (29) 000-00-00"]', '+375 29 555-44-33');
  await page.fill('textarea', 'Юбилей в Верхнем городе, столик украсить свечами');

  await page.click('button:has-text("Подтвердить бронь")');
  await page.waitForTimeout(500);

  // Step 5: Confirmation screen
  const successTitle = await page.locator('text=Стол забронирован!').isVisible();
  assert(successTitle, 'Step 5 Confirmation screen reached successfully');

  const addressText = await page.locator('div.fixed span:has-text("Революционная, 17")').first().textContent();
  assert(addressText.includes('Революционная, 17'), `Booking confirmation contains Minsk address: "${addressText}"`);

  const bookingCode = await page.locator('strong:has-text("#BB-")').textContent();
  assert(bookingCode && bookingCode.startsWith('#BB-'), `Generated booking code: "${bookingCode}"`);

  await page.click('button:has-text("Отлично, закрыть")');
  await page.waitForTimeout(300);
  assert(!(await modalHeading.isVisible()), 'Booking modal closed properly');

  // Cookie Banner & Privacy Policy
  console.log('\n  Testing Cookie Banner & Privacy Policy...');
  const cookieBanner = page.locator('text=Файлы Cookie & Приватность');
  await cookieBanner.waitFor({ state: 'visible', timeout: 5000 });
  assert(await cookieBanner.isVisible(), 'Cookie consent banner appeared smoothly');

  await page.click('button:has-text("Политике конфиденциальности")');
  await page.waitForTimeout(300);
  const privacyModal = page.locator('div.fixed h3:has-text("Политика конфиденциальности")');
  assert(await privacyModal.isVisible(), 'Privacy Policy Modal opened via banner');

  // Verify Law of Belarus mention
  const privacyText = await page.locator('div.fixed').filter({ hasText: 'Закон РБ № 99-З' }).first().textContent();
  assert(privacyText.includes('Закон РБ № 99-З'), 'Privacy policy cites Belarusian Law № 99-З');

  await page.click('button:has-text("Понятно")');
  await page.waitForTimeout(300);
  assert(!(await privacyModal.isVisible()), 'Privacy Policy Modal closed via "Понятно"');

  await page.click('button:has-text("Принять все")');
  await page.waitForTimeout(300);
  assert(!(await cookieBanner.isVisible()), 'Cookie banner dismissed on accept');

  // Verify Fake Reviews are gone
  const reviewsCount = await page.locator('#reviews').count();
  assert(reviewsCount === 0, 'Fake reviews section completely removed as requested');

  // Take Desktop Screenshot
  await page.screenshot({ path: 'C:/Users/user/.gemini/antigravity/scratch/botanica-bistro/tests/desktop-preview.png', fullPage: false });
  console.log('  📸 Desktop screenshot captured: tests/desktop-preview.png');


  // 2. MOBILE VIEWPORT AUDIT (375x667)
  console.log('\n--- 2. MOBILE VIEWPORT AUDIT (375x667) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(url, { waitUntil: 'networkidle' });

  // Mobile menu
  const menuBtn = mobilePage.locator('button[aria-label="Toggle navigation menu"]');
  assert(await menuBtn.isVisible(), 'Mobile hamburger button visible');
  await menuBtn.click();
  await mobilePage.waitForTimeout(300);
  const drawerLink = mobilePage.locator('div.lg\\:hidden a:has-text("Меню кухни")');
  assert(await drawerLink.isVisible(), 'Mobile drawer opened on tap');
  await menuBtn.click();
  await mobilePage.waitForTimeout(300);

  // Mobile Sticky CTA
  await mobilePage.evaluate(() => window.scrollTo(0, 700));
  await mobilePage.waitForTimeout(400);
  const stickyBtn = mobilePage.locator('div.fixed.bottom-6 button:has-text("Бронь стола")');
  assert(await stickyBtn.isVisible(), 'Mobile Sticky CTA button appears on scroll');

  await mobilePage.screenshot({ path: 'C:/Users/user/.gemini/antigravity/scratch/botanica-bistro/tests/mobile-preview.png', fullPage: false });
  console.log('  📸 Mobile screenshot captured: tests/mobile-preview.png');


  // 3. RUNTIME INTEGRITY & CONSOLE
  console.log('\n--- 3. BROWSER CONSOLE INTEGRITY ---');
  assert(consoleErrors.length === 0, `Zero browser console errors detected (Errors: ${JSON.stringify(consoleErrors)})`);

  await browser.close();

  console.log('\n=============================================');
  console.log(`🏁 TEST EXECUTION FINISHED:`);
  console.log(`   Passed: ${testsPassed}`);
  console.log(`   Failed: ${testsFailed}`);
  console.log(`   Success Rate: ${Math.round((testsPassed / (testsPassed + testsFailed)) * 100)}%`);
  console.log('=============================================\n');

  if (testsFailed > 0) process.exit(1);
}

runTestSuite(process.argv[2]).catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
