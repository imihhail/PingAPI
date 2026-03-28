import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';
import fs from 'fs';
import os from 'os';
import path from 'path';

const FILE_NAME = 'config.json'; 
const DOCUMENTS_FILE = path.join(os.homedir(), '\\AppData\\Roaming\\ping', FILE_NAME);

let app;
let page;

test.beforeAll(async () => {
  try {
    await fs.promises.unlink(DOCUMENTS_FILE);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }

  app = await electron.launch({ args: ['.'] });
  page = await app.firstWindow();
});

test.afterAll(async () => {
  await app.close();
});

test('Ping button is working', async () => {
  const pingButton = page.getByRole('button', { name: 'Ping' });
  await expect(pingButton).toBeVisible();

  await pingButton.click();

  const stopButton = page.getByRole('button', { name: 'Stop' });
  await expect(stopButton).toBeVisible();

  await stopButton.click();
  await expect(pingButton).toBeVisible();
});

test('titlebar and location display correctly and ', async () => {
  page.on('pageerror', err => { throw new Error(`Page error: ${err.message}`); });
  page.on('console', msg => { if (msg.type() === 'error') throw new Error(`Console error: ${msg.text()}`); });

  const titlebar = page.locator('.titlebar');
  const location = page.locator('.pingLocation');
  const burgerBtn = page.locator('.hamburger-btn');
  const sidePanel = page.locator('.sideBar.opened');
  const sidePanelLocation = page.getByTestId('sidebarLocation');
  const locationBtn =  page.getByTestId('sideBarline-1');
  const scrollRight = page.getByTestId('scrollRight');
  const scrollLeft = page.getByTestId('scrollLeft');

  await expect(titlebar).toBeVisible();
  await burgerBtn.click();
  await expect(sidePanel).toBeVisible();
  await expect(locationBtn).toBeVisible();
  await locationBtn.click();

  const ipInputs = page.locator('input[id*="ipPart1"]');
  const ipInputs2 = page.locator('input[id*="ipPart2"]');
  const count = await ipInputs.count();

  for (let i = 0; i < count; i++) {
    await ipInputs.nth(i).type('1'); 
  }

  const locations = ['Location I', 'Location II', 'Location III', 'Location III'];

  for (const expected of locations) {
    if (expected == 'Location II') {
      for (let i = 0; i < count; i++) {
        await ipInputs2.nth(i).type('222'); 
      }
    } else if (expected == 'Location III') {
      for (let i = 0; i < count; i++) {
        await expect(ipInputs.nth(i)).toHaveValue('')
      }

      for (let i = 0; i < count; i++) {
        await expect(ipInputs2.nth(i)).toHaveValue('')
      }
    }

    await expect(location).toHaveText(expected);
    await expect(sidePanelLocation).toHaveValue(expected);
    await scrollRight.click();
  }

  const locationsLeft = ['Location II', 'Location I', 'Location I'];

  for (const expected of locationsLeft) {
    await scrollLeft.click();
    
    if (expected == 'Location II') {
      for (let i = 0; i < count; i++) {
        await expect(ipInputs2.nth(i)).toHaveValue('222')
      }

    } else if (expected == 'Location I') {
      for (let i = 0; i < count; i++) {
        await expect(ipInputs.nth(i)).toHaveValue('1')
      }
      for (let i = 0; i < count; i++) {
        await expect(ipInputs2.nth(i)).toHaveValue('')
      }
    }

    await expect(location).toHaveText(expected);
    await expect(sidePanelLocation).toHaveValue(expected);
  }
});