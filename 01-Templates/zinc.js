'use strict';
/* eslint-env browser */
(() => {
    function populateList(results) {
        
        for (let result in results) {        
            renderTemplate(results[result])
        }   
    }
    
    function renderTemplate(result) {

        let template = `<li class="user">
        <img class="user-photo" src="{{ picture.large }}" alt="Photo of {{ name.first }} {{ name.last }}">
        <div class="user-name">{{ name.first }} {{ name.last }}</div>
        <div class="user-location">{{ location.city }}, {{ location.state }}</div>
        <div class="user-email">{{ email }}</div>
    </li>`;
   
    //let a = template.replace(/{{results.picture.large}}/g, `${results.picture.large}`);
    
    let str = template.replace(/\{\{\s*(.*?)\s*\}\}/g,(match,p1)=> p1.split('.').reduce(function(acc, current) {
       acc + current;
       return acc[current];
     },result)
     ); 

    let ul = document.getElementById('z-user-list');
    ul.insertAdjacentHTML('beforeend',str);
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();
