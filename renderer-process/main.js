
import { Carousel } from "./components/carousel/carousel.js";
import { Day } from './components/day/day.js';

const carousel = document.querySelector('app-carousel');

fetch('http://localhost:3000/news.json')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
        const data = JSON.parse(responseText);
        carousel.populateNewsCarousel(data.articles);
    });

    const mainContent = document.querySelector('section.main-content');

    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    
    for (let i = 1; i <= maxDate; i++) {
        const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        mainContent.appendChild(new Day(dayDate));
    }

    // Digitalni hodiny du c. 5

     var timePassword = '';
     window.addEventListener('keyup', (keyboardEvent) => {
        timePassword = timePassword + keyboardEvent.key;
        console.log(timePassword);
            if (timePassword === 'time') {
                showClock();
                timePassword = 'time'.replace('time', '');
            }
        });

    function showClock() {
        const clockTemplate = document.querySelector('#clock-template');
        const cloneClock = clockTemplate.content.cloneNode(true);
        document.body.appendChild(cloneClock);
        showTime();
    }
        
    function showTime() {
        var count = 0;
        var i = setInterval( () => {
        const currentTime = new Date().toLocaleTimeString();
        document.getElementById('clock').innerText = currentTime;
        
        count++;
        if (count > 5) {
            clearInterval(i);
            }   
        }, 1000);

    setTimeout( () => {
        const child = document.querySelector('#clock');
        document.body.removeChild(child);
        }, 5000);
    }



function showDayModal() {
    const template = document.querySelector('#modal-template');
    const modal = template.content.cloneNode(true);
    const closeAction = () => {
        const child = document.querySelector('section.modal-container');
        document.body.removeChild(child);
    };

    modal.querySelector('#close-modal').addEventListener('click', closeAction);

    const cancelButton = modal.querySelector('#cancel-button');

    cancelButton.addEventListener('click', closeAction);

    modal.querySelector('#save-button').addEventListener('click', () => {
        const formRef = document.querySelector('#modal-form');
        const formData = new FormData(formRef);
        const isHoliday = formData.get('isHolidayControl') === 'on';
    });

const checkbox = modal.querySelector('#limitAttendeesByGender');
const row = modal.querySelector('#genderSelectRow');
checkbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        row.classList.remove('hidden');
    } else {
        row.classList.add('hidden');
    }
})

    document.body.appendChild(modal);
}

window.showModal = showDayModal;



fetch('http://localhost:3000/contacts')
.then(serverResponse => serverResponse.text())
.then(responseText => {
const data = JSON.parse(responseText);
const select = document.querySelector('#eventAttendees');

data.forEach(it => {
    const option = document.createElement('option');
    option.setAttribute('value', it.id);
    option.innerText = `${it.first_name} ${it.last_name}`;
    select.appendChild(option);
    });
});


// fetch('http://localhost:3000/contacts')
// .then(serverResponse => serverResponse.text())
// .then(responseText => {
//     const data = JSON.parse(responseText);
//     const select = document.querySelector('#eventAttendees');                   // ziskat referenci na select s id eventAttendees

//     for (let i = 0; i < data.length; i++) {
//         const option = document.createElement('option');                        // vytvorit novy element option <option value="id"></option>
//         option.setAttribute('value', data[i].id);                               // option.setAttribute('value', ...);, 
//         option.innerText = `${data[i].first_name} ${data[i].last_name}`;        // option innerText first_name + last_name
//         select.appendChild(option);                                             // vlozit option do selectu
//     };
// });
//data.map(it => {
// });