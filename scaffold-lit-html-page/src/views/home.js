import { html } from '../../node_modules/lit-html/lit-html.js';

// Todo... Replace with actual home view 
const homeTemplate = () => html`
<h1>Home page</h1>
<p>Welcome to our site</p>
`;

export const showHome = (ctx) => {
    ctx.render(homeTemplate());
} 