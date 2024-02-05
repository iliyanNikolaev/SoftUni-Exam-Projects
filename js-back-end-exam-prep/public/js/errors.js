if (document.querySelectorAll('.errorMsg').length != 0) {
    const btn = document.querySelector('#submBtn');
    const form = document.querySelector('form');
    btn.remove();
    setTimeout(() => {
        removeErrors();
        form.appendChild(btn);
    }, 4000);
}

function removeErrors() {
    document.querySelectorAll('.errorMsg').forEach(x => x.remove());
}