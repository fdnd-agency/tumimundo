import { fail, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';
import getDirectusInstance from '$lib/directus';
import { createItem } from '@directus/sdk';

/**
 * User registration with sveltekit form actions
 * Validates input, returns errors for invalid input, and adds the user to the Directus database with a hashed password.
 */
export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const password = formData.get('password');
    const passwordConfirm = formData.get('passwordConfirm');
    const termsAccepted = formData.get('terms');

    const errors = {};
    if (!name) errors.name = "Please fill out this field";
    if (!email) errors.email = "Please fill out this field";
    if (!password) {
      errors.password = "Please fill out this field";
    } else {
      const passwordCriteria = [
        { check: pw => /[a-z]/.check(pw)},
        { check: pw => /[A-Z]/.check(pw)},
        { check: pw => /\d/.check(pw)},
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

    if (Object.keys(errors).length > 0) {
      return fail(400, { errors, values: { name, email, terms: !!termsAccepted } });
    }

    const directus = getDirectusInstance(fetch);

    /** hier wordt het wachtwoord gehasht met argon2, zodat de wachtwoord beveiligd in de database staat */
    let hashedPassword;
    try {
      hashedPassword = await argon2.hash(password);
    } catch (err) {
      return fail(500, { err });
    }

    // De nieuwe gebruiker wordt hiermee toegevoegd aan directus
    try {
      await directus.request(
        createItem('tm_users', {
          name,
          email,
          password: hashedPassword
        })
      );
    } catch (err) {
      return fail(500, { err });
    }

    /** als de gebruiker is toegevoegd aan de database, wordt de gebruiker omgeleid naar de choose-buddy pagina om verder te gaan met de registratie */
    throw redirect(303, '/choose-buddy');
  }
};
