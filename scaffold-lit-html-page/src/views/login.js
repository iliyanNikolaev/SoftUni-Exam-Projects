import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';

const loginTemplate = (onLogin) => html`
<h1>Login</h1>
<form @submit=${onLogin}>
    <input type="email" name="email" placeholder="email...">
    <input type="password" name="password" placeholder="password...">
    <input type="submit" value="Login">
</form>
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