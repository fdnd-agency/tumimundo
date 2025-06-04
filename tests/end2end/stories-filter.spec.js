/** @author Marjam Lodien */
import { test, expect } from '@playwright/test';

// fomatteert de playtime van een verhaal van "min + sec" naar totale seconden. (deze functie wordt alleen gebruikt door de test hieronder)
function parsePlaytime(playtime) {
    const match = playtime.match(/(\d+)\s*min\s*(\d+)?\s*sec/);
    const minutes = parseInt(match[1], 10);
    const seconds = parseInt(match[2] || '0', 10);
    return minutes * 60 + seconds;
  }

test.describe('story filtering and sorting', () => {
  test('Story sorting from short to long playtime', async ({ page }) => {
    await page.goto('/all-stories?sorting=short-long');
    const playtimes = await page.locator('.story-playtime').allTextContents();
    const playtimesInSeconds = playtimes.map(parsePlaytime);
    const sortedPlaytimes = [...playtimesInSeconds].sort((a, b) => a - b);
    expect(playtimesInSeconds).toEqual(sortedPlaytimes); 
  });

  test('Story sorting from A-Z', async ({ page }) => {
      await page.goto('/all-stories?sorting=A-Z');
      
      const titles = await page.locator('.story-title').allTextContents();
      const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
      expect(titles).toEqual(sortedTitles);
    });
      
  test('Stories are correctly filtered by the language "Dutch"', async ({ page }) => {
      await page.goto('/all-stories?language=Dutch');
    
      // Selecteert alle vlaggenafbeeldingen van de talen van de stories
      // De waarde van de alt-attribuut van elke afbeelding wordt opgehaald, dit resulteert in een array met bijvoorbeeld "dutch" voor de Nederlandse vlag
      const languages = await page.locator('.story-language img').evaluateAll(
        imgs => imgs.map(img => img.alt)
      );
    
      // Controleer dat er minimaal 1 verhaal gevonden is.
      expect(languages.length).toBeGreaterThan(0);
    
      // Controleer dat elke vlag het juiste alt-attribuut "Dutch" heeft.
      for (const language of languages) {
        expect(language).toBe('Dutch');
      }
    });
})