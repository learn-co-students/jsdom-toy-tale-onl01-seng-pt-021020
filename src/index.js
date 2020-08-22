let addToy = false;

// Variables
const toyCollection = document.getElementById('toy-collection')
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
// Functions

function createToy(toy) {
  let div = document.createElement('div');
  let h2 = document.createElement('h2');
  let img = document.createElement('img');
  let p = document.createElement('p');
  let button = document.createElement('button')
  div.className = "card";
  div.id = toy.id;
  img.className = "toy-avatar";
  button.className = "like-btn";
  h2.innerText = `${toy.name}`;
  img.src = `${toy.image}`;
  p.innerHTML = `${toy.likes} Likes`;
  button.innerText = "Like <3";
  button.id = `${toy.id}`
  div.innerHTML = h2.outerHTML + img.outerHTML + p.outerHTML + button.outerHTML;
  toyCollection.appendChild(div);
}

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => renderToys(json));
}

function fetchToyForm(name, image) {
  fetch("http://localhost:3000/toys", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": "0"
    })
  })
  .then(resp => resp.json())
  .then(object => {
    createToy(object)
  })
}

function renderToys(json) {
  json.forEach(toy => createToy(toy))
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  toyFormContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = event.target.name.value;
    let image = event.target.image.value;
    fetchToyForm(name, image);
    toyFormContainer.style.display = "none";
  });
  toyCollection.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.className === "like-btn") {
      toyId = event.target.id;
      toyElement = document.getElementById(toyId);
      likes = toyElement.querySelector('p');
      likesInt = parseInt(likes.innerText)
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          'likes': `${++likesInt} Likes`
        })
      })
      .then(resp => resp.json())
      .then(object => {
        likes.innerText = object.likes
      })
    }
  })

});
