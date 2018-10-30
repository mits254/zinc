const Zinc = {
    components:{}
};
(() => {
    
    Zinc.registerComponent = function (elementName, templateFile, data) {
        console.log('registerComponent is called')
        Zinc.components[elementName] = {
            elementName,
            templateFile,
            data
        };
        renderComponent(elementName, templateFile, data)
    }

    function renderTemplate(template, data) {
        console.log('renderTemplate is called -3')
        return fetch(`${template}.html`)
            .then(res => res.text())
            .then((html) => {
                return html.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, p1) => p1.split('.').reduce(function (acc, current) {
                    
                    return acc[current];
                }, data)
                );
            })
    }

    function renderComponent(element, templateFile, content) {
        console.log('renderComponent is called -2')
        const nodeList = document.querySelectorAll(element);
        console.log(element)
        for (let i = 0; i < nodeList.length; i++) {
            renderTemplate(templateFile, content)
                .then(html => nodeList[i].insertAdjacentHTML('beforeend', html));
        }
    }

    // function renderComponents() {
    //     console.log('renderComponents is called-1')
    //     console.log('this is Zinc :',Zinc.components)
    //      Object.values(Zinc.components).forEach((component) => {
            
    //         //renderComponent(component.elementName, component.templateFile, component.data);
    //     });
        
    // }



    function init() {
        // renderComponents();

    }
    document.addEventListener('DOMContentLoaded', init);


})();