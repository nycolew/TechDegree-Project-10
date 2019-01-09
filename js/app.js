const userArray = [];
const container = document.getElementById('container');

// REUSABLE FETCH FUNCTION
function goFetch(url) {
  return fetch(url)
    .then(checkOK)
    .then(response => response.json)
    .catch(new Error('Fetch failed.'))
};

// FETCH RANDOM USERS
goFetch('https://randomuser.me/api/?results=12&nat=us,gb')
  .then(info => userArray.push(info))
  .then(loop => {
    for (let i = 0, i <= userArray[0].results.length, i+=1) {
      const users = userArray[0].results;
      const createLink = document.createElement('a');
      container.appendChild('createLink');

      let populateCard = `
        <div class="card">
          <div class="pic">
            <img src="${users[i].picture.medium}" alt="Photo of ${users[i].name.first} ${users[i].name.last}">
          </div>
          <h2>${users[i].name.first} ${users.name.last}</h2>
          <a href="mailto:${users[i].email}">${users[i].email}</a>
          <p>${users[i].location.city}</p>
      `;

      createLink.innerHTML = populateCard;
    }
  })
