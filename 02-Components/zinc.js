'use strict';

/* eslint-env browser */
/* eslint-disable no-unused-vars */

const Zinc = {
    components: {}
};

(() => {
    const domParser = new DOMParser();

    function init() {
        //  Zinc.renderComponents();
    }

    function renderTemplate(template, data) {
        console.log('renderTemplate is called -2')
        return fetch(`${template}.html`)
            .then(res => res.text())
            .then(html => html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, variable) =>
                variable.split('.').reduce((acc, curr) => acc[curr], data) || ''));
    }

    function renderComponent(componentName){
        console.log('renderComponent is called -1')
        const component = Zinc.components[componentName];
        const nodeList = document.querySelectorAll(componentName);
        console.log(nodeList)
        for (let i = 0; i < nodeList.length; i++) {
            renderTemplate(component.templateFile, component.data)
                .then((html) => {
                    const doc = domParser.parseFromString(html, 'text/html');
                    const el = nodeList[i].insertAdjacentElement('beforeend', doc.firstChild.children[1].firstChild);
                    el.$state = {};
                    if (component.controller) {
                        el.$controller = component.controller;
                        el.$controller();
                    }
                    Zinc.components[componentName].element = el;
                });
        }
    };

    // Zinc.renderComponents = () => {
    //     Object.values(Zinc.components).forEach((component) => {
    //         Zinc.renderComponent(component.name);
    //     });
    // };

    Zinc.registerComponent = (obj) => {
        console.log('registerComponent called')
        Zinc.components[obj.componentName] = {
            componentName: obj.componentName,
            templateFile : obj.templateFile,
            data : obj.data,
            controller : obj.controller
        };
        renderComponent(obj.componentName);
    };

    document.addEventListener('DOMContentLoaded', init);
})();