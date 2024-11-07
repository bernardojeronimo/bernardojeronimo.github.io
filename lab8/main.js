const corTexto = document.getElementById('corTexto');
const btnSubmit = document.getElementById('btnSubmit');
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

let count = 0;
btnContador.addEventListener('click', () => {
    count += 1;
    contador.textContent = count;
});

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