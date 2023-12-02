import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, editItemById } from '../data/items.js'
import { createSubmitHandler } from '../util.js';

const editTemplate = (item, onEdit) => html`
<section id="edit">
<div class="form">
  <img class="border" src="./images/border.png" alt="">
  <h2>Edit Character</h2>
  <form class="edit-form" @submit=${onEdit}>
    <input
    type="text"
    name="category"
    id="category"
    placeholder="Character Type"
    value=${item.category}
  />
  <input
    type="text"
    name="image-url"
    id="image-url"
    placeholder="Image URL"
    value=${item.imageUrl}
  />
  <textarea
  id="description"
  name="description"
  placeholder="Description"
  rows="2"
  cols="10"
>${item.description}</textarea>
<textarea
  id="additional-info"
  name="additional-info"
  placeholder="Additional Info"
  rows="2"
  cols="10"
>${item.moreInfo}</textarea>
    <button type="submit">Edit</button>
  </form>
  <img class="border" src="./images/border.png" alt="">
</div>
</section>
`;

export const showEdit = async (ctx) => {
    const id = ctx.params.id;
    const item = await getItemById(id);

    const onEdit = async (data, form) => {
        if(!data.category || !data['image-url'] || !data.description || !data['additional-info']) {
            return alert('All fields are required!');
        }

        await editItemById(id, {
            category: data.category,
            imageUrl: data['image-url'], 
            description: data.description, 
            moreInfo: data['additional-info']
          });
        form.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    ctx.render(editTemplate(item, createSubmitHandler(onEdit)));
}