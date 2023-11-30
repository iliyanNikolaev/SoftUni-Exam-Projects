import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (onRegister) => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="register-form" @submit=${onRegister}>
              <input type="text" name="email" id="register-email" placeholder="email" />
              <input type="password" name="password" id="register-password" placeholder="password" />
              <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`;

export const showRegister = (ctx) => {
  const onRegister = async ({ email, password, ['re-password']: rePass }, form) => {
    if (password != rePass) {
      return alert('Passwords dont match!');
    }
    if (!email || !password) {
      return alert('All fields are required!')
    }
    await register(email.trim(), password.trim());
    form.reset();
    ctx.page.redirect('/');
  }

  ctx.render(registerTemplate(createSubmitHandler(onRegister)));
}