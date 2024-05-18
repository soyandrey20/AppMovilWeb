
 import { API_URL } from '../config.js';

const tpPersona = [];


async function addTp_persona() {
    const descripcion = document.getElementById('tp_persona').value;
    const estado = true;

    const data = {
        descripcion: descripcion,
        estado: estado
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}/Tipo_persona`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {

        if (this.readyState === 4 && this.status === 201) {
            Swal.fire({
                title: 'Tipo de persona creado',
                text: 'El tipo de persona ha sido creado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            window.location.href = 'Tp_persona.html';
        } else {
            console.error('Error add Tipo de persona:', this.statusText);
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido crear el tipo de persona',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    xhr.send(JSON.stringify(data));
}

const addDepartamentoBtn = document.getElementById('addTp_persona');
addDepartamentoBtn.addEventListener('click', validarTp_persona);




async function getTp_persona() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Tipo_persona`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const tp_personas = JSON.parse(this.responseText);
            tpPersona.push(...tp_personas);
            console.log(tpPersona);
        }
    }
    xhr.send();
}
getTp_persona();

function validarTp_persona() {
    const nombre = document.getElementById('tp_persona').value;
    for (let i = 0; i < tpPersona.length; i++) {
        if (nombre == tpPersona[i].descripcion) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El tipo de persona ya existe',
                confirmButtonText: 'Aceptar'
            });
            return;
        }



    }
    addTp_persona();
}

const btnSetings = document.getElementById('btnSetings');
btnSetings.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/tipo_personas/tp_personas_crud.html`;
});