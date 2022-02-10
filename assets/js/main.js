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
let paragraph = document.getElementById('paragraph');
let results = document.getElementById('content__results');
let listWrong = document.getElementById('listWrong');
let answerCorrect = 0,
    answerWrong = 0,
    futureHour, idInterval, arrayWrong = [],
    arrayCorrect = [],
    validateTime = '';

// Capturamos el evento cada que se envía una palabra en el input, para que valide si la respuesta es correcta y pase a la siguiente letra.
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let form = new FormData(event.target);
    let inputValue = form.get('inputValueUser');
    if (inputValue.toLowerCase() === alphabetAeronatic[indexAlphabet - 1]) {
        answerCorrect++
    } else {
        answerWrong++;
        addTable(alphabetAeronatic[indexAlphabet - 1], inputValue.toLowerCase());
    }
    clearInput();
    changeLetter();
});

function addTable(wordCorrect, wordWrong) {
    let listGroup = document.createElement('tr');
    let childrenListCorrect = document.createElement('td');
    let childrenListWrong = document.createElement('td');
    let childrenWordCorrect = document.createTextNode(wordCorrect);
    let childrenWordWrong = document.createTextNode(wordWrong);
    childrenListCorrect.appendChild(childrenWordCorrect);
    childrenListWrong.appendChild(childrenWordWrong);
    childrenListWrong.className = 'error';
    listGroup.append(childrenListCorrect);
    listGroup.append(childrenListWrong);
    listWrong.append(listGroup);
    return listWrong;
}

// Cada que le del click al input, el temporizador inicia
input.addEventListener('focus', () => {
    if (validateTime) { return }
    startTimer(0, 2);
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
        showResults();
    }
}

// Mostramos los resultados una vez termine el temporizador o se terminen las letras
function showResults() {
    validateTime = '';
    let answer__correct = document.getElementById('answer__correct');
    let answer__wrong = document.getElementById('answer__wrong');
    answer__correct.innerHTML = answerCorrect;
    answer__wrong.innerHTML = answerWrong;
    document.getElementById('letter').innerHTML = '¡Terminó el tiempo!'
    if (answerWrong == 0) hideElement(document.getElementById('table'));
    let trList = document.createElement('tr');

    // for (let i = 0; i < answerWrong; i++) {
    //     let list = document.createElement('td');
    //     let text = document.createTextNode(`${arrayCorrect[i]} - ${arrayWrong[i]}`);
    //     list.append(text);
    //     trList.append(list);
    // }

    hideElement(formulario);
    hideElement(paragraph);
    hideElement(hour);

    showElement(results);
}

const startTimer = (minutes, seconds) => {
    validateTime = ' ';
    if (futureHour) {
        futureHour = new Date(new Date().getTime());
    } else {
        console.log("Iniciar");
        const miliseconds = (seconds + (minutes * 60)) * 1000;
        futureHour = new Date(new Date().getTime() + miliseconds);
    }
    clearInterval(idInterval);
    idInterval = setInterval(() => {
        const remainingTime = futureHour.getTime() - new Date().getTime();
        if (remainingTime <= 0) {
            hour.textContent = milisecondsAminutesYseconds(remainingTime);
            console.log("Tiempo terminado");
            clearInterval(idInterval);
            showResults();
        } else {
            hour.textContent = milisecondsAminutesYseconds(remainingTime);
        }
    }, 50);
};

const formatHourZero = valor => {
    if (valor < 10) {
        return "0" + valor;
    } else {
        return "" + valor;
    }
}

const milisecondsAminutesYseconds = (miliseconds) => {
    const minutes = parseInt(miliseconds / 1000 / 60);
    miliseconds -= minutes * 60 * 1000;
    seconds = (miliseconds / 1000);
    return `${formatHourZero(minutes)}:${formatHourZero(seconds.toFixed(1))}`;
};

const hideElement = (element) => {
    element.style.display = 'none';
}

const showElement = (element) => {
    element.style.display = 'block';
}