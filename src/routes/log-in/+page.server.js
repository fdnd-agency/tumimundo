import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { fetchCollection } from '$lib/api';

export const actions = {
  default: async ({ request, fetch }) => {
    let formData, email, password, users, user, valid = false;

    // Get form data
    formData = await request.formData();
    email = formData.get('email-input');
    password = formData.get('password-input');

    // Check if both fields are filled
    if (!email || !password) {
      return fail(400, { error: 'Please fill out both fields.' });
    }

    // Fetch user from the database by email
    users = await fetchCollection(fetch, 'tm_users', {
      filter: { email: { _eq: email } },
      limit: 1
    });
    user = users && users[0];

    // Check if user exists
    if (!user) {
      return fail(401, { error: 'Invalid email or password.' });
    }

    try {
      // Compare provided password with hashed password
      valid = await bcrypt.compare(password, user.password);
    } catch (e) {
      return fail(500, { error: 'Internal error during login.' });
    }

    // If password is not valid
    if (!valid) {
      return fail(401, { error: 'Invalid email or password.' });
    }

    // Successful login, redirect to profile selection
    throw redirect(303, '/profile-selection');
  }
};
