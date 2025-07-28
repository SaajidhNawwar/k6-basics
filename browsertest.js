import { chromium } from 'k6/browser';

export const options = {
    scenarios: {
        browser_test: {
            executor: 'constant-vus',
            vus: 2,
            duration: '10s',
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
};

export default async function () {
    const browser = chromium.launch(); // Launch a browser instance
    const context = browser.newContext(); // New context from chromium
    const page = await context.newPage(); // New page

    await page.goto('https://www.google.com/');
    await page.waitForTimeout(3000); // Wait 3 seconds for demo

    await page.close();
    await context.close();
    await browser.close(); // Close browser
}
