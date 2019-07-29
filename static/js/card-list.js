let title = document.getElementById('title');
let inputText = document.querySelectorAll('.list-task');
let addTask = document.getElementById('addTask');
let changeButton = document.getElementById('change');
let deleteButton = document.getElementById('delete');
let id = document.querySelector('.container').dataset.id;


const taskInput = `
	<div class="input-group-prepend">
		<div class="input-group-text">
			<input type="checkbox">
		</div>
	</div>
	<input type="text" class="form-control list-task" data-value="">
`

title.value = title.dataset.value;

inputText.forEach(el => {
	el.value = el.dataset.value
})

addTask.addEventListener('click', function() {
	let div = document.createElement('div');
	div.className = 'input-group mb-3 task-item'
	div.innerHTML = taskInput
	let buttonWrapper = document.querySelector('.button-wrapper')
	let inputsWrapper = document.querySelector('.inputs-wrapper')
	inputsWrapper.insertBefore(div, buttonWrapper)
})

changeButton.addEventListener('click', async function(){
	let list = []
	document.querySelectorAll('.task-item').forEach(el => {
		let obj = {
			text: el.children[1].value,
			status: el.querySelector('input').checked
		}
		list.push(obj)
	})
	
	let data = {
		type: "list",
		title: title.value,
		list:list
		
	}
	
	await fetch (`../api/lists/${id}`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	window.location.href = "/";
})

deleteButton.addEventListener('click', async function(){
	await fetch(`../api/lists/${id}`, {
		method: "DELETE",
	})
		window.location.href = "/";

})