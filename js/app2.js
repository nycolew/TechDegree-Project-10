
let userArray = [];
let i = 0;
const container = document.getElementById("container");
const modal = document.getElementById("modal");
const modalWindow = document.getElementById("modal_window");
let cardNumber;
let users;
let allCards;
let leftArrow;
let rightArrow;

window.addEventListener('click', clickOut);

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
    .then(function(response) {
      return response.json();
    })
    .catch(new Error('Fetch failed.'))
};

// >> Fetch data for 12 random users with only English alphabet characters

goFetch('https://randomuser.me/api/?results=12&nat=us,gb')
  .then(info => userArray.push(info))

// USE DATA TO POPULATE GRID WITH 12 USER "CARD" DIVS

  .then(loop => {
    users = userArray[0].results;
    for (i; i < users.length; i++) {
      const createLink = document.createElement('a');
      container.appendChild(createLink);

      let populateCard = `
        <div class="card">
          <div class="pic">
            <img src="${users[i].picture.medium}" alt="Picture of ${users[i].name.first} ${users[i].name.last}">
          </div>
          <div class="text">
            <h2>${users[i].name.first} ${users[i].name.last}</h2>
            <a class="email" href="mailto:${users[i].email}">${users[i].email}</a>
            <p class="city">${users[i].location.city}</p>
          </div>
        </div>
      `;

      createLink.innerHTML = populateCard;
    }

    allCards = document.querySelectorAll('.card');

  });

// WHEN CARD IS CLICKED, OPEN MODAL WINDOW WITH THAT CARD'S DATA

function openModal() {
  modal.style.display = "block";
  modalWindow.style.display = "grid";
}

function fillModal() {
  let modalHTML = `

      <span id="close-window" onclick="clickExit()">&times;</span>
      <div id="info-container">
        <span id="previous">&#10094;</span>
        <div id="windowCard">
          <img src="${users[cardNumber].picture.large}" alt="Photo of ${users[cardNumber].name.first} ${users[cardNumber].name.last}">
          <h2>${users[cardNumber].name.first} ${users[cardNumber].name.last}</h2>
          <a class="email" href="mailto:${users[cardNumber].email}">${users[cardNumber].email}</a>
          <p class="city">${users[cardNumber].location.city}</p>
        </div>
        <span id="next">&#10095;</span>
      </div>
  `;
  modalWindow.innerHTML = modalHTML;
  leftArrow = document.getElementById('previous');
  rightArrow = document.getElementById('next');
}

container.addEventListener('click', (e) => {
  for (i = 0; i < allCards.length; i++) {
    if (allCards[i] == e.target
    || allCards[i] == e.target.parentElement
    || allCards[i] == e.target.parentElement.parentElement) {
      cardNumber = i;
    }
  }
  openModal();
  setTimeout( () => { fillModal(); }, 200);
});

// WHEN ARROWS ARE CLICKED, MOVE LEFT OR RIGHT THROUGH USERS

function scrollLeft() {
  if (cardNumber > 0) {
    cardNumber -= 1;
  } else if (cardNumber == 0) {
    cardNumber = allCards.length;
  }
  setTimeout( () => { fillModal(); }, 200);
}

function scrollRight() {
  if (cardNumber < allCards.length) {
    cardNumber += 1;
  } else if (cardNumber == allCards.length) {
    cardNumber == allCards[0];
  }
  setTimeout( () => {fillModal(); }, 200);
}

leftArrow.addEventListener('click', (e) => {
  scrollLeft();
});

rightArrow.addEventListener('click', (e) => {
  scrollRight();
})

// WHEN X IS CLICKED OR AN OUTSIDE CLICK IS DETECTED, CLOSE MODAL WINDOW

function clickOut(e) {
  if (e.target == modal) {
    modal.style.display = "none";
    modalWindow.style.display = "none";
    modalWindow.innerHTML = '';
  }
}

function clickExit(e) {
  modal.style.display = "none";
  modalWindow.style.display = "none";
  modalWindow.innerHTML = '';
}

// ALLOW SEARCH BOX INPUT TO FILTER USERS BY NAME

const searchBox = document.getElementById('search');
const searchValue = searchBox.value.toLowerCase();
const allLinks = document.querySelectorAll('a');
let link;
let userName;

for (i = 0; i < allLinks.length; i++) {
  link = allLinks[i];
  userName = link.getElementByTagName('h3').innerText.toLowerCase();
  if (userName.indexOf(searchValue) < -1) {
    link.style.display = "none"; 
  }
}
