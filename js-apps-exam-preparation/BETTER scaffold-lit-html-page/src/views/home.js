import { html } from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = () => html`
      <!-- PASTE ACTUAL TEMPLATE -->
      <div>HOME TEMPLATE</div>
`;

export const showHome = (ctx) => {
    ctx.render(homeTemplate());
} 