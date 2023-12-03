import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (onRegister) => html`
<h1>Register</h1>
<form @submit=${onRegister}>
    <input type="email" name="email" placeholder="email...">
    <input type="password" name="password" placeholder="password...">
    <input type="password" name="rePass" placeholder="repeat password...">
    <input type="submit" value="Register">
</form>
`;

export const showRegister = (ctx) => { 
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));
    
    // Todo... Change user object, if it necessary, according to project requirments 
    async function onRegister({ email, password, rePass }, form) {
        if(password != rePass) {
            return alert('Passwords dont match!');
        }
        if(!email || !password) {
            return alert('All fields are required!')
        }
        await register(email.trim(), password.trim());
        form.reset();
        // Todo... Use redirection location from requirments
        ctx.page.redirect('/');
    }
}