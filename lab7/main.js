const corTexto = document.getElementById('corTexto');
const btnRed = document.getElementById('btnRed');
const btnGreen = document.getElementById('btnGreen');
const btnBlue = document.getElementById('btnBlue');
const btnSubmit = document.getElementById('btnSubmit');
const corInput = document.getElementById('corInput');
const btnContador = document.getElementById('btnContador');
const contador = document.getElementById('contador');

function mudarCor(color) {
    corTexto.style.color = color;
}

btnRed.addEventListener('click', () => mudarCor('red'));
btnGreen.addEventListener('click', () => mudarCor('green'));
btnBlue.addEventListener('click', () => mudarCor('blue'));

btnSubmit.addEventListener('click', () => {
    const color = corInput.value;
    document.body.style.backgroundColor = color;
});

let count = 0;
btnContador.addEventListener('click', () => {
    count += 1;
    contador.textContent = count;
});
