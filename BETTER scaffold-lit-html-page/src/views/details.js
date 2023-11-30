import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteItemById, getItemById } from '../data/items.js';

const detailsTemplate = (item, onDelete) => html`
        <div>ITEM DETAILS</div>`;

export const showDetails = async (ctx) => {
    // IN CONTEXT YOU HAVE session object with user data
    const id = ctx.params.id;
    const item = await getItemById(id);
    
    const onDelete = async () => {
      const choice = confirm('Are you sure you want to delete this item?');
      if (choice) {
        await deleteItemById(id);
        ctx.page.redirect('/dashboard');
      }
    }

    ctx.render(detailsTemplate(item, onDelete));
}