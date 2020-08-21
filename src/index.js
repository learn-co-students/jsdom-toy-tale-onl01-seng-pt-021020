
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then((toys) => render(toys));

  function render(toys) {
    let toyCollection = document.getElementById('toy-collection');
    toyCollection.innerHTML = '';

    toys.forEach((toy) => {
      let card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class='toy-avatar' ></img>
      <p>Likes: ${toy.likes || 0} </p>
      <button class='like-btn'>Like <3</button>
      <button class='dislike-btn'>Dislike :(</button>
      `;
      toyCollection.append(card);

      let likeButton = card.querySelector('.like-btn');
      let dislikeButton = card.querySelector('.dislike-btn');
      
      likeButton.addEventListener('click', (e) => {
        e.preventDefault();
        toy.likes = parseInt(toy.likes) + 1;
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'applicaton/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({"likes": toy.likes})
        }).then(resp => resp.json())
        .then(object => {
          render(toys)
        })
      });


    })
  }

  const addToyButton = document.querySelector('.submit');
  addToyButton.addEventListener('click', (e) => {
    let newToyName = document.getElementsByClassName('input-text')[0].value;
    let newToyPic = document.getElementsByClassName('input-text')[1].value;

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newToyName,
        image: newToyPic,
        likes: 0
      })
    });
  });
});