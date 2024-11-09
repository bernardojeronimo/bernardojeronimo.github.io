document.getElementById('event1').addEventListener('click', function() {
    document.getElementById('message').textContent = "Você clicou na Festa de São Pedro!";
});

document.getElementById('event2').addEventListener('dblclick', function() {
    this.style.color = 'blue';
    document.getElementById('message').textContent = "Você deu um duplo clique no Mercado de Artesanato!";
});

document.getElementById('event3').addEventListener('mouseover', function() {
    this.style.backgroundColor = '#e0e0e0';
});

document.getElementById('event3').addEventListener('mouseout', function() {
    this.style.backgroundColor = '';
});

// Evento de mousemove
document.addEventListener('mousemove', function(event) {
    document.getElementById('message').textContent = `Mouse está em: ${event.clientX}, ${event.clientY}`;
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('message').textContent = "Você pressionou a tecla Enter!";
    }
});
