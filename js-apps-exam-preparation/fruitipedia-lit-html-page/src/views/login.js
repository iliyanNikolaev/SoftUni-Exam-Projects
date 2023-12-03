import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';

const loginTemplate = (onLogin) => html`
<section id="login">
<div class="form">
  <h2>Login</h2>
  <form class="login-form" @submit=${onLogin}>
    <input type="text" name="email" id="email" placeholder="email" />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="password"
    />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="#">Create an account</a>
    </p>
  </form>
</div>
</section>
`;

export const showLogin = (ctx) => {
  const onLogin = async ({ email, password }, form) => {
    if(!email || !password) {
      return alert('All fields are required!')
    }
    await login(email.trim(), password.trim());
    form.reset();
    // Todo... Use redirection location from requirments
    ctx.page.redirect('/');
  }
  
  ctx.render(loginTemplate(createSubmitHandler(onLogin)));
}