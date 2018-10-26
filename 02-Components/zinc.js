const Zinc = {};

(() => {
    function renderTemplate(templateFile, dataObject) {
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
        renderTemplate(templateFile, dataObject)
            .then((result) => {
                console.log(result);
                element.insertAdjacentHTML('beforeend', result);
            })
    }

    function init() {

    }

    document.addEventListener('DOMContentLoaded', init);
})();
