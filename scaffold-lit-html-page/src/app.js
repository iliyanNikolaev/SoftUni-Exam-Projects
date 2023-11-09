import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { layoutTemplate } from './views/layout.js';
import { getUserData } from './util.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { logout } from './data/auth.js';

// Todo... Change root depending on project HTML structure
const root = document.body;

page(decorateContext);
page('index.html', '/');
page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/logout', logoutAction);

page.start();

// middlewares
function decorateContext(ctx, next) {
    ctx.render = renderView;
    next();
}

function renderView(content) {
    const userData = getUserData();

    render(layoutTemplate(userData, content), root);
}

function logoutAction(ctx) {
    logout();
    ctx.page.redirect('/');
}