

console.log('Client side JavaScript file is loaded!');
// Selecting elements from the html
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const forecastDiv = document.querySelector('.forecastDiv');

// Adding the 'submit' event listener to the form
weatherForm.addEventListener('submit',(e)=>{
    // preventing the default behaviour of form of reloading the page on submitting
    e.preventDefault();
    forecastDiv.textContent = '';
    // creating a paragraph message1 in forecastDiv to contain some info like loading..., error messages, and showing results of
    const message1 = document.createElement('p');
    forecastDiv.appendChild(message1);
    
    // loading gets printed in the paragraph 1 when form is submitted
    message1.textContent = 'loading...';  

    const location = search.value;
    const url = "/weather?address=" + location;
    
    // fetching the JSON file(containing forecast) for the provided location
    fetch(url).then((res)=>{
        res.json().then((data)=>{
            if(data.error){ // checking if there is error property in the response
                return message1.textContent = data.error;        
            }
            // creating a element forecastMessage in forecastDiv which will contain the info of forecast both the image and message
            const forecastMessage = document.createElement('div');
            forecastMessage.className = "forecastMessage";
            forecastDiv.appendChild(forecastMessage);
            // Element creation
                const img = document.createElement('IMG');
                const messageBox = document.createElement('div');
                const messagePara1 = document.createElement('p');
                const messagePara2 = document.createElement('p');
            // contents for message 1
            message1.textContent = 'Showing results for ' + data.location;
            // Dealing with image and forecast section
            img.src = data.forecast.iconConditionLink;
            forecastMessage.appendChild(img);
            // Sytling and inserting div message Box into forecastMessage
            forecastMessage.appendChild(messageBox);
            messageBox.style.display = "inline-block";
            // Inserting forecast info into messagPara1 and messagePara2 and then into messagebox
            messagePara1.appendChild(document.createTextNode(data.forecast.message1));
            messagePara2.textContent = data.forecast.message2;
            messageBox.appendChild(messagePara1);
            messageBox.appendChild(messagePara2);

        });
    });
});

