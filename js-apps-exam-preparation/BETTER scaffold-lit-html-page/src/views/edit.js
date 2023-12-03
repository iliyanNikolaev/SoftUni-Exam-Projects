import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, editItemById } from '../data/items.js'
import { createSubmitHandler } from '../util.js';

const editTemplate = (item, onEdit) => html`
        <!-- PASTE ACTUAL TEMPLATE -->
        <div>EDIT TEMPLATE</div>
`;

export const showEdit = async (ctx) => {
    const id = ctx.params.id;
    const item = await getItemById(id);

    const onEdit = async ({
        // paste correct data from requirments 
        model,
        imageUrl, 
        year, 
        mileage,
        contact,
        about
      } 
      , form) => {
        if(!model || !imageUrl || !year || !mileage || !contact || !about) {
            return alert('All fields are required!');
        }

        await editItemById(id, {  
            model,
            imageUrl, 
            year, 
            mileage,
            contact,
            about 
        });
        form.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    ctx.render(editTemplate(item, createSubmitHandler(onEdit)));
}