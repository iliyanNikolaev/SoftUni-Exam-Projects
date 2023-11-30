import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../data/items.js';

const dashboardTemplate = (items) => html`
        <div>DASHBOARD</div>
`;

const dashboardItemTemplate = (item) => html`
    <div>DASHBOARD ITEM</div>
`;

export const showDashboard = async (ctx) => {
    const items = await getAllItems();
    ctx.render(dashboardTemplate(items));
}