import { API_URL } from '../../config.js'


const idx = document.getElementById('id');
const SelectCiudadx = document.getElementById('SelectCiudad');
const nombrex = document.getElementById('Nombre');
const estadox = document.getElementById('Estado');

const btnActualizar = document.getElementById('btnActualizar');
const back = document.getElementById('back');
const id = localStorage.getItem('id');
const id_ciudadx = localStorage.getItem('id_ciudad');
const nombre = localStorage.getItem('nombre');
const estado = localStorage.getItem('estado');

function cargarDatos() {
    idx.value = id,
        SelectCiudadx.value = id_ciudadx,
        nombrex.value = nombre,
        estadox.value = estado

}

cargarDatos();

async function getCiudad() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Ciudad`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const SelectCiudad = document.getElementById('SelectCiudad');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const ciudades = JSON.parse(this.responseText);

            for (let i = 0; i < ciudades.length; i++) {
                const ciudad = ciudades[i];
                const option = document.createElement('option');
                option.value = ciudad.id;
                option.innerText = ciudad.nombre;
                SelectCiudad.appendChild(option);
            }

        } else {
            console.error('Error get Ciudad:', this.status);
        }
    };

    xhr.send();

}

getCiudad();



async function updateData() {
    const id = idx.value;
    const nombre = nombrex.value;
    const id_ciudad = document.getElementById('SelectCiudad').value == 0 ? id_ciudadx : document.getElementById('SelectCiudad').value;
    const estado = estadox.value;
    const data = {
        id,
        nombre,
        id_ciudad,
        estado
    };

    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/Vereda/${id}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            window.alert('Vereda actualizada correctamente');


            window.location.href = '../vereda/vereda_crud.html';
        } else {
            window.alert('Error al actualizar la vereda');
        }
    };
    xhr.send(JSON.stringify(data));

}

btnActualizar.addEventListener('click', updateData);
back.addEventListener('click', () => {
    window.location.href = '../vereda/vereda_crud.html';
});