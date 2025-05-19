import { fail, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';
import getDirectusInstance from '$lib/directus';
import { createItem } from '@directus/sdk';

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
    if (!password) errors.password = "Please fill out this field";
    if (!passwordConfirm) {
      errors.passwordConfirm = "Please fill out this field";
    } else if (password !== passwordConfirm) {
      errors.passwordConfirm = "Passwords do not match";
    }
    if (!termsAccepted) {
      errors.terms = "You must accept the terms and conditions";
    }

    if (Object.keys(errors).length > 0) {
      return fail(400, { errors, values: { name, email } });
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
