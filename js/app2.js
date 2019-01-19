
let userArray = [];
let i = 0;
const container = document.getElementById('container');
const modal = document.getElementById('modal');
const modalWindow = document.getElementById('modal_window');
let cardNumber;




// FETCH DATA FROM API AND CONVERT TO JSON
// >> Set function to check responses for errors

function checksOut(response) {
  if (response.ok) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
};

// >> Set reusable fetch function

function goFetch(url) {
  return fetch(url)
    .then(checksOut)
    .then(info => info.json())
    .catch(new Error('Fetch failed.'))
};

// >> Fetch data for 12 random users with only English alphabet characters

goFetch('https://randomuser.me/api/?results=12&nat=us,gb')
  .then(info => userArray.push(info))

// USE DATA TO POPULATE GRID WITH 12 USER "CARD" DIVS

  .then(loop => {
    const users = userArray[0].results;
    for (i; i < users.length; i++) {
      const createLink = document.createElement('a');
      container.appendChild(createLink);

      let populateCard = `
        <div class="card clickable">
          <div class="pic clickable">
            <img src="${users[i].picture.medium}" alt="Picture of ${users[i].name.first} ${users[i].name.last}">
          </div>
          <div class="text clickable">
            <h2>${users[i].name.first} ${users[i].name.last}</h2>
            <a class="email clickable" href="mailto:${users[i].email}">${users[i].email}</a>
            <p class="city clickable">${users[i].location.city}</p>
          </div>
        </div>
      `;

      createLink.innerHTML = populateCard;
    }
  });

// WHEN CARD IS CLICKED, OPEN MODAL WINDOW WITH THAT CARD'S DATA

function openModal() {
  modal.style.display = "block";
  modalWindow.style.display = "block";
}

function fillModal() {
  const users = userArray[0].results;
  let modalHTML = `
    <span id="close-window">&times;</span>
    <span id="previous" onclick="scrollLeft()">&#10094;</span>
    <div id="windowCard">
      <img src="${users[cardNumber].picture.large}" alt="Photo of ${users[cardNumber].name.first} ${users[cardNumber].name.last}">
      <h2>${users[cardNumber].name.first} ${users[cardNumber].name.last}</h2>
      <a class="email" href="mailto:${users[cardNumber].email}">${users[cardNumber].email}</a>
      <p class="city">${users[cardNumber].location.city}</p>
    </div>
    <span id="next" onclick="scrollRight()">&#10095;</span>
  `;
}

const allCards = document.querySelectorAll('.card');
container.addEventListener('click', (e) => {
  if (e.target.className === 'clickable') {
    for (i = 0; i < allCards[0].length; i++) {
      if (allCards[i] == e.target
      || allCards[i] == e.target.parentElement
      || allCards[i] == e.target.parentElement.parentElement) {
        cardNumber = i;
      }
      console.log(cardNumber);
    }
    openModal();
    setTimeout(fillModal(), 500);
  }
});

// WHEN ARROWS ARE CLICKED, MOVE LEFT OR RIGHT THROUGH USERS

// WHEN X IS CLICKED OR AN OUTSIDE CLICK IS DETECTED, CLOSE MODAL WINDOW

// ALLOW SEARCH BOX INPUT TO FILTER USERS BY NAME
