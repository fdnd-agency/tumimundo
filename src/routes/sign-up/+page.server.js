import { fail, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';
import getDirectusInstance from '$lib/directus';
import { createItem } from '@directus/sdk';

export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const password = formData.get('password')

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
