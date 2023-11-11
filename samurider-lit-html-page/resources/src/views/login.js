import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';

const loginTemplate = (onLogin) => html`
        <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onLogin}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input type="password" name="password" id="password" placeholder="password" />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`;

export const showLogin = (ctx) => { 
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));
    
    // Todo... Change user object, if it necessary, according to project requirments 
    async function onLogin({ email, password }, form) {
        await login(email.trim(), password.trim());
        form.reset();
        // Todo... Use redirection location from requirments
        ctx.page.redirect('/');
    }
}