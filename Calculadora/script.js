let display = document.getElementById('display');
let listaPilas = document.getElementById('lista-pilas');
let operaciones = [];

function agregarCaracter(caracter) {
    display.value += caracter;
}

function borrarCaracter() {
    display.value = display.value.slice(0, -1);
}

function limpiarDisplay() {
    display.value = '';
}

function calcular() {
    try {
        let resultado = eval(display.value);
        operaciones.push({ operacion: display.value, resultado: resultado });
        mostrarPilas();
        display.value = resultado;
    } catch (error) {
        display.value = 'Error';
    }
}

function mostrarPilas() {
    listaPilas.innerHTML = '';
    for (let i = 0; i < operaciones.length; i++) {
        let p = document.createElement('p');
        p.textContent = operaciones[i].operacion + ' = ' + operaciones[i].resultado;
        listaPilas.appendChild(p);
    }
}

function borrarPila() {
    let indicePila = prompt('Ingrese el índice de la pila a borrar (comenzando desde 1):');
    if (indicePila && !isNaN(indicePila) && indicePila > 0 && indicePila <= operaciones.length) {
        operaciones.splice(indicePila - 1, operaciones.length - indicePila + 1);
        mostrarPilas();
    } else {
        alert('Índice de pila inválido');
    }
}

function editarPila() {
    let indicePila = prompt('Ingrese el índice de la pila a editar (comenzando desde 1):');
    if (indicePila && !isNaN(indicePila) && indicePila > 0 && indicePila <= operaciones.length) {
        mostrarModal('Editar Pila', 'Ingrese la nueva operación:', (nuevaOperacion) => {
            operaciones.splice(indicePila - 1, operaciones.length - indicePila + 1);
            calcularNuevaOperacion(nuevaOperacion);
        });
    } else {
        alert('Índice de pila inválido');
    }
}

function calcularNuevaOperacion(nuevaOperacion) {
    try {
        let resultado = eval(nuevaOperacion);
        operaciones.push({ operacion: nuevaOperacion, resultado: resultado });
        mostrarPilas();
        display.value = resultado;
    } catch (error) {
        display.value = 'Error';
    }
}

function mostrarModal(titulo, placeholder, callback) {
    let modal = document.getElementById('modal');
    let modalTitle = document.getElementById('modal-title');
    let modalInput = document.getElementById('modal-input');

    modal.style.display = 'block';
    modalTitle.textContent = titulo;
    modalInput.placeholder = placeholder;

    modalInput.value = '';
    modalInput.focus();

    let confirmarModal = document.querySelector('.modal-content button');
    confirmarModal.onclick = function () {
        modal.style.display = 'none';
        callback(modalInput.value);
    };
}

function cerrarModal() {
    let modal = document.getElementById('modal');
    modal.style.display = 'none';
}
