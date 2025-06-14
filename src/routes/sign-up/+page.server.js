import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { createUser, fetchCollection } from '$lib/api';

/**
 * User registration with sveltekit form actions
 * Validates input, returns errors for invalid input, and adds the user to the Directus database with a hashed password.
 */
export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const password = formData.get('password')
    const passwordConfirm = formData.get('passwordConfirm');
    const termsAccepted = formData.get('terms');
    let hashedPassword;

    const errors = {};
    if (!name) errors.name = "Please fill out this field";
    if (!email) errors.email = "Please fill out this field";
    if (!password) {
      errors.password = "Please fill out this field";
    } else {
      const passwordCriteria = [
        { check: pw => /[a-z]/.test(pw)},
        { check: pw => /[A-Z]/.test(pw)},
        { check: pw => /\d/.test(pw)},
        { check: pw => pw.length >= 8}
      ];
      for (const rule of passwordCriteria) {
        if (!rule.check(password)) {
          errors.password = "Password must contain: a lowercase letter, an uppercase letter, a number, and minimum 8 characters";
          break;
        }
      }
    }

    if (!passwordConfirm) {
      errors.passwordConfirm = "Please fill out this field";
    } else if (password !== passwordConfirm) {
      errors.passwordConfirm = "Passwords do not match";
    }

    if (!termsAccepted) {
      errors.terms = "You must accept the terms and conditions";
    }

    if (email && Object.keys(errors).length === 0) {
      const existingUsers = await fetchCollection(fetch, 'tm_users', {
        filter: { email: { _eq: email } },
        limit: 1
      });
      if (Array.isArray(existingUsers) && existingUsers.length > 0) {
        errors.email = "This email address is already registered";
      }
    }

    if (Object.keys(errors).length > 0) {
      return fail(400, { errors, values: { name, email, terms: !!termsAccepted } });
    }

     /** The password is hashed here with bcryptjs, so the password is securely stored in the database */
     try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return fail(500, { err });
    }

     /** The new user is added to Directus */
     const creationResult = await createUser(fetch, {
      name,
      email,
      password: hashedPassword
    });

    if (creationResult.status !== 201) {
      return fail(creationResult.status, { 
        errors: { general: creationResult.error } 
      });
    }

    /** If the user is added to the database, they are redirected to the choose-buddy page to continue the registration */
    throw redirect(303, '/choose-buddy');
  }
};
