function goFetch(url) {
  return fetch(url)
    .then(response => response.json)
};

goFetch('https://randomuser.me/api/?results=12');
