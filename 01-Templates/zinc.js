'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        //console.log(results); // eslint-disable-line no-console

        for (let i in results) {
            const data = {
                photo: results[i].picture.large,
                firstName: results[i].name.first,
                lastName: results[i].name.last,
                city: results[i].location.city,
                state: results[i].location.state,
                email: results[i].email
            };

            renderTemplate(results[i],data)
        }   
    }

    function renderTemplate(results,data) {

        let template = `<li class="user">
        <img class="user-photo" src="{{photo}}" alt="Photo of {{ firstName }} {{ lastName }}">
        <div class="user-name">{{firstName}} {{ lastName }}</div>
        <div class="user-location">{{ city }}, {{ state }}</div>
        <div class="user-email">{{ email }}</div>
    </li>`

   
    //let a = template.replace(/{{results.picture.large}}/g, `${results.picture.large}`);
    let str = template.replace(/\{\{\s*(.*?)\s*\}\}/g,(match,p1)=> data[p1] );     

    let ul = document.getElementById('z-user-list');
    ul.insertAdjacentHTML('afterend',str);
    
    }


    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();
