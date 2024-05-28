
import { API_URL } from '../config.js';

const tp_parametro = [];
const back = document.getElementById('back');

back.addEventListener('click', () => {
    window.location.href = '/vistas/edicion/tp_parametro/tp_parametro_crud.html';
});

async function getTpParametro() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Tipo_parametro`);

    const SelectTipoParametro = document.getElementById('SelectTipoParametro');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            tp_parametro.push(...data);

        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };

    xhr.send();
}

getTpParametro();

async function validarTpParametro() {
    const descriptionParametro = document.getElementById('descriptionPara');
    const SelectTipoParametro = document.getElementById('SelectTipoParametro');
    if (descriptionParametro.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El campo tipo parametro no puede ser ese',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    if (SelectTipoParametro.value === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El campo tipo parametro no puede ser ese',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    if (tp_parametro.find(parametro => parametro.Descripcion === descriptionParametro.value) !== undefined) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El tipo parametro ya existe',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    addParametro()
}



async function addParametro() {
    const descriptionParametro = document.getElementById('descriptionPara');
    const xhr = new XMLHttpRequest();

    xhr.open('post', `${API_URL}/Tipo_parametro`);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        Descripcion: descriptionParametro.value
    }));
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);
            Swal.fire({
                icon: 'success',
                title: 'Tipo parametro creado',
                text: 'Tipo parametro creado correctamente',
                confirmButtonText: 'Aceptar'
            });
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };


}

const addSensorButton = document.getElementById('addPara');
addSensorButton.addEventListener('click', validarTpParametro);

btnSetings.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/tp_parametro/tp_parametro_crud.html`;
});