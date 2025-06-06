import { test, expect } from '@playwright/test';

test.describe('playlist detailpagina', () => {
  test('toont cover image', async ({ page }) => {
    await page.goto('/playlist/3219');

    const coverImage = page.locator('img.playlist-image');
    await expect(coverImage).toBeVisible();

    const src = await coverImage.getAttribute('src');
    expect(src).not.toBeNull();
    expect(src).not.toBe('');
  });
});
