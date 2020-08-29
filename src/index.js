const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector("#toy-collection")

document.addEventListener("DOMContentLoaded", () =>{
  fetch("http://localhost:3000/toys")
    .then(r => r.json())
    .then(toys => {
      //take this toys array of objects, make it into HTML, and add to the DOM
      let toysHTML = toys.map(function(toy){
        return `
          <div class="card">
            <h2>${toy.name}</h2>
            <img src=${toy.image} class="toy-avatar" />
            <p>${toy.likes} Likes </p>
            <button data-id="${toy.id}"class="like-btn">Like <3</button>
          </div>
        `
      })
      document.querySelector("#toy-collection").innerHTML = toysHTML.join("")
      //use =+ toysHTML if the div had something in it already
    })

toyForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const toyName = e.target.name.value
  const toyImage = e.target.image.value
  //now we have the data we can send to the database

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 100
    })
  })
  .then( r => r.json())
  //convert new JSON toy object to HTML in order to add to the DOM
  .then( newToy => {

    let newToyHTML = `
      <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes} Likes </p>
        <button data-id="${newToy.id}"class="like-btn">Like <3</button>
      </div>
    `
    toyCollection.innerHTML += newToyHTML
    console.log(e.target.reset())


    })
})


toyCollection.addEventListener("click", (e) => {
  if (e.target.className === "like-btn") {
    //listen only if a button with a classname of like-btn is clicked
    let currentLikes = parseInt(e.target.previousElementSibling.innerText)
    let newLikes = currentLikes + 1
    e.target.previousElementSibling.innerText = newLikes + " likes"
    //this updated the DOM

    //this updates the db
    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
      //e.target is the FORM. the form has a data-id attached to it. this ensures the correct URL


  }
})


  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // toyForm.addEventListener('submit', event => {
      //   event.preventDefault()
      //   postToy(event.target)
      // })
    } else {
      toyForm.style.display = 'none'
    }
  })
});
