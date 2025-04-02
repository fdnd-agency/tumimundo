import { test, expect } from '@playwright/test';

function parsePlaytime(playtime) {
    const match = playtime.match(/(\d+)\s*min\s*(\d+)?\s*sec/);
    const minutes = parseInt(match[1], 10);
    const seconds = parseInt(match[2] || '0', 10);
    return minutes * 60 + seconds;
  }

test.describe('story filtering and sorting', () => {
    test('Story sorting from A-Z', async ({ page }) => {
        await page.goto('/all-stories?sorting=A-Z');
        const titles = await page.locator('.story-title').allTextContents();
        const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
        expect(titles).toEqual(sortedTitles);
      });
      

    test('Story sorting from short to long playtime', async ({ page }) => {
        await page.goto('/all-stories?sorting=short-long');
        const playtimes = await page.locator('.story-playtime').allTextContents();
        const playtimesInSeconds = playtimes.map(parsePlaytime);
        const sortedPlaytimes = [...playtimesInSeconds].sort((a, b) => a - b);
        expect(playtimesInSeconds).toEqual(sortedPlaytimes); 
      });
})
