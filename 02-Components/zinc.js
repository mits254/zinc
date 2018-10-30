const Zinc = {};
(() => {
    Zinc._components = {};
    document.addEventListener('DOMContentLoaded', init);
   
    function renderTemplate(templateFile, dataObject) {
        return fetch(`${templateFile}.html`)
            .then(res => res.text())
            .then((template) => {
                return template.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, p1) => p1.split('.').reduce(function (acc, current) {
                    return acc[current];
                }, dataObject)
                );
            })
    }

    Zinc.registerComponent = function (elementName, templateFile, dataObject,controller) {
        Zinc._components[elementName] = {
         elementName, 
         templateFile,
         dataObject,
         controller
        }
        let component = Zinc._components[elementName];
        let elements = document.querySelectorAll(elementName);

        //console.log(elements);
        for(let i= 0; i< elements.length; i++){
            renderTemplate(templateFile, dataObject)
            .then((result) => {
               // console.log(result);
                let parser = new DOMParser();
                  let data = parser.parseFromString(result,'text/html');
                  
                  const el = elements[i].insertAdjacentElement('beforeend', data.firstChild.children[1].firstChild);
                  //console.log(el);
                  el.$state = {};
                    if (component.controller) {
                        el.$controller = component.controller;
                        el.$controller();
                    }
                    Zinc._components[elementName].element = el;
                // let el = dataObject.insertAdjacentHTML('beforeend',data.firstChild.children[1].firstChild);
                // el.$state= {};
                // if(controller) {
                //     el.$controller = controller;
                //     el.$controller();
                // }
                //elements.insertAdjacentHTML('beforeend', result);
            })
        
                // let ela = document.getElementsByClassName(templateFile)
                // console.log(JSON.stringify(ela));
        }
            
    }
    

    function init() {
        

    }

    
})();
