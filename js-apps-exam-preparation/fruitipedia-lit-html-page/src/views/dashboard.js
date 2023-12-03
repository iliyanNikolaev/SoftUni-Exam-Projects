import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../data/items.js';

const dashboardTemplate = (items) => html`
<h2>Fruits</h2>
<section id="dashboard">
  ${items.map(x => dashboardItemTemplate(x))}
</section>
 ${items.length == 0 ? html`<h2>No fruit info yet.</h2>` : null }
`;

const dashboardItemTemplate = (item) => html`
<div class="fruit">
    <img src="${item.imageUrl}" alt="example1" />
    <h3 class="title">${item.name}</h3>
    <p class="description">${item.description}.</p>
    <a class="details-btn" href="/details/${item._id}">More Info</a>
  </div>
`;

export const showDashboard = async (ctx) => {
    const items = await getAllItems();
    ctx.render(dashboardTemplate(items));
}