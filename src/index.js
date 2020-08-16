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
});

document.addEventListener('DOMContentLoaded', fetchAndMoveToys)

function fetchAndMoveToys() {
    let toys = fetch('http://localhost:3000/toys')
        .then(response => {return response.json())
    const toyCollection = document.querySelector('div#toy-collection')

    toys.forEach(toy => {
        const card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `<h2>${toy.name}</h2>
            <img src=${toy.image} class="toy-avatar">
            <p>${toy.likes} ${() => {
                if (toy.likes == 1) {
                    return 'like'
                } else {
                    return 'likes'
                }}}</p>
            <button class="like-btn">Like <3</button>`

        toyCollection.appendChild(card)
    }
}

document.querySelector('input#submit').addEventListener('click', e => {
    e.preventDefault()
    addNewToy
    })

function addNewToy() {
    const name = document.querySelector('input[name="name"])
    const image = document.querySelector('input[name="image"])
    const configObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            image: image,
            likes: 0
        })
    }

    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `<h2>${name}</h2>
        <img src=${image} class="toy-avatar">
        <p>0 likes</p>
        <button class="like-btn">Like <3</button>`

        document.querySelector('div#toy-collection').appendChild(card)

    return fetch('http://localhost:3000/toys', configObj)
}

document.querySelectorAll('button.like-btn').forEach(btn => {btn.addEventListener('click', () => {likeToy(this)})})

function likeToy(toy) {

