import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemsByQuery } from '../data/bonus.js';
import { createSubmitHandler } from '../util.js';
const searchTemplate = (onSearch, items) => html`
<section id="search">
<div class="form">
  <h2>Search</h2>
  <form class="search-form" @submit=${onSearch}>
    <input
      type="text"
      name="search"
      id="search-input"
      />
    <button class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
<div class="search-result">
${ typeof items == 'object' 
? html`
${ items.length == 0 
? html`<h2 class="no-avaliable">No result.</h2>`
: html`${items.map(item => searchItemTemplate(item))}`}` 
: null }
</div>
</section>`;

const searchItemTemplate = (item) => html`
<div class="fruit">
   <img src="${item.imageUrl}" alt="example1" />
   <h3 class="title">${item.name}</h3>
   <p class="description">${item.description}</p>
   <a class="details-btn" href="/details/${item._id}">More Info</a>
</div>
`
export const showSearch = async (ctx) => {

    const onSearch = async ({ search }, form) => {
        if(!search) {
            return alert('Please fill the search box!');
        }

        const items = await getItemsByQuery(search);
        ctx.render(searchTemplate(createSubmitHandler(onSearch), items));
    }

    ctx.render(searchTemplate(createSubmitHandler(onSearch)));
}