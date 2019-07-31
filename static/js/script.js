const addBtn = document.getElementById('addBtn');

const cardNote = document.querySelectorAll('.card-note');
const cardList = document.querySelectorAll('.card-list');

cardNote.forEach(elem => {
	elem.addEventListener('click', function (event) {
		let id = event.currentTarget.dataset.id;
		window.location.href = `notes/${id}`
	})
});

cardList.forEach(elem => {
	elem.addEventListener('click', function (event) {
		let id = event.currentTarget.dataset.id;
		window.location.href = `lists/${id}`
	})
});
