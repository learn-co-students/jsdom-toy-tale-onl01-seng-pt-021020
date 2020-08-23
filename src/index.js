let addToy = false;
const toysURL = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
    })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
});

function getToys() {
  fetch(toysURL).then(resp => resp.json()).then(arr => addToys(arr));
}

function addToys(toys) {
  const divTag = document.getElementById('toy-collection')
  for (const element of toys) {

    const card = document.createElement('div');
    card.setAttribute('id', 'toy-card')
    const header = document.createElement('h2');
    const img = document.createElement("img");
    const p = document.createElement('p')
    const btn = document.createElement("button");

    btn.innerHTML = 'LIKE'
    btn.classList.add('like-btn')
    btn.setAttribute("id", element.id);
    btn.addEventListener('click', (e) => {
      likes(e)
    })

    p.innerText = `${element.likes} Likes`

    img.src = element.image
      img.setAttribute("height", "250");
      img.setAttribute("width", "250");
      img.classList.add('toy-avatar')

    header.innerText = element.name

    card.appendChild(header);
    card.appendChild(img);
    card.appendChild(p)
    card.appendChild(btn)

    divTag.appendChild(card)
  }
};

function postToy(toyData) {
  fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          "name": toyData.name.value,
          "image": toyData.image.value,
          "likes": 0
      })
  }).then(response => {
      return response.json()
  }).then(object => {
      addToys(object);
  })
}

function likes(e) {
  e.preventDefault()
  let addedLike = parseInt(e.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          "likes": addedLike
      })
  }).then(response => {
      return response.json()
  }).then(likedObject => {
      e.target.previousElementSibling.innerText = `${addedLike} likes`;
  }).catch(error => {
      document.body.innerHTML = error.message
  })
}
