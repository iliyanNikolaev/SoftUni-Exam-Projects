import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, editItemById } from '../data/items.js'
import { createSubmitHandler } from '../util.js';

const editTemplate = (item, onEdit) => html`
<section id="edit">
<div class="form">
  <h2>Edit Fruit</h2>
  <form class="edit-form" @submit=${onEdit}>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Fruit Name"
      value=${item.name}
    />
    <input
      type="text"
      name="imageUrl"
      id="Fruit-image"
      placeholder="Fruit Image URL"
      value=${item.imageUrl}
    />
    <textarea
      id="fruit-description"
      name="description"
      placeholder="Description"
      rows="10"
      cols="50"
    >${item.description}</textarea>
    <textarea
      id="fruit-nutrition"
      name="nutrition"
      placeholder="Nutrition"
      rows="10"
      cols="50"
    >${item.nutrition}</textarea>
    <button type="submit">post</button>
  </form>
</div>
</section>`;

export const showEdit = async (ctx) => {
    const id = ctx.params.id;
    const item = await getItemById(id);

    const onEdit = async ({
        name,
        imageUrl, 
        description, 
        nutrition
      }, form) => {
        if(!name || !imageUrl || !description || !nutrition) {
            return alert('All fields are required!');
        }

        await editItemById(id, {
            name,
            imageUrl, 
            description, 
            nutrition
          });
        form.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    ctx.render(editTemplate(item, createSubmitHandler(onEdit)));
}