import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../data/items.js'
import { createSubmitHandler } from '../util.js';

const createTemplate = (onCreate) => html`
<section id="create">
<div class="form">
  <h2>Add Event</h2>
  <form class="create-form" @submit=${onCreate}>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Event"
    />
    <input
      type="text"
      name="imageUrl"
      id="event-image"
      placeholder="Event Image URL"
    />
    <input
      type="text"
      name="category"
      id="event-category"
      placeholder="Category"
    />


    <textarea
      id="event-description"
      name="description"
      placeholder="Description"
      rows="5"
      cols="50"
    ></textarea>
    
    <input
    type="text"
    name="date"
    id="date"
    placeholder="When?"
  />

    <button type="submit">Add</button>
  </form>
</div>
</section>

`;

export const showCreate = async (ctx) => {
    const onCreate = async ({
        name,
        imageUrl, 
        category, 
        description, 
        date
      } , form) => {
        if(!name || !imageUrl || !category || !description || !date) {
            return alert('All fields are required!');
        }

        await createItem({
            name,
            imageUrl, 
            category, 
            description, 
            date
          });
        form.reset();
        ctx.page.redirect('/dashboard')
    }

    ctx.render(createTemplate(createSubmitHandler(onCreate)));
}