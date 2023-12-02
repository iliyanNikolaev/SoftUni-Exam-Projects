import { html } from '../../node_modules/lit-html/lit-html.js';

const userTemplate = () => html`
<div class="user">
<a href="/create">Add Character</a>
<a href="/logout">Logout</a>
</div>`;

const guestTemplate = () => html`
<div class="guest">
<a href="/login">Login</a>
<a href="/register">Register</a>        
</div>`;

// Todo... Replace with actual layout
export const layoutTemplate = (userData, content) => html`
<header>
<!-- Navigation -->
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt=""/></a>
<nav>
  <div>
    <a href="/dashboard">Characters</a>
  </div>

${userData ? userTemplate() : guestTemplate()}
</nav>
</header>
    <main>
        ${content}
    </main>
`;

