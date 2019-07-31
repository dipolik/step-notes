const saveBtn = document.getElementById('saveBtn');
const title = document.getElementById('title');
// const task = document.querySelectorAll('list-task');
let addTask = document.getElementById('addTask');
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

addTask.addEventListener('click', function() {
	let newTask = document.createElement('div');
	newTask.className = 'input-group mb-3 task-item';
	newTask.innerHTML = taskInput;
	tasksWrapper.appendChild(newTask)
});

tasksWrapper.addEventListener('click',function (event) {
	if (event.target.classList.contains('remove-task')){
		event.target.parentNode.parentNode.remove();
	}
});

saveBtn.addEventListener('click', async function(){
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
		await fetch (`../api/lists`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		window.location.href = "/";
	}else{
		alert('ADD AT LIST ONE TASK')
	}
});

