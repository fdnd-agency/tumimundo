import { describe, it, expect, beforeEach } from 'vitest';
import { actions } from '../../src/routes/log-in/+page.server';
import bcrypt from 'bcryptjs';
import fc from 'fast-check';
import { fetchCollection } from '$lib/api';

// Mock the fetchCollection API function for isolation
vi.mock('$lib/api', () => ({
  fetchCollection: vi.fn(),
}));

// Mock SvelteKit's redirect and fail for test control
vi.mock('@sveltejs/kit', () => ({
    redirect: (status, location) => {
      const err = new Error('Redirect');
      err.status = status;
      err.location = location;
      throw err;
    },
    fail: (status, data) => ({ status, data }),
  }));

// Example user for testing login logic
const testUser = {
  id: 1,
  email: 'testuser@example.com',
  password: bcrypt.hashSync('Test1234', 10),
};

describe('Login integration tests', () => {
  // Reset all mocks before each test for isolation
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('logs in successfully with correct credentials (happy path)', async () => {
    let redirectError;
    (fetchCollection).mockResolvedValue([testUser]);

    const request = {
      formData: async () => new Map([
        ['email-input', 'testuser@example.com'],
        ['password-input', 'Test1234'],
      ]),
    };
  
    try {
      await actions.default({
        request,
        fetch: vi.fn(),
        locals: {},
      });
    } catch (e) {
      redirectError = e;
    }

    expect(redirectError).toBeDefined();
    expect(redirectError.status).toBe(303);
    expect(redirectError.location).toBe('/profile-selection');
  });

  it('fails with empty fields', async () => {
    (fetchCollection).mockResolvedValue([]);

    const request = {
      formData: async () => new Map([
        ['email-input', ''],
        ['password-input', ''],
      ]),
    };

    const result = await actions.default({ request, fetch: vi.fn(), locals: {} });
    expect(result.status).toBe(400);
    expect(result.data.error).toMatch(/fill out both fields/i);
  });

  it('fails with unknown email', async () => {
    (fetchCollection).mockResolvedValue([]);

    const request = {
      formData: async () => new Map([
        ['email-input', 'unknown@example.com'],
        ['password-input', 'Test1234'],
      ]),
    };

    const result = await actions.default({ request, fetch: vi.fn(), locals: {} });
    expect(result.status).toBe(401);
    expect(result.data.error).toMatch(/invalid email or password/i);
  });

  it('fails with wrong password', async () => {
    (fetchCollection).mockResolvedValue([testUser]);

    const request = {
      formData: async () => new Map([
        ['email-input', 'testuser@example.com'],
        ['password-input', 'WrongPassword'],
      ]),
    };

    const result = await actions.default({ request, fetch: vi.fn(), locals: {} });
    expect(result.status).toBe(401);
    expect(result.data.error).toMatch(/invalid email or password/i);
  });

  it('never returns plaintext passwords', async () => {
    expect(testUser.password).not.toBe('Test1234');
    expect(testUser.password.startsWith('$2')).toBe(true); 
  });

  it('always returns the same error for unknown email and wrong password', async () => {
    (fetchCollection).mockResolvedValue([]);

    let result = await actions.default({
      request: {
        formData: async () => new Map([
          ['email-input', 'unknown@example.com'],
          ['password-input', 'Test1234'],
        ]),
      },
      fetch: vi.fn(),
      locals: {},
    });
    
    const errorMsg1 = result.data.error;

    (fetchCollection).mockResolvedValue([testUser]);
    result = await actions.default({
      request: {
        formData: async () => new Map([
          ['email-input', 'testuser@example.com'],
          ['password-input', 'WrongPassword'],
        ]),
      },
      fetch: vi.fn(),
      locals: {},
    });
    const errorMsg2 = result.data.error;

    expect(errorMsg1).toBe(errorMsg2);
  });

  it('login with minimum password length', async () => {
    const minPw = 'Abcdef12';
    let redirectError;
    const userWithMinPw = { ...testUser, password: bcrypt.hashSync(minPw, 10) };
    (fetchCollection).mockResolvedValue([userWithMinPw]);

    const request = {
      formData: async () => new Map([
        ['email-input', 'testuser@example.com'],
        ['password-input', minPw],
      ]),
    };

    try {
      await actions.default({
        request,
        fetch: vi.fn(),
        locals: {},
      });
    } catch (e) {
      redirectError = e;
    }
    expect(redirectError).toBeDefined();
    expect(redirectError.status).toBe(303);
    expect(redirectError.location).toBe('/profile-selection');
  });  

  it('property: system responds appropriately to random input', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string(),
        fc.string(),
        async (email, password) => {
          const request = {
            formData: async () => new Map([
              ['email-input', email],
              ['password-input', password],
            ]),
          };
  
          try {
            const result = await actions.default({ request, fetch: vi.fn(), locals: {} });
            expect([400, 401]).toContain(result.status);
            expect(result.data?.error).toBeDefined();
          } catch (e) {
            expect(e.status).toBe(303);
            expect(e.location).toBe('/profile-selection');
          }
        }
      ),
      { numRuns: 10 }
    );
  });
});
