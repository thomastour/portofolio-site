document.addEventListener('DOMContentLoaded', function() {

    const date = new Date().getFullYear();
    console.log(date);
    document.getElementById('date').innerHTML = `&copy;${date} T|T `; 
})

