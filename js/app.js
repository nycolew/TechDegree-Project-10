const userArray = [];
const container = document.getElementById('container');
const modal = document.getElementById('modal');
const modalWindow = document.getElementById('modal_window');
let cardNumber;
let i = 0;

// CHECK RESPONSE FOR ERRORS
function checksOut(response) {
  if (response.ok) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
};

// REUSABLE FETCH FUNCTION
function goFetch(url) {
  return fetch(url)
    .then(checksOut)
    .then(response => response.json())
    .catch(new Error('Fetch failed.'))
};

// FETCH RANDOM USERS
goFetch('https://randomuser.me/api/?results=12&nat=us,gb')
  .then(info => userArray.push(info))
  .then(loop => {
    const users = userArray[0].results;
    for (let i = 0; i < userArray[0].results.length; i+=1) {
      const createLink = document.createElement('a');
      container.appendChild(createLink);

      let populateCard = `
        <div class="card clickable">
          <div class="pic clickable">
            <img src="${users[i].picture.medium}" alt="Photo of ${users[i].name.first} ${users[i].name.last}">
          </div>
          <div class="text clickable">
            <h2>${users[i].name.first} ${users[i].name.last}</h2>
            <a class="email" href="mailto:${users[i].email}">${users[i].email}</a>
            <p class="city clickable">${users[i].location.city}</p>
          </div>
      `;

      createLink.innerHTML = populateCard;
    }
  })

  // LISTEN FOR PAGE CLICKS AND OPEN MODAL WINDOW

container.addEventListener('click', (e) => {
  const allCards = document.querySelectorAll('.card');
  if (e.target.className = 'clickable') {
    for(let i =0; i < allCards.length; i+=1) {
      if (allCards[i] = e.target) {
        cardNumber = i;
      }
    }
    // POPULATE MODAL WINDOW
    function fillModal() {
      const users = userArray[0].results;
      let windowContent = `
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

      modalWindow.innerHTML = windowContent;
    }

    fillModal();
    modal.style.display = "block";
    modalWindow.style.display = "block";
  }
});
