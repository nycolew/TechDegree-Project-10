const container = document.getElementById('container');
const modal = document.getElementById('modal');
const modalWindow = document.getElementById('modal-window');
let userArray = [];
let i = 0;

// FETCH DATA FROM API AND PUSH TO EMPTY ARRAY

function goFetch(url) {
  return fetch(url)
    .then(checksOut)
    .then(response => response.json())
    .catch(error => console.error(error))
}

function checksOut(response) {
  if (response.ok){
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}

goFetch('https://randomuser.me/api/?results=12&nat=us,gb')
  .then(response => userArray.push(response))
  .then(loop => {
    let users = userArray[0].results;
    for (i; i < users.length; i++) {
      const makeDiv = document.createElement('a');
      let printCard = `
        <div class="card">
          <div class="photo">
            <img src="${users[i].picture.large}" alt="Photo of ${users[i].name.first} ${users[i].name.last}">
          </div>
          <div class="card-content">
            <h2>${users[i].name.first} ${users[i].name.last}</h2>
            <p class="email">${users[i].email}</p>
            <p class="city">${users[i].location.city}</p>
          </div>
        </div>
      `;
      container.appendChild(makeDiv);
      makeDiv.innerHTML = printCard;
    }
  });

// FOR EACH ITEM IN THE RETURNED ARRAY, APPEND A DIV TO THE CONTAINER

// let users = userArray[0].results;
// for (i; i < users.length; i++) {
//   let printCard = `
//     <div class="card">
//       <div class="photo">
//         <img src="${users[i].picture.large}" alt="Photo of ${users[i].name.first} ${users[i].name.last}">
//       </div>
//       <div class="card-content">
//         <h3>${users[i].name.first} ${users[i].name.last}</h3>
//         <p class="email">${users[i].email}</p>
//         <p class="city">${users[i].location.city}</p>
//       </div>
//     </div>
//   `;
//   container.appendChild(printCard);
// }
// WHEN A CARD IS CLICKED, OPEN MODAL WINDOW AND POPULATE WITH DATA OF CLICKED USER
// WHEN CLICK OUTSIDE WINDOW IS DETECTED, CLOSE MODAL WINDOW
// ANIMATE WINDOW OPEN AND CLOSE
