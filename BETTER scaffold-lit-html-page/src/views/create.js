import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../data/items.js'
import { createSubmitHandler } from '../util.js';

const createTemplate = (onCreate) => html`
        <!-- PASTE ACTUAL TEMPLATE -->
        <div>CREATE TEMPLATE</div>
`;

export const showCreate = async (ctx) => {
    const onCreate = async ({
        // paste correct data from requirments 
        model,
        imageUrl, 
        year, 
        mileage,
        contact,
        about 
    }, form) => {
        if(!model || !imageUrl || !year || !mileage || !contact || !about) {
            return alert('All fields are required!');
        }

        await createItem({  
            model,
            imageUrl, 
            year, 
            mileage,
            contact,
            about 
        });
        form.reset();
        ctx.page.redirect('/dashboard')
    }

    ctx.render(createTemplate(createSubmitHandler(onCreate)));
}