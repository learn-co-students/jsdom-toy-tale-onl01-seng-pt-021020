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

    fetchAndMoveToys()
});


function fetchAndMoveToys() {
    let toys = fetch('http://localhost:3000/toys')
        .then(response => {return response.json()})
        .then(json => {
            const toyCollection = document.querySelector('div#toy-collection')
            json.forEach(toy => {
                let likesLabel = 'like'
                if (toy.likes != 1 && toy.likes != -1) {
                    likesLabel += 's'
                }

                const card = document.createElement('div')
                card.className = 'card'
                card.innerHTML = `<div class="id" hidden>${toy.id}</div>
                    <h2 class="toy-name">${toy.name}</h2>
                    <img src=${toy.image} class="toy-avatar">
                    <p><span class="toy-likes">${toy.likes}</span> ${likesLabel}</p>
                    <button class="like-btn">Like <3</button>`

                toyCollection.appendChild(card)
                const btn = card.querySelector('button.like-btn')
                btn.addEventListener('click', e => {likeToy(e.currentTarget)})
            })
        })
}

document.querySelector('input[name="submit"]').addEventListener('click', e => {
    e.preventDefault()
    addNewToy()
    })

function addNewToy() {
    const name = document.querySelector('input[name="name"]')
    const image = document.querySelector('input[name="image"]')
    const configObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            image: image.value,
            likes: 0
        })
    }

    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `<h2 class="toy-name">${name}</h2>
        <img src=${image} class="toy-avatar">
        <p><span class="toy-likes">0</span> likes</p>
        <button class="like-btn">Like <3</button>`

    const toyCollection = document.querySelector('div#toy-collection')
    toyCollection.appendChild(card)
    
    const btn = card.querySelector('button.like-btn')
    btn.addEventListener('click', e => {likeToy(e.currentTarget)})

    return fetch('http://localhost:3000/toys', configObj)
}


function likeToy(toy) {
    const card = toy.parentElement
    const id = parseInt(card.querySelector('div.id').textContent)
    const likes = card.querySelector('span.toy-likes')
    let likes_int = parseInt(likes.textContent)

    likes.textContent = ++likes_int

    const configObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            likes: likes_int
        })
    }

    return fetch(`http://localhost:3000/toys/${id}`, configObj)
}
