let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");
  const toyList = document.getElementById("toy-collection");


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

   // add toy collection
   fetch('http://localhost:3000/toys')
    .then(reponse => reponse.json())
    .then(toys => {
      // create elements
      toys.map( toy => {

        const div = document.createElement('div');
        const p = document.createElement('p');
        // insert content
        p.innerHTML = `
          <h2>${toy.name}</h2>
          <img src="${toy.image}" width="150px" height=150px" class="toy-avatar">
          Likes:<p>${toy.likes}</p>
          `
        // button
        const likebutton = document.createElement('button')
        likebutton.className = "like-btn"
        likebutton.id = toy.id
        likebutton.textContent = "Like <3"
        div.className = "card"
        p.appendChild(likebutton)



        // append elements
        div.appendChild(p)
        toyList.appendChild(div)
   })
 })


 toyForm.addEventListener('submit', (e) => {
   e.preventDefault()

   const toyName = event.target.name.value
   const toyImage = event.target.image.value

   fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
   })
  })
   .then(response => response.json())
   .then(toyInput => {
      toyInput.map(obj => {
        const div = document.createElement('div');
        const p = document.createElement('p');

        // insert content
        p.innerHTML = `
        <h2>${obj.name}</h2>
        <img src="${obj.image}" width="150px" height=150px" class="toy-avatar">
        Likes:<p>${obj.likes}</p>
        `
        // button
        const likebutton = document.createElement('button')
        likebutton.className = "like-btn"
        likebutton.id = obj.id
        likebutton.textContent = "Like <3"
        p.appendChild(likebutton)



        div.className = "card"

        // append elements
        div.appendChild(p)
        toyList.appendChild(div)
        })
   })
 })

 toyList.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
      e.preventDefault()
      // add like
      const toyId = e.target.id
      const likesElement = e.target.parentElement.querySelector('p')
      const likes = parseInt(likesElement.textContent)
      const newLikes = likes + 1;
      likesElement.textContent = likes + 1;


      // patch
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      }
    )

    }
 })
//  function postToy(name, image) {
//   let config = {
//     method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   },
//   body: JSON.stringify({
//     name,
//     image,
//     likes: 0
//   })
// }

// return fetch('http://localhost:3000/toys', config)
//     .then(response => response.json())
//     .then(toy => {
//     const div = document.createElement('div')
//     const p = document.createElement('p')

//     // insert content
//     p.innerHTML = `
//       <h2>${toy.name}</h2>
//       <img src="${toy.image}" width="150px" height=150px" class="toy-avatar">
//       <p> Likes: ${toy.likes}</p>
//       <button class="like-btn">Like <3</button>
//       `
//     div.className = "card"

//     // append elements
//     div.appendChild(p)
//     const toyList = document.getElementById("toy-collection")
//     toyList.appendChild(div)
//   })
//   .catch(error => console.log(error.message))
// }

});
