'use strict';
/* eslint-env browser */
(() => {
    function populateList(results) {
        let user = document.getElementsByClassName('user');
        fetch('user.html')
    .then((resp) => resp.text())
    .then(function (user) {   
        for (let result in results) {  

            renderTemplate(user,results[result])
        }   
    })
    
}   
    function renderTemplate(user,result) {
    
    let str = user.replace(/\{\{\s*(.*?)\s*\}\}/g,(match,p1)=> p1.split('.').reduce(function(acc, current) {
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
