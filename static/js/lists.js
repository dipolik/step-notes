const createBtn = document.getElementById('createBtn');
const title = document.getElementById('title');
const task = document.querySelectorAll('list-task');

//createBtn.addEventListener('click', async function(){
//	let list = []
//	document.querySelectorAll('.task-item').forEach(el => {
//		let obj = {
//			text: el.children[1].value,
//			status: el.querySelector('input').checked
//		}
//		list.push(obj)
//	})
//	
//	let data = {
//		type: "list",
//		title: title.value,
//		list:list
//		
//	}
//	
//	await fetch ('/api/lists', {
//		method: "POST",
//		headers: {
//			'Content-Type': 'application/json'
//		},
//		body: JSON.stringify(data)
//	})
//	window.location.href = "/";
//})
//
