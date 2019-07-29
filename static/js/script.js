const addBtn = document.getElementById('addBtn');

const card = document.querySelectorAll('.card');

card.forEach( elem =>{
    elem.addEventListener('click',  function (event) {
        console.log('hi');
        let id = event.currentTarget.dataset.id;
        window.location.href = `notes/${id}`
    })
});
