
import { API_URL } from '../config.js';

const veredas = [];


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
getVereda();
async function addVereda() {

    const idCiudad = document.getElementById('SelectCiudad').value;
    const nombre = document.getElementById('InputVereda').value;
    const estado = true;

    const data = {
        id_ciudad: idCiudad,
        nombre: nombre,
        estado: estado
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}/Vereda`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 201) {
           window.location.href = window.location.href;
           Swal.fire({
                title: 'Vereda creada',
                text: 'La vereda ha sido creada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

        } else {
            console.error('Error add Vereda:', this.status);
        }
    };


    xhr.send(JSON.stringify(data));

}




const addParametroButton = document.getElementById('addVereda');
addParametroButton.addEventListener('click', validarVereda);


async function validarVereda() {
    const nombre = document.getElementById('InputVereda').value;
    const SelectCiudad = document.getElementById('SelectCiudad');
    console.log(veredas.length);
    for (let i = 0; i < veredas.length; i++) {
        if (SelectCiudad.value === '0') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Seleccione una ciudad',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        if (veredas[i].nombre === nombre) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La vereda ya existe',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
    }

    addVereda();
}

async function getVereda() {


    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Vereda`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const tbody = document.getElementById('tbody');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const vereda = JSON.parse(this.responseText);
            veredas.push(...vereda);



        } else {
            console.error('Error get Vereda:', this.status);
        }
    };

    xhr.send();

}

const btnSetings = document.getElementById('btnSetings');

btnSetings.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/vereda/vereda_crud.html`;
});