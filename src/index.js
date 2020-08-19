let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toys = fetchToys().then(toys => toys.forEach(toy => renderToy(toy)));

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
        event.target.reset();
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });


});

function fetchToys() {
  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
}

function renderToy(toy) {
  const collection = document.getElementById("toy-collection");
  const card = document.createElement("div");
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const p = document.createElement("p");
  const btn = document.createElement("button");

  h2.innerHTML = toy.name;
  img.src = toy.image;
  img.className = "toy-avatar";
  p.innerHTML = toy.likes;
  btn.className = "like-btn";
  btn.innerHTML = "Like <3";

  card.appendChild(h2);
  card.appendChild(img);
  card.appendChild(p);
  card.appendChild(btn);

  collection.appendChild(card);

  btn.addEventListener("click", () => {
    event.preventDefault()
    const likes = likeToy(toy);
    p.innerText = likes;
    // event.target.reset();
  })
};

function postToy(toy) {
  let formData = {
    "name": toy.name.value,
    "image": toy.image.value,
    "likes": 0
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(obj => renderToy(obj));
};

function likeToy(toy) {
  let likes = toy.likes;
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likes + 1
    })
  };

  fetch(`http://localhost:3000/toys/${toy.id}`, configObj);

  return likes+1;
}
