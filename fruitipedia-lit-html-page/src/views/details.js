import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteItemById, getItemById } from '../data/items.js';

const detailsTemplate = (item, onDelete) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="${item.imageUrl}" alt="example1" />
  <p id="details-title">${item.name}</p>
  <div id="info-wrapper">
    <div id="details-description">
      <p>${item.description}</p>
      <p id="nutrition">Nutrition</p>
      <p id = "details-nutrition">${item.nutrition}</p>
    </div>
     ${item.canEdit ? html`<div id="action-buttons">
     <a href="/edit/${item._id}" id="edit-btn">Edit</a>
     <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
   </div>` : null}
  </div>
</div>
</section>
`;

export const showDetails = async (ctx) => {
  // IN CONTEXT YOU HAVE session object with user data
  const id = ctx.params.id;
  const item = await getItemById(id);
  item.canEdit = item._ownerId == ctx.session?._id;

  const onDelete = async () => {
    const choice = confirm('Are you sure you want to delete this item?');
    if (choice) {
      await deleteItemById(id);
      ctx.page.redirect('/dashboard');
    }
  }

  ctx.render(detailsTemplate(item, onDelete));
}