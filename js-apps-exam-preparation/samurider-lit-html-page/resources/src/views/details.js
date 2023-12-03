import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteMotorcycleById, getMotorcycleById } from '../data/motorcycles.js';

const detailsTemplate = (motorcycle, onDelete) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${motorcycle.imageUrl}" alt="example1" />
            <p id="details-title">${motorcycle.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${motorcycle.year}</p>
                <p class="mileage">Mileage: ${motorcycle.mileage}</p>
                <p class="contact">Contact Number: ${motorcycle.contact}</p>
                   <p id = "motorcycle-description">${motorcycle.about}</p>
              </div>
               ${motorcycle.canEdit ? html`<div id="action-buttons">
            <a href="/edit/${motorcycle._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
          </div>` : null}
        </div>
        </div>
      </section>`;

export const showDetails = async (ctx) => {
    const id = ctx.params.id;
    const motorcycle = await getMotorcycleById(id);
    motorcycle.canEdit = motorcycle._ownerId == ctx.session?._id;
    
    const onDelete = async () => {
      const choice = confirm('Are you sure you want to delete ' + motorcycle.model + '?');
      if (choice) {
        await deleteMotorcycleById(id);
        ctx.page.redirect('/dashboard');
      }
    }

    ctx.render(detailsTemplate(motorcycle, onDelete));
}