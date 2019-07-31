let title = document.getElementById('title');
let inputText = document.querySelectorAll('.list-task');
let addTask = document.getElementById('addTask');
let changeButton = document.getElementById('change');
let deleteButton = document.getElementById('delete');
let id = document.querySelector('.container').dataset.id;
let tasksWrapper = document.querySelector('.tasks-wrapper');


const taskInput = `
	<div class="input-group-prepend">
		<div class="input-group-text">
			<input type="checkbox">
		</div>
	</div>
	<input type="text" class="form-control list-task" data-value="">
	<div class="input-group-append">
<button class="btn btn-danger remove-task" type="button" id="button-addon2">-</button>
</div>
`

title.value = title.dataset.value;

inputText.forEach(el => {
	el.value = el.dataset.value
});

addTask.addEventListener('click', function() {
	let newTask = document.createElement('div');
	newTask.className = 'input-group mb-3 task-item';
	newTask.innerHTML = taskInput;
	tasksWrapper.appendChild(newTask)
});

changeButton.addEventListener('click', async function(){
	let list = [];
	let taskItems = document.querySelectorAll('.task-item');
	taskItems.forEach(el => {
		if (el.children[1].value){
			let obj = {
				text: el.children[1].value,
				status: el.querySelector('input').checked
			};
			list.push(obj)
		}
	});

	if (list.length > 0){
		let data = {
			type: "list",
			title: title.value,
			list:list
		};
		await fetch (`../api/lists/${id}`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		window.location.href = "/";
	}else{
		alert('ADD AT LIST ONE TASK')
	}
})

deleteButton.addEventListener('click', async function(){
	await fetch(`../api/lists/${id}`, {
		method: "DELETE",
	})
		window.location.href = "/";

})

tasksWrapper.addEventListener('click',function (event) {
		if (event.target.classList.contains('remove-task')){
			event.target.parentNode.parentNode.remove();
		}
	});
