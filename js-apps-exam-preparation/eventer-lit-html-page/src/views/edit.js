import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, editItemById } from '../data/items.js'
import { createSubmitHandler } from '../util.js';

const editTemplate = (item, onEdit) => html`
<section id="edit">
<div class="form">
  <h2>Edit Event</h2>
  <form class="edit-form" @submit=${onEdit}>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Event"
      value=${item.name}
    />
    <input
      type="text"
      name="imageUrl"
      id="event-image"
      placeholder="Event Image"
      value=${item.imageUrl}
    />
    <input
      type="text"
      name="category"
      id="event-category"
      placeholder="Category"
      value=${item.category}
    />


    <textarea
      id="event-description"
      name="description"
      placeholder="Description"
      rows="5"
      cols="50"
    >${item.description}</textarea>
    
    <label for="date-and-time">Event Time:</label>
    <input
    type="text"
    name="date"
    id="date"
    placeholder="When?"
    value=${item.date}
  />

    <button type="submit">Edit</button>
  </form>
</div>
</section>
`;

export const showEdit = async (ctx) => {
    const id = ctx.params.id;
    const item = await getItemById(id);

    const onEdit = async ({
        name,
        imageUrl, 
        category, 
        description, 
        date
      }, form) => {
        if(!name || !imageUrl || !category || !description || !date) {
            return alert('All fields are required!');
        }

        await editItemById(id, {
            name,
            imageUrl, 
            category, 
            description, 
            date
          });
        form.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    ctx.render(editTemplate(item, createSubmitHandler(onEdit)));
}