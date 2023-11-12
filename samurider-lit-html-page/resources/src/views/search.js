import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchByModel } from '../data/motorcycles.js';
import { createSubmitHandler } from '../util.js';

const searchTemplate = (onSearch, motorcycles) => html`
<section id="search">
<div class="form">
  <h4>Search</h4>
  <form class="search-form" @submit=${onSearch}>
    <input type="text" name="search" id="search-input" />
    <button class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
<div class="search-result">
${ typeof motorcycles == 'object' 
? html`
${ motorcycles.length == 0 
? html`<h2 class="no-avaliable">No result.</h2>`
: html`${motorcycles.map(motorcycle => motorcycleTemplate(motorcycle))}`}` 
: null }
</div>
</section>`;

const motorcycleTemplate = (motorcycle) => html`
<div class="motorcycle">
<img src="${motorcycle.imageUrl}" alt="example1" />
<h3 class="model">${motorcycle.model}</h3>
<a class="details-btn" href="/details/${motorcycle._id}">More Info</a>
</div>
`
export const showSearch = async (ctx) => {

    const onSearch = async ({ search }, form) => {
        if(!search) {
            return alert('Please fill the search box!');
        }

        const motorcycles = await searchByModel(search);
        form.reset();
        ctx.render(searchTemplate(createSubmitHandler(onSearch), motorcycles));
    }

    ctx.render(searchTemplate(createSubmitHandler(onSearch)));
}