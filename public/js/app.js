const weatherform = document.querySelector('form');
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3=document.querySelector('#message-3');
const message4=document.querySelector('#dateid');
const message5=document.querySelector('#searchid');
const message6=document.querySelector('#weatherid');

 const furl = '/weather?address=delhi';
//////////////////////////////////////////////////////////
    fetch(furl).then((response) => {
        response.json().then((data) => {
            if (data.error)
                message1.textContent = data.error
            else {
                message1.textContent = data.location;
                message2.textContent = data.temperature+"\u00B0c";
                message3.textContent=data.temp_max+"\u00B0c/"+data.temp_min+"\u00B0c";
                message4.textContent=(new Date()+"").slice(0,15);
                message6.textContent=data.description;
                console.log(data.description);
            }
        })
    })
///////////////////////////////////////////////////////////
weatherform.addEventListener('submit', (eventobject) => {
    eventobject.preventDefault();
    const location = search.value;
    //message1.textContent = "Loading ....";
    //message2.textContent = "";
    //message3.textContent="";
    message5.textContent="loading..";
    const url = '/weather?address=' + location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error){
                message1.textContent = data.error
                message2.textContent = "";
                message3.textContent="";
                message4.textContent=""
                message5.textContent="Search";
               message6.textContent=""
           }
            else {
                message1.textContent = data.location;
                message2.textContent = data.temperature+"\u00B0c";
                message3.textContent=data.temp_max+"\u00B0c/"+data.temp_min+"\u00B0c";
                message4.textContent=(new Date()+"").slice(0,15);
                message5.textContent="Search";
               message6.textContent=data.description;
            }
        })
    })
});