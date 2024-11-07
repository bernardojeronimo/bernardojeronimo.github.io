const corTexto = document.getElementById('corTexto');
const corInput = document.getElementById('corInput');
const btnContador = document.getElementById('btnContador');
const contador = document.getElementById('contador');
const passaPorAqui = document.getElementById('passaPorAqui');
const randomColorInput = document.getElementById('randomColorInput');


function gerarCorAleatoria() {
    const letras = '0123456789ABCDEF';
    let cor = '#';
    for (let i = 0; i < 6; i++) {
        cor += letras[Math.floor(Math.random() * 16)];
    }
    return cor;
}

document.querySelectorAll("button[data-color]").forEach((button) => {
    button.addEventListener('click', () => {
        const color = button.dataset.color;
        corTexto.style.color = color;
    });
});


let count;
if(!localStorage.getItem('count')) {
    localStorage.setItem('count', 0);
}
btnContador.addEventListener('click', () => {
    let count = localStorage.getItem('count');
    count++;
    document.getElementById('contador').textContent = count;
    localStorage.setItem('count', count);
});

document.getElementById('contador').textContent = localStorage.getItem('count');

document.querySelector('select').onchange = function() {
    document.body.style.backgroundColor = this.value;
}

passaPorAqui.addEventListener('mouseover', () => {
    passaPorAqui.textContent = "Obrigado por passares!";
});

passaPorAqui.addEventListener('mouseout', () => {
    passaPorAqui.textContent = "Passa por aqui";
});

randomColorInput.addEventListener('input', () => {
    randomColorInput.style.backgroundColor = gerarCorAleatoria();
});

document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();

    const nome = document.querySelector('#nome').value;
    const idade = document.querySelector('#idade').value;

    const message = `Olá, o ${nome} tem ${idade} anos!`;
    document.querySelector('#message').textContent = message;
}

let counter = 0;
function count1() {
    counter++;
    document.querySelector('p').textContent = counter;
}
setInterval(count1, 1000);