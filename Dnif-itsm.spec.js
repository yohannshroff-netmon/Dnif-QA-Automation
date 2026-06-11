import { test, expect } from '@playwright/test';

const EMAIL = process.env.DNIFTEST_EMAIL;
const PASSWORD = process.env.DNIFTEST_PASSWORD;
const BASE_URL = process.env.URL;
const ATLASSIAN_TOKEN = process.env.ATLASSIAN_TOKEN;
async function login(page) {
  await page.goto(`${BASE_URL}/#/auth/login`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible({ timeout: 15000 });
  await page.getByRole('textbox', { name: 'Email' }).fill(EMAIL);
  await page.getByRole('button', { name: 'Continue with Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForLoadState('networkidle');
}
  
  test('dnif-itsm-webhooks', async ({ page }) => {
    await login(page);
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.locator('.far.fa-tv').hover();
  await page.locator('div').filter({ hasText: /^System$/ }).click();
  await page.getByRole('link', { name: 'Automation' }).click();
  await page.getByRole('button', { name: '    Configured' }).nth(1).click();
  await page.locator('.ant-drawer-title > div > span > span').first().click();
  await page.locator('.ant-drawer-title > div > span > span').first().click();


  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByText('ITSM Webhook').click();
  await page.locator('.fal.fa-edit').click();
  await page.locator('div').filter({ hasText: /^Configuration Name$/ }).nth(1).click();
  await page.getByRole('textbox', { name: 'Configuration Name' }).click();
  await page.getByRole('textbox', { name: 'Configuration Name' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Configuration Name' }).fill('DNIF-Jira-internal');
  await page.getByRole('textbox', { name: '* Create URL' }).click();
  await page.getByRole('textbox', { name: '* Create URL' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: '* Create URL' }).fill('https://dnif.atlassian.net/rest/api/3/issue');
  await page.locator('div').filter({ hasText: /^None$/ }).nth(4).click();
  await page.getByRole('option', { name: 'Basic' }).click();

  await page.getByRole('textbox', { name: 'Auth Credentials' }).fill(ATLASSIAN_TOKEN);
  await page.getByRole('textbox', { name: '* Create Payload' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: '* Create Payload' }).fill('\n{\n  "fields": {\n    "project": {\n      "key": "DNIF"  \n    },\n    "summary": "$case_name",\n    "description": {\n      "type": "doc",\n      "version": 1,\n      "content": [\n        {\n          "type": "paragraph",\n          "content": [\n            {\n              "text": "$description",\n              "type": "text"\n            }\n          ]\n        }\n      ]\n    },\n    "issuetype": {\n      "name": "Task"\n    }\n  }\n}');
  await page.locator('.fal.fa-save').click();
  await page.locator('.ant-drawer-mask').click();
  await page.locator('tr:nth-child(8) > td:nth-child(9) > .style_TableHoverIcon__2u2zs').click();
  await page.locator('div').filter({ hasText: 'Delete Plugin?CancelDelete' }).nth(5).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByText('ITSM Webhook').click();
  await page.locator('.fal.fa-edit').click();
  await page.locator('div').filter({ hasText: /^Configuration Name$/ }).nth(1).click();
  await page.getByRole('textbox', { name: 'Configuration Name' }).click();
  await page.getByRole('textbox', { name: 'Configuration Name' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Configuration Name' }).fill('DNIF-Jira-internal');
  await page.getByRole('textbox', { name: '* Create URL' }).click();
  await page.getByRole('textbox', { name: '* Create URL' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: '* Create URL' }).fill('https://dnif.atlassian.net/rest/api/3/issue');
  await page.locator('div').filter({ hasText: /^None$/ }).nth(4).click();
  await page.getByRole('option', { name: 'Basic' }).click();
  await page.getByRole('textbox', { name: 'Auth Credentials' }).fill(ATLASSIAN_TOKEN);
  await page.getByRole('textbox', { name: '* Create Payload' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: '* Create Payload' }).fill('\n{\n  "fields": {\n    "project": {\n      "key": "DNIF"  \n    },\n    "summary": "$case_name",\n    "description": {\n      "type": "doc",\n      "version": 1,\n      "content": [\n        {\n          "type": "paragraph",\n          "content": [\n            {\n              "text": "$description",\n              "type": "text"\n            }\n          ]\n        }\n      ]\n    },\n    "issuetype": {\n      "name": "Task"\n    }\n  }\n}');
  await page.locator('.fal.fa-save').click();
});

