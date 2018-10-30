'use strict';

/* eslint-env browser */

(() => {
    const userData = {
        picture: {
            thumbnail: 'https://f4.bcbits.com/img/0001142378_10.jpg'
        },
        name: {
            first: 'Jack',
            last: 'Burton'
        },
        location: {
            city: 'San Francisco',
            state: 'CA'
        },
        email: 'jack.burton@example.com'
    };

    function renderTemplate(template, data) {
        return fetch(`${template}.html`)
            .then(res => res.text())
            .then(html => html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, variable) =>
            variable.split('.').reduce((acc, curr) => acc[curr], data) || ''));
    }

    function renderComponent(element, templateFile, content) {
        const el = document.querySelector(element);
        renderTemplate(templateFile, content)
            .then(html => el.insertAdjacentHTML('beforeend', html));
    }

    function init() {
        renderComponent('user-item', 'user', userData);
    }

    document.addEventListener('DOMContentLoaded', init);
})();