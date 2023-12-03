import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../data/items.js';

const dashboardTemplate = (items) => html`
<!-- Dashboard page -->
<h2>Current Events</h2>
<section id="dashboard">
    ${items.map(x => dashboardItemTemplate(x))}   
</section>
${items.length == 0 ? html`<h4>No Events yet.</h4>` : null}
`;

const dashboardItemTemplate = (item) => html`
<div class="event">
<img src="${item.imageUrl}" alt="example1" />
<p class="title">${item.name}</p>
<p class="date">${item.date}</p>
<a class="details-btn" href="/details/${item._id}">Details</a>
</div>
`;

export const showDashboard = async (ctx) => {
    const items = await getAllItems();
    ctx.render(dashboardTemplate(items));
}