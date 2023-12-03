import { html } from "../../node_modules/lit-html/lit-html.js";
import { applyOffer, getApplicationsCount, isApplied } from "../data/applications.js";
import { deleteOfferById, getOfferById } from "../data/offers.js";

const detailsTemplate = (offer, onDelete, applicationsCount, onApply) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="${offer.imageUrl}" alt="offerImg" />
  <p id="details-title">${offer.title}</p>
  <p id="details-category">
    Category: <span id="categories">${offer.category}</span>
  </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${offer.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span>${offer.description}</span
      >
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span>${offer.requirements}</span>
    </div>
  </div>

  <p>Applications: <strong id="applications">${applicationsCount}</strong></p>

  <!--Edit and Delete are only for creator-->
  ${offer.canEdit
    ? html`<div id="action-buttons">
    <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
    : null}
  ${offer.canApply
    ? html`<a @click=${onApply}  href="javascript:void(0)" id="apply-btn">Apply</a>`
    : null}
  </div>
</div>
</section>
`;

export const showDetails = async (ctx) => {
  const id = ctx.params.id;
  const offer = await getOfferById(id);

  if (ctx.session && ctx.session._id == offer._ownerId) {
    offer.canEdit = true;
  }
  if (ctx.session && ctx.session._id != offer._ownerId) {
    const applied = await isApplied(offer._id, ctx.session._id);
    if(applied == 0){
      offer.canApply = true;
    }
  }

  const applicationCount = await getApplicationsCount(id);

  ctx.render(detailsTemplate(offer, onDelete, applicationCount, onApply));

  async function onDelete() {
    const choice = confirm('Are you sure you want to delete ' + offer.title + '?');
    if (choice) {
      await deleteOfferById(id);
      ctx.page.redirect('/dashboard');
    }
  }

  async function onApply() {
    await applyOffer(offer._id);
    ctx.page.redirect('/details/'+offer._id);
  }
}