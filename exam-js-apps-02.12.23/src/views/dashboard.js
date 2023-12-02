import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../data/items.js';

const dashboardTemplate = (items) => html`
<h2>Characters</h2>
<section id="characters">
${items.map((x) => dashboardItemTemplate(x))}
  
</section>
${items.length == 0 ? html`<h2>No added Heroes yet.</h2>` : null}
`;

const dashboardItemTemplate = (item) => html`
<div class="character">
<img src="${item.imageUrl}" alt="example1" />
<div class="hero-info">
  <h3 class="category">${item.category}</h3>
  <p class="description">${item.description}</p>
  <a class="details-btn" href="/details/${item._id}">More Info</a>
</div>
</div>
`;

export const showDashboard = async (ctx) => {
    const items = await getAllItems();
    ctx.render(dashboardTemplate(items));
}