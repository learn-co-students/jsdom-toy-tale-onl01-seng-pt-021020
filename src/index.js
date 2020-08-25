let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
	const addBtn = document.querySelector('#new-toy-btn');
	const toyFormContainer = document.querySelector('.container');
	addBtn.addEventListener('click', () => {
		// hide & seek with the form
		addToy = !addToy;
		if (addToy) {
			toyFormContainer.style.display = 'block';
		} else {
			toyFormContainer.style.display = 'none';
		}
		
		fetch('http://localhost:3000/toys')
			.then(function(response) {
				return response.json();
			})
			.then(function(object) {
				makeToyCards(object);
			});

		const toyForm = document.querySelector('.add-toy-form');
		toyForm.addEventListener('submit', () => {
			event.preventDefault();
			makeNewToy();
		});
	});

	fetch('http://localhost:3000/toys').then((response) => response.json()).then((toyData) => {
		displayCard(toyData);
	});

	function makeNewToy() {
		const nameBtn = document.querySelector('input:nth-child(2)');
		const urlBtn = document.querySelector('input:nth-child(4)');
		fetch('http://localhost:3000/toys', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				name: `${nameBtn.value}`,
				image: `${urlBtn.value}`,
				likes: 0
			})
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(object) {
				console.log(object);
			})
			.catch(function(error) {
				alert('Bad things! Ragnarők!');
				console.log(error.message);
			});
	}

	function displayCard(object) {
		const container = document.getElementById('toy-collection');
		object.forEach((obj) => {
			let div = document.createElement('div');
			let h2 = document.createElement('h2');
			let img = document.createElement('img');
			let p = document.createElement('p');
			let btn = document.createElement('button');
			p.innerText = obj.likes + ' Likes';
			div.className = 'card';
			img.className = 'toy-avatar';
			btn.className = 'like-btn';
			btn.innerText = 'Like <3';
			btn.id = obj.id;
			btn.addEventListener('click', likeToy);
			h2.innerText = obj.name;
			img.src = obj.image;
			container.appendChild(div);
			div.appendChild(h2);
			div.appendChild(img);
			div.appendChild(p);
			div.appendChild(btn);
		});
	}

});
