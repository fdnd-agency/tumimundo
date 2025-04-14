import { describe, it, expect, vi, beforeEach } from 'vitest';
import { actions } from '../../src/routes/lessons/+page.server';

// Mock externe modules
vi.mock('$lib/api', () => {
    const createPlaylistWithStories = vi.fn(() => Promise.resolve({ status: 201, data: { id: 123 } }));
    const fetchAllData = vi.fn(() =>
        Promise.resolve({
            playlists: [],
            stories: [],
            audios: [],
            languages: [],
            playlistStories: [],
        })
    );
    const mapPlaylistsWithDetails = vi.fn((playlists, stories) =>
        playlists.map((playlist) => ({
            ...playlist,
            stories,
        }))
    );
    const mapStoriesWithDetails = vi.fn((stories, audios, languages) =>
        stories.map((story) => ({
            ...story,
            audios,
            languages,
        }))
    );

    return {
        createPlaylistWithStories,
        fetchAllData,
        mapPlaylistsWithDetails,
        mapStoriesWithDetails
    };
});

vi.mock('$app/forms', () => ({
    enhance: vi.fn(),
}));

const { createPlaylist } = actions;

describe('createPlaylist Unit Tests', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    // Testcase 1: Succesful playlist creation
    it('should create a playlist successfully', async () => {
      const mockFetch = vi.fn();
      const mockFormData = {
          get: (field) => (field === 'Name' ? 'Test Playlist' : 'Test Description'),
          getAll: () => ['1', '2'],
      };
  
      const result = await createPlaylist({
          request: { formData: () => mockFormData },
          locals: { user: { id: 1 } },
          fetch: mockFetch,
      });
  
      expect(result.status).toBe(201);
      expect(result).toEqual({
          status: 201,
          success: true,
          redirect: '/playlist/123', // Match the actual result's redirect property
      });
  });
  

    // Testcase 2: Validation of required fields
    it('should validate required fields', async () => {
      const mockFetch = vi.fn();
      const mockFormData = {
          get: () => '',
          getAll: () => [],
      };

      const result = await createPlaylist({
          request: { formData: () => mockFormData },
          locals: {},
          fetch: mockFetch,
      });

      expect(result.status).toBe(400);
      expect(result).toEqual(expect.objectContaining({ 
          status: 400,
          data: {
              error: 'Validation failed',
              errors: {
                  title: 'Title is required',
                  description: 'Description is required',
                  stories: 'At least one story must be selected',
              },
              values: {
                  title: '',
                  description: '',
              },
          }
      }));
  });
})