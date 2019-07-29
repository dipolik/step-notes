let title = document.getElementById('title');
title.value = title.dataset.value;
let text = document.getElementById('text');
text.value = text.dataset.value;

let changeBtn = document.getElementById('change');
let deleteBtn = document.getElementById('delete');
let id = document.querySelector('.container').dataset.id;


changeBtn.addEventListener('click', async function () {
	let data = {
		title: title.value,
		text: text.value
	};
	await fetch(`../api/notes/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	window.location.href = '/'
});

deleteBtn.addEventListener('click', async function () {
	await fetch(`../api/notes/${id}`, {
		method: 'DELETE',
	});
	window.location.href = '/'
});
