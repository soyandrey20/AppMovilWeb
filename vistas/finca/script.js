import {API_URL} from '../config.js';

const fincas = [];

async function getFincas() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/fincas`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const finca = JSON.parse(this.responseText);
            fincas.push(...finca);
            console.log(fincas);
        }
    }
    xhr.send();
}



async function getUsuarios() {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Usuarios`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const SelectCedula = document.getElementById('SelectCedula');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const usuarios = JSON.parse(this.responseText);

            for (let i = 0; i < usuarios.length; i++) {
                const usuario = usuarios[i];
                const option = document.createElement('option');
                option.value = usuario.Cedula;
                option.innerText = usuario.Cedula;
                SelectCedula.appendChild(option);
            }

        } else {
            console.error('Error get Usuarios:', this.status);
        }
    };
    xhr.send();
}



async function getVereda() {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Vereda`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const SelectVereda = document.getElementById('SelectVereda');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const veredas = JSON.parse(this.responseText);

            for (let i = 0; i < veredas.length; i++) {
                const vereda = veredas[i];
                const option = document.createElement('option');
                option.value = vereda.id;
                option.innerText = vereda.nombre;
                SelectVereda.appendChild(option);
                console.log(vereda);
            }

        } else {
            console.error('Error get Vereda:', this.status);
        }
    };
    xhr.send();
}



async function addFinca() {
    const nombre = document.getElementById('Nombre').value;
    const cedula = document.getElementById('SelectCedula').value;
    const vereda = document.getElementById('SelectVereda').value;
    const estado = true;

    const data = {
        nombre: nombre,
        cedula: cedula,
        id_vereda: vereda,
        estado: estado
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}/Fincas`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 201) {
            Swal.fire({
                title: 'Finca creada',
                text: 'La finca ha sido creada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            window.location.href = 'Finca.html';
        } else {
            console.error('Error add Finca:', this.statusText);
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido crear la finca',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    xhr.send(JSON.stringify(data));
}

document.getElementById('addFinca').addEventListener('click', validarFinca);


async function validarFinca() {
    const nombre = document.getElementById('Nombre').value;
    const cedula = document.getElementById('SelectCedula').value;
    const vereda = document.getElementById('SelectVereda').value;

    if (nombre === '' || cedula === '' || vereda === '') {
        Swal.fire({
            title: 'Error',
            text: 'Todos los campos son obligatorios',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    } else if (nombre.length < 3) {
        Swal.fire({
            title: 'Error',
            text: 'El nombre de la finca debe tener al menos 3 caracteres',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;

    } else if (cedula === '0' || vereda === '0') {

        Swal.fire({
            title: 'Error',
            text: 'Seleccione una opción válida',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    else {
        for (let i = 0; i < fincas.length; i++) {
            const finca = fincas[i];
            if (finca.nombre_finca === nombre) {
                Swal.fire({
                    title: 'Error',
                    text: 'La finca ya existe',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                return;
            }
        }
    }

    addFinca();
}
getFincas();
getUsuarios();
getVereda();

const btnSetings = document.getElementById('btnSetings');

btnSetings.addEventListener('click', () => {
    window.location.href = '/vistas/edicion/finca/finca_crud.html';
});