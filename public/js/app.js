const weatherform = document.querySelector('form');
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3=document.querySelector('#message-3');
weatherform.addEventListener('submit', (eventobject) => {
    eventobject.preventDefault();
    const location = search.value;
    message1.textContent = "Loading ....";
    message2.textContent = "";
    message3.textContent="";
    const url = '/weather?address=' + location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error)
                message1.textContent = data.error
            else {
                message1.textContent = data.location;
                message2.textContent = "temperature is " + data.temperature + " degree celcius";
                message3.textContent="Today's min temp is "+data.temp_min+" and max temp is "+data.temp_max;
            }
            console.log(data);
        })
    })
});