'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {
    function renderComponent(element, content, userDATA) {
        //console.log(element, content); // eslint-disable-line no-console
        //console.log(userDATA)
        let str = content.replace(/\{\{\s*(.*?)\s*\}\}/g,(match,p1)=> p1.split('.').reduce(function(acc, current) {   
            return acc[current];
          },userDATA)
          ); 
     
         let ul = document.getElementById('z-user-list');
         ul.insertAdjacentHTML('beforeend',str);

    }

    function init() {
        let user = document.getElementsByClassName('user');
        let element = document.querySelector('user-item') ; 
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

        fetch('user.html')
    .then((resp) => resp.text())
    .then(function (user) {  
        //console.log(user);  
        renderComponent(element, user, userData);
    })
    }

    document.addEventListener('DOMContentLoaded', init);
})();
