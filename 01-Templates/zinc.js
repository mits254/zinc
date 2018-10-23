'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        //console.log(results); // eslint-disable-line no-console

        let div = document.createElement('div');
        document.body.appendChild(div);
        div.setAttribute('class','container');

        let H1 = document.createElement('h1');
        div.appendChild(H1);
        H1.innerText = 'USER LIST'

        for (let i in results) {
            let newUl = document.createElement("ul");
            newUl.setAttribute('class', 'user-list');
            newUl.setAttribute('id', 'z-user-list');
            div.appendChild(newUl);

            let newli = document.createElement("li");
            newli.setAttribute('class', 'user');
            newUl.appendChild(newli);

            let image = document.createElement('img');
            image.setAttribute('class','user-photo');
            image.setAttribute('src',results[i].picture.large);
            newli.appendChild(image);

            let div1 = document.createElement('div');
            newli.appendChild(div1);
            div1.setAttribute('class', 'user-name');
            div1.innerText = results[i].name.first +' '+ results[i].name.last;

            let div2 = document.createElement('div');
            newli.appendChild(div2);
            div2.setAttribute('class','user-location');
            div2.innerHTML = results[i].location.city +' , ' + results[i].location.state;

            let div3 = document.createElement('div');
            newli.appendChild(div3);
            div3.setAttribute("class","user-email");
            div3.innerText = results[i].email;



        }

    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();
