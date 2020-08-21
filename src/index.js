let addToy = false;
const collectionDiv = document.getElementById("toy-collection");


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

    getAllToys();
});

function getAllToys() {
    fetch("http://localhost:3000/toys").then(response => {
        return response.json()
    }).then(object => {
        for (const toyObj of object) {
            renderToys(toyObj);
        }
    })
}

function renderToys(toyObj) {
    const divCard = document.createElement("div");
    divCard.classList.add("card");
    let h2 = document.createElement("h2");
    h2.innerText = toyObj.name;
    divCard.appendChild(h2);
    let img = document.createElement("img");
    img.src = toyObj.image;
    img.classList.add("toy-avatar");
    divCard.appendChild(img);
    let p = document.createElement("p");
    p.innerText = `${toyObj.likes} likes`;
    divCard.appendChild(p);
    let button = document.createElement("button");
    button.classList.add("like-btn");
    button.setAttribute("id", toyObj.id);
    button.innerText = "like <3";
    button.addEventListener('click', (e) => {
        likes(e)
    })
    divCard.appendChild(button);

    collectionDiv.appendChild(divCard);
}

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
        renderToys(object);
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