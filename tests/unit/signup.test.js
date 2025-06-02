/** @author Marjam Lodien */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { actions } from '../../src/routes/sign-up/+page.server.js';

/** The bcryptjs hash module is mocked so the test does not depend on the library itself, but we can still get a fake hashed password. */
vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(async pw => `hashed_${pw}`),
    compare: vi.fn(async (pw, hash) => hash === `hashed_${pw}`)
  }
}));

/** The functions from the api are mocked */
vi.mock('$lib/api', () => {
  const fetchCollection = vi.fn();
  const createUser = vi.fn();
  return { fetchCollection, createUser, _mocks: { fetchCollection, createUser } };
});

/** SvelteKit helpers are mocked here. This allows us to simulate redirects and errors in the test */
vi.mock('@sveltejs/kit', () => ({
  redirect: (status, location) => {
    const err = new Error('Redirect');
    err.status = status;
    err.location = location;
    throw err;
  },
  fail: (status, data) => ({ status, data }),
}));

/** This mocks a request object and form object */
function makeRequest(form) {
  return {
    formData: async () => ({
      get: key => form[key],
    }),
  };
}

describe('Sign-up Unit', () => {
  let fetchCollection, createUser;
  /** The beforeEach ensures that before every test the mock functions are retrieved and available for the test */
  beforeEach(async () => {
    ({ fetchCollection, createUser } = (await import('$lib/api'))._mocks);
  });

  it('should succeed when all fields are valid and terms are accepted', async () => {
    fetchCollection.mockResolvedValue([]);
    createUser.mockResolvedValue({ status: 201, data: { id: 123 } });

    let redirect;
    try {
      await actions.default({
        request: makeRequest({
          name: 'user',
          email: `user@example.com`,
          password: 'ValidPassword1',
          passwordConfirm: 'ValidPassword1',
          terms: 'on',
        }),
        fetch: vi.fn(),
      });
    } catch (e) {
      redirect = e;
    }
    expect(redirect?.status).toBe(303);
    expect(redirect?.location).toBe('/choose-buddy');
  });

  it('should fail if fields are empty', async () => {
    const res = await actions.default({ request: makeRequest({}), fetch: vi.fn() });
    expect(res.status).toBe(400);
    expect(res.data.errors).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      passwordConfirm: expect.any(String),
      terms: expect.any(String),
    });
  });

  it('should fail on weak password', async () => {
    const res = await actions.default({
      request: makeRequest({
        name: 'Test',
        email: 'unique2@example.com',
        password: 'weak',
        passwordConfirm: 'weak',
        terms: 'on',
      }),
      fetch: vi.fn(),
    });
    expect(res.status).toBe(400);
    expect(res.data.errors.password).toBeDefined();
  });

  it('should fail if passwords do not match', async () => {
    const res = await actions.default({
      request: makeRequest({
        name: 'Test',
        email: 'unique3@example.com',
        password: 'Password1',
        passwordConfirm: 'Password2',
        terms: 'on',
      }),
      fetch: vi.fn(),
    });
    expect(res.status).toBe(400);
    expect(res.data.errors.passwordConfirm).toBeDefined();
  });

  it('should fail if terms not accepted', async () => {
    const res = await actions.default({
      request: makeRequest({
        name: 'Test',
        email: 'unique4@example.com',
        password: 'Password1',
        passwordConfirm: 'Password1',
        terms: null,
      }),
      fetch: vi.fn(),
    });
    expect(res.status).toBe(400);
    expect(res.data.errors.terms).toBeDefined();
  });

  it('should fail if email already exists', async () => {
    fetchCollection.mockResolvedValue([{ id: 1, email: 'unique5@example.com' }]);
    const res = await actions.default({
      request: makeRequest({
        name: 'Test',
        email: 'unique5@example.com',
        password: 'Password1',
        passwordConfirm: 'Password1',
        terms: 'on',
      }),
      fetch: vi.fn(),
    });
    expect(res.status).toBe(400);
    expect(res.data.errors.email).toBeDefined();
  });
})