const Zinc = {};
(() => {
    document.addEventListener('DOMContentLoaded', init);
    
    function renderComponent(templateFile, dataObject) {
        return fetch(`${templateFile}.html`)
            .then(res => res.text())
            .then((template) => {
                return template.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, p1) => p1.split('.').reduce(function (acc, current) {
                    acc + current;
                    return acc[current];
                }, dataObject)
                );
            })
    }

    Zinc.registerComponent = function (elementName, templateFile, dataObject) {
        let element = document.querySelector(elementName);
        renderComponent(templateFile, dataObject)
            .then((result) => {
                console.log(result);
                element.insertAdjacentHTML('beforeend', result);
            })
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(res=> {
                 res.results.forEach(result => {
                    Zinc.registerComponent('user-item', 'user', result);
                 });
                    
                 
            });
    



    }

    
})();