import { describe, it, expect, vi, beforeEach } from 'vitest';
import { actions } from '../../src/routes/lessons/+page.server';
import * as fc from 'fast-check';

// Mock externe modules
vi.mock('$lib/api', () => {
    const createPlaylistWithStories = vi.fn(() => Promise.resolve({ status: 201, data: { id: 123 } }));

    return {
        createPlaylistWithStories,
    };
});

vi.mock('$app/forms', () => ({
    enhance: vi.fn(),
}));

const { createPlaylist } = actions;

describe('createPlaylist Integration Tests', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should handle random inputs gracefully (Monkey Test)', async () => {
        const mockFetch = vi.fn();

        for (let i = 0; i < 100; i++) {
            const randomTitle = Math.random().toString(36).substring(7);
            const randomDescription = Math.random().toString(36).substring(7);

            const mockFormData = {
                get: (field) =>
                    field === 'Name' ? randomTitle : field === 'Description' ? randomDescription : '',
                getAll: () =>
                    Array.from({ length: Math.floor(Math.random() * 10) }, () =>
                        Math.random().toString(36).substring(7)
                    ),
            };

            const result = await createPlaylist({
                request: { formData: () => mockFormData },
                locals: { user: { id: Math.floor(Math.random() * 1000) } },
                fetch: mockFetch,
            });

            if (result && result.status) {
                console.log(`Monkey Test - Status Code: ${result.status}`); // Log the status code
                expect(result.status).toBeGreaterThanOrEqual(200);
            } else {
                console.warn('Monkey Test: result of result.status is undefined', result);
            }
        }
    });

    it('should handle any valid input (Property-Based Test)', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string(),
                fc.string(),
                fc.array(fc.string()),
                async (title, description, stories) => {
                    const mockFetch = vi.fn();

                    const mockFormData = {
                        get: (field) =>
                            field === 'Name' ? title : field === 'Description' ? description : '',
                        getAll: () => stories,
                    };

                    const result = await createPlaylist({
                        request: { formData: () => mockFormData },
                        locals: { user: { id: Math.floor(Math.random() * 1000) } },
                        fetch: mockFetch,
                    });

                    if (result && result.status) {
                        console.log(`Property-Based Test - Status Code: ${result.status}`); // Log the status code
                        if (!title || !description || stories.length === 0) {
                            expect(result.status).toBe(400);
                        } else {
                            expect(result.status).toBeGreaterThanOrEqual(200);
                        }
                    } else {
                        console.warn('Property-Based Test: result or result.status is undefined', result);
                    }
                }
            )
        );
    });
});
