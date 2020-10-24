console.log('Client side JavaScript file is loaded!');
// Selecting elements from the html
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

// Adding the 'submit' event listener to the form
weatherForm.addEventListener('submit',(e)=>{
    // preventing the default behaviour of form of reloading the page on submitting
    e.preventDefault();
    // loading gets printed in the paragraph 1 when form is submitted
    message1.textContent = 'loading...';  
    // Erasing any contents available in the paragraph 2 due to any previous searches
    message2.textContent = ''; 

    const location = search.value;
    const url = "http://localhost:3000/weather?address=" + location;
    
    // fetching the JSON file(containing forecast) for the provided location
    fetch(url).then((res)=>{
        res.json().then((data)=>{
            if(data.error){ // checking if there is error property in the response
                message1.textContent = "";
                return message2.textContent = data.error;        
            }
            message1.textContent = 'Showing results for ' + data.location;
            message2.textContent = data.forecast;
        });
    });
});

