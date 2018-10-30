'use strict';

/* eslint-env browser */
/* eslint-disable no-unused-vars */

const Zinc = {
    components: {}
};

(() => {
    const domParser = new DOMParser();

    function renderTemplate(template, data) {
        console.log('renderTemplate called -2')
        return fetch(`${template}.html`)
            .then(res => res.text())
            .then(html => html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, variable) =>
                variable.split('.').reduce((acc, curr) => acc[curr], data)));
    }

    function renderComponent(componentName) {
        console.log('renderComponent called -1')
        const component = Zinc.components[componentName];
        const nodeList = document.querySelectorAll(componentName);
        for (let i = 0; i < nodeList.length; i++) {
            renderTemplate(component.templateFile, component.data)
                .then((html) => {
                   
                    const doc = domParser.parseFromString(html, 'text/html');
                    console.log(doc)
                    const el = nodeList[i].insertAdjacentElement('beforeend', doc.firstChild.children[1].firstChild);
                    el.$state = {};
                    if (component.controller) {
                        el.$controller = component.controller;
                        el.$controller();
                    }
                    Zinc.components[componentName].element = el;
                });
        }
    }

    // function renderComponents() {
    //     Object.values(Zinc.components).forEach((component) => {
    //         renderComponent(component.componentName);
    //     });
    // }

    Zinc.registerComponent = (componentName, templateFile, data, controller) => {
        console.log('resisterComponent called')
        Zinc.components[componentName] = {
            componentName,
            templateFile,
            data,
            controller
        };
        renderComponent(componentName);
    };

    function init() {
        // renderComponents();
    }

    document.addEventListener('DOMContentLoaded', init);
})();
