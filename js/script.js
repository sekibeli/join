// let users = [];

/**
 * fetches the JSON from backend and put it in the arrays tasks, contacts, categories
 */
async function init() {
    setURL('https://julia-georgiew.developerakademie.net/joingroup/smallest_backend_ever');
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    categories = JSON.parse(backend.getItem('categories')) || [];
}

/**
 * includes the header and sidebar
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


