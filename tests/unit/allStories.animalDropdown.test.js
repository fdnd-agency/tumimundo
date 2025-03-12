import { expect, test, vi } from 'vitest';
import { fetchAnimals } from '$lib/api';
/**
 * @description Test suite voor de fetchAnimals functie
 * @test
 */
test('fetchAnimals returns correctly structured animal data', async () => {
  // Mock de getDirectusInstance functie
  vi.mock('$lib/directus', () => ({
    default: () => ({
      request: vi.fn().mockResolvedValue([
        { id: 6, animal: 'dog' }
      ])
    })
  }));

  const mockFetch = vi.fn();
  const result = await fetchAnimals(mockFetch);

  expect(Array.isArray(result)).toBe(true);
  expect(result).toHaveLength(1);
  
  const animal = result[0];
  expect(animal).toHaveProperty('id');
  expect(animal).toHaveProperty('animal');
  expect(typeof animal.id).toBe('number');
  expect(typeof animal.animal).toBe('string');
  
  expect(animal).toEqual({ id: 6, animal: 'dog' });
});
