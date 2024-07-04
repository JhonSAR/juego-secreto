let numeroSecreto = 0;
let numeroIntentos = 0;
let listaNumeroSorteados = [];
let numeroMaximo = 10;
let numeroMaximoIntentos = 3;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${numeroIntentos} ${(numeroIntentos === 1) ? "intento" : "intentos"}`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        //El usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', "El número secreto es menor");
        } else {
            asignarTextoElemento('p', "El número secreto es mayor");
        }

        //El usuario alcanzó el máximo de intentos
        if (numeroIntentos >= numeroMaximoIntentos) {
            asignarTextoElemento('p', `Has usado el número máximo de ${numeroMaximoIntentos} intentos`);
            document.getElementById("reiniciar").removeAttribute("disabled");
        } else {
            limpiarCaja();
        }   
        numeroIntentos++;
    }    
    return;
}

function limpiarCaja() {
    document.querySelector("#valorUsuario").value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumeroSorteados);
    //Si ya sorteamos todos los números
    if (listaNumeroSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', "Ya se sorteron todos los número posibles");
    } else {
        //Si el número generado está incluido en la lista
        if (listaNumeroSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumeroSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', "Juego del número secreto!");
    asignarTextoElemento('p', `Indica un número de 1 a ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    numeroIntentos = 1;
}

function reiniciarJuego() {
    //Limpar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números
    //Generar el número aleatorio
    //inicializar el número de intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector("#reiniciar").setAttribute("disabled","true");
}

condicionesIniciales();