import { html } from '../../node_modules/lit-html/lit-html.js';
import { editMotorcycleById, getMotorcycleById } from '../data/motorcycles.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (motorcycle, onEdit) => html`
                <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form" @submit=${onEdit}>
              <h2>Edit Motorcycle</h2>
              <form class="edit-form">
                <input type="text" name="model" id="model" placeholder="Model" .value=${motorcycle.model} />
                <input type="text" name="imageUrl" id="moto-image" placeholder="Moto Image" .value=${motorcycle.imageUrl} />
                <input type="number" name="year" id="year" placeholder="Year" 
                .value=${motorcycle.year} />
              <input type="number" name="mileage" id="mileage" placeholder="mileage" 
              .value=${motorcycle.mileage} />
            <input type="number" name="contact" id="contact" placeholder="contact" .value=${motorcycle.contact} />
              <textarea id="about" name="about" placeholder="about" rows="10" cols="50">${motorcycle.about}</textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>`;

export const showEdit = async (ctx) => {
    const id = ctx.params.id;
    const motorcycle = await getMotorcycleById(id);

    const onEdit = async ({
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

        await editMotorcycleById(id, {  
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

    ctx.render(editTemplate(motorcycle, createSubmitHandler(onEdit)));
}