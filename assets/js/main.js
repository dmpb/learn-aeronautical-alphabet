// Declaramos una variable con todo el alfabeto y lo convertimos en un arreglo
let alphabet = 'abcdefghijklmnopqrstuvwxyz';
alphabet = alphabet.toUpperCase().split('');


// Declaramos un array con todos los valores del alfabeto aeronaútico
let alphabetAeronatic = ['alfa', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel', 'india', 'juliett', 'kilo', 'lima', 'mike', 'november', 'oscar', 'papa', 'quebec', 'romeo', 'sierra', 'tango', 'uniform', 'victor', 'whiskey', 'x-ray', 'yankee', 'zulu'];
let indexAlphabet = 1;


// Tomamos el formulario del HTML y declaramos variables para saber el número de respuestas correctas e incorrectas
let formulario = document.getElementById('form');
let hour = document.getElementById('hour');
let input = document.getElementById('inputValueUser');
let answerCorrect = 0,
    answerWrong = 0,
    fechaFuturo, idInterval;

// Capturamos el evento cada que se envía una palabra en el input, para que valide si la respuesta es correcta y pase a la siguiente letra.
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let form = new FormData(event.target);
    let inputValue = form.get('inputValueUser');
    (inputValue.toLowerCase() === alphabetAeronatic[indexAlphabet - 1]) ? answerCorrect++ : answerWrong++;
    clearInput();
    changeLetter();
});

// Cada que le del click al input, el temporizador inicia
input.addEventListener('focus', () => {
    iniciarTemporizador(1, 0);
});

document.getElementById('resetGame').addEventListener('click', () => {
    document.location.reload(true);
});

// Limpiamos el input cada que se envía una respuesta
function clearInput() {
    document.getElementById('inputValueUser').value = '';
}

// Cambiamos la letra del alfabeto por la siguiente
function changeLetter() {
    document.getElementById('letter').innerHTML = alphabet[indexAlphabet];
    indexAlphabet++;
    if (indexAlphabet === 27) {
        clearInterval(idInterval);
        console.log('Hemos terminado');
        document.getElementById('letter').innerHTML = '¡Terminó el tiempo!'
        showResults();
    }
}

// Mostramos los resultados una vez termine el temporizador o se terminen las letras
function showResults() {
    let answer__correct = document.getElementById('answer__correct');
    let answer__wrong = document.getElementById('answer__wrong');
    answer__correct.innerHTML = answerCorrect;
    answer__wrong.innerHTML = answerWrong;
    let results = document.getElementById('content__results');
    console.log('estoy aquí');
    formulario.style.display = "none";
    results.style.display = "block";
}

const iniciarTemporizador = (minutos, segundos) => {
    if (fechaFuturo) {
        fechaFuturo = new Date(new Date().getTime());
    } else {
        console.log("Iniciar");
        const milisegundos = (segundos + (minutos * 60)) * 1000;
        fechaFuturo = new Date(new Date().getTime() + milisegundos);
    }
    clearInterval(idInterval);
    idInterval = setInterval(() => {
        const tiempoRestante = fechaFuturo.getTime() - new Date().getTime();
        if (tiempoRestante <= 0) {
            hour.textContent = milisegundosAMinutosYSegundos(tiempoRestante);
            console.log("Tiempo terminado");
            clearInterval(idInterval);
            showResults();
        } else {
            hour.textContent = milisegundosAMinutosYSegundos(tiempoRestante);
        }
    }, 50);
};

const agregarCeroSiEsNecesario = valor => {
    if (valor < 10) {
        return "0" + valor;
    } else {
        return "" + valor;
    }
}
const milisegundosAMinutosYSegundos = (milisegundos) => {
    const minutos = parseInt(milisegundos / 1000 / 60);
    milisegundos -= minutos * 60 * 1000;
    segundos = (milisegundos / 1000);
    return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(segundos.toFixed(1))}`;
};