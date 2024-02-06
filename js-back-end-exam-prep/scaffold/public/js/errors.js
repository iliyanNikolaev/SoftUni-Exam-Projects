setTimeout(removeErrors, 4000);

function removeErrors() {
    document.querySelectorAll('.errorMsg').forEach(x => x.remove());
}