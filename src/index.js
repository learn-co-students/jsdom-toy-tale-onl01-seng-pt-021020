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

function getToys() {
  return fetch('http://localhost:3000/toys')
  //get request that fetches all the toy objects
    .then(res => res.json())
}

getToys().then(toys => {
  toys.forEach(toy => {
    //need to show all the toys
    renderToys(toy)
  })
})

function renderToys(toy) {
  //With the response data, make a <div class="card"> for each toy and add it
  //to the toy-collection div.
  //NAME
  let h2 = document.createElement('h2') //for the name
  h2.innerText = toy.name;
  //IMAGE
  let img = document.createElement('img');
  img.setAttribute('src', toy.image);
  img.setAttribute('class', 'toy-avatar');
  //img tag with the src of the toy's image attribute and the class name "toy-avatar"
  //LIKES
  //p tag with how many likes that toy has
  let likes = document.createElement('p');
  likes.innerText = `${toy.likes} likes`;

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  // btn.addEventListener('click', (e) => {
  //   console.log(e.target.dataset);
  //   likes(e)
  // })

  //make a <div class="card"> for each toy and add it to the toy-collection div.
  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  ((document.querySelector('#toy-collection')).append(divCard)
];



//Add a new toy
function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })

  })
  .then(res => res.json())
  .then((toy_object) => {
    let new_toy = renderToys(toy_object)
    (document.querySelector('#toy-collection')).append(new_toy)
  });
};


//Increase the toy's likes

//When a user clicks on a toy's like button, two things should happen:

//Conditional increase to the toy's like count without reloading the page
//A patch request sent to the server at http://localhost:3000/toys/:id updating
//the number of likes that the specific toy has

function likes(event) {
  event.preventDefault();
  let moreLikes = parseInt(event.previousElementSibling.innerText) + 1; //incrementing likes

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify ({
      "likes": moreLikes
    });
  })
  .then(res => res.json())
  .then((likeObject => {
      event.target.previousElementSibling.innerText = `${moreLikes} likes`;
  }))
};


//Adding the conditional to increase the like count without reload
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})
