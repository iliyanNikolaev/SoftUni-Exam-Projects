import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCountOfGoings, goToEvent, isGoing } from '../data/bonus.js';
import { deleteItemById, getItemById } from '../data/items.js';

const detailsTemplate = (item, onDelete, goToEventHandler) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="${item.imageUrl}" alt="example1" />
  <p id="details-title">${item.name}</p>
  <p id="details-category">
    Category: <span id="categories">${item.category}</span>
  </p>
  <p id="details-date">
    Date:<span id="date">${item.date}</span></p>
  <div id="info-wrapper">
    <div id="details-description">
      <span>${item.description}</span>
    </div>
  </div>
  <h3>Going: <span id="go">${item.goings}</span> times.</h3>

  <!--Edit and Delete are only for creator-->
  <div id="action-buttons">
  ${item.canEdit ? html`
  <a href="/edit/${item._id}" id="edit-btn">Edit</a>
  <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>`
    : null}
  ${item.canGo ? html`<a href="javascript:void(0)" id="go-btn" @click=${goToEventHandler}>Going</a>` : null}
  </div>
</div>
</section>`;

export const showDetails = async (ctx) => {
  // IN CONTEXT YOU HAVE session object with user data
  const id = ctx.params.id;
  const item = await getItemById(id);
  const currentUserIsGoing = await isGoing(item._id, ctx.session._id);
  item.goings = await getCountOfGoings(item._id);

  if (ctx.session && ctx.session._id == item._ownerId) {
    item.canEdit = true;
  }
  if (ctx.session && ctx.session._id != item._ownerId && !currentUserIsGoing) {
    item.canGo = true;
  }

  const goToEventHandler = async () => {
    await goToEvent(item._id);
    ctx.page.redirect('/details/'+item._id);
  }

  const onDelete = async () => {
    const choice = confirm('Are you sure you want to delete this item?');
    if (choice) {
      await deleteItemById(id);
      ctx.page.redirect('/dashboard');
    }
  }

  ctx.render(detailsTemplate(item, onDelete, goToEventHandler));
}