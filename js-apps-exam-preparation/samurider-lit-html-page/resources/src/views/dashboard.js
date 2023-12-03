import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllMotorcycles } from '../data/motorcycles.js';

const dashboardTemplate = (motorcycles) => html`
        <h2>Available Motorcycles</h2>
        <section id="dashboard">
            ${motorcycles.map(motorcycle => motorcycleTemplate(motorcycle))}
        </section>
        ${motorcycles.length == 0 ? html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>` : null}
`;

const motorcycleTemplate = (motorcycle) => html`<div class="motorcycle">
<img src="${motorcycle.imageUrl}" alt="example1" />
<h3 class="model">${motorcycle.model}</h3>
<p class="year">Year: ${motorcycle.year}</p>
<p class="mileage">Mileage: ${motorcycle.mileage}</p>
<p class="contact">Contact Number: ${motorcycle.contact}</p>
<a class="details-btn" href="/details/${motorcycle._id}">More Info</a>
</div>`;

export const showDashboard = async (ctx) => {
    const motorcycles = await getAllMotorcycles();
    ctx.render(dashboardTemplate(motorcycles));
}