import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllOffers } from '../data/offers.js';

const dashboardTemplate = (offers) => html`
 <section id="dashboard">
          <h2>Job Offers</h2>
          ${offers.length == 0 
          ? html`<h2>No offers yet.</h2>`
          : offers.map(offer => offerTemplate(offer)) }
        </section>
`;

const offerTemplate = (offer) => html`
          <div class="offer">
            <img src="${offer.imageUrl}" alt="offerImg" />
            <p>
              <strong>Title: </strong><span class="title">${offer.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
            <a class="details-btn" href="/details/${offer._id}">Details</a>
          </div>
`;

export const showDashboard = async (ctx) => {
  const offers = await getAllOffers();
  ctx.render(dashboardTemplate(offers));
}