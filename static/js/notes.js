const createBtn = document.getElementById('createBtn');
const title = document.getElementById('title');
const text = document.getElementById('text');

createBtn.addEventListener('click', async () =>{
    let data = {
        type: 'note',
        title: title.value,
        text: text.value
    };
    await fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
   window.location.replace('/')
});

