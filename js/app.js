const userArray = [];
const container = document.getElementById('container');
const modal = document.getElementById('modal');
const modalWindow = document.getElementById('modal_window');
let cardNumber;
// let i = 0;

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
  };

  // LISTEN FOR PAGE CLICKS AND OPEN MODAL WINDOW

container.addEventListener('click', (e) => {
  const allCards = document.querySelectorAll('.card');
  if (e.target.className == 'clickable') {
    fillModal();
    modal.style.display = "block";
    modalWindow.style.display = "block";
    for(let i =0; i < allCards.length; i+=1) {
      if (allCards[i] == e.target) {
        cardNumber = i;
      }
    }
  }
});

// So, made some changes in there and got things to work @Nycole! :slightly_smiling_face: The first, and biggest change I made was to your `if` statement in your event listener.
// Because you are checking for all elements inside of the container that have the class of "clickable", you could have your pic div, your text div, H2s As, or Ps that are being
// clicked, but when you are comparing them to the allcards array, it has to be the card element that is being compared or it won't pass.
// To fix this, I added some or clauses to your conditional so that it doesn't just check the element that was clicked, but its parent and grandparent as well. Also, inside that `if`
// block, you are going to go ahead and want to set modal display style and call the fill modal function, where you have the call to fillModal
// now is actually calling the function on each iteration of the loop, which is why you are always ending up with the final employee being displayed.
// Just because I think the way I described the if statement is a little confusing to read, it may be easier to just share the conditional I came up with:
// `if (allCards[i] === e.target || allCards[i] === e.target.parentElement || allCards[i] === e.target.parentElement.parentElement) {`
// Hope this helps!
