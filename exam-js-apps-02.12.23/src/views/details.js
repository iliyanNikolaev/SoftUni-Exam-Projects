import { html } from '../../node_modules/lit-html/lit-html.js';
import { getLikesByCharacterId, isLiked, likeByCharacterId } from '../data/bonus.js';
import { deleteItemById, getItemById } from '../data/items.js';

const detailsTemplate = (item, onDelete, onLike) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="${item.imageUrl}" alt="example1" />
  <div>
  <p id="details-category">${item.category}</p>
  <div id="info-wrapper">
    <div id="details-description">
      <p id="description">${item.description}</p>
      <p id ="more-info">${item.moreInfo}</p>
    </div>
  </div>
    <h3>Is This Useful:<span id="likes">${item.likesCount}</span></h3>

     <!--Edit and Delete are only for creator-->
<div id="action-buttons">
  ${item.canEdit
    ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
  <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>`
    : null}

   ${item.canLike ? html`<a href="javascript:void(0)" @click=${onLike} id="like-btn">Like</a>` : null}

</div>
  </div>
</div>
</section>`;

export const showDetails = async (ctx) => {
  const id = ctx.params.id;
  const item = await getItemById(id);
  const likesCount = await getLikesByCharacterId(item._id);
  item.likesCount = likesCount;
  item.canEdit = item._ownerId == ctx.session?._id;
  const itemIsLiked = await isLiked(item._id, ctx.session?._id);

  if (ctx.session && !item.canEdit && itemIsLiked == 0) {
    item.canLike = true;
  }

  const onLike = async () => {
    await likeByCharacterId({ characterId: item._id });
    ctx.page.redirect('/details/' + item._id)
  }

  const onDelete = async () => {
    const choice = confirm('Are you sure you want to delete this item?');
    if (choice) {
      await deleteItemById(id);
      ctx.page.redirect('/dashboard');
    }
  }

  ctx.render(detailsTemplate(item, onDelete, onLike));
}