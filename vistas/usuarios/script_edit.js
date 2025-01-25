import { API_URL } from "../config.js";

const cedulax = document.getElementById('cedula');
const SelectTpPersonax = document.getElementById('SelectTpPersona');
const primerNombrex = document.getElementById('primerNombre');
const segundoNombrex = document.getElementById('segundoNombre');
const primerApellidox = document.getElementById('primerApellido');
const segundoApellidox = document.getElementById('segundoApellido');
const addUsuario = document.getElementById('addUsuario');

const emailx = document.getElementById('email');

const passwordx = document.getElementById('password');


const cedula = localStorage.getItem('cedula');
const tipo = localStorage.getItem('tipo');
const nombre_1 = localStorage.getItem('nombre_1');
const nombre_2 = localStorage.getItem('nombre_2');
const apellido_1 = localStorage.getItem('apellido_1');
const apellido_2 = localStorage.getItem('apellido_2');
const email = localStorage.getItem('email');
const password = localStorage.getItem('password');


const back = document.getElementById('btnBack')

back.addEventListener('click', () => {
    window.location.href = '/vistas/usuarios/usuarios.html';
});



function cargarDatos() {
    cedulax.value = cedula;
    SelectTpPersonax.value = tipo;
    primerNombrex.value = nombre_1;
    segundoNombrex.value = nombre_2;
    primerApellidox.value = apellido_1;
    segundoApellidox.value = apellido_2;
    emailx.value = email;
    passwordx.value = password;
}

cargarDatos();


async function getTipoPersona() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/tipo_persona`);

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);

            for (let i = 0; i < data.length; i++) {
                const parametro = data[i];
                const option = document.createElement('option');
                option.value = parametro.id;
                option.innerText = parametro.descripcion;
                SelectTpPersonax.appendChild(option);

            }
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };

    xhr.send();
}

window.addEventListener('DOMContentLoaded', getTipoPersona);

addUsuario.addEventListener('click', updateData);

function updateData() {
    const cedula1 = cedulax.value;
    const tipo1 = (SelectTpPersonax.value) == 0 ? tipo : SelectTpPersonax.value;
    const nombre_11 = primerNombrex.value == '' ? nombre_1 : primerNombrex.value;
    const nombre_21 = segundoNombrex.value == '' ? nombre_2 : segundoNombrex.value;
    const apellido_11 = primerApellidox.value == '' ? apellido_1 : primerApellidox.value;
    const apellido_21 = segundoApellidox.value == '' ? apellido_2 : segundoApellidox.value;
    const email1 = emailx.value == '' ? email : emailx.value;
    const password1 = passwordx.value;

    const data = {
        Cedula: cedula1,
        id_tipo_persona: tipo1,
        Nombre_1: nombre_11,
        Nombre_2: nombre_21,
        LastName_1: apellido_11,
        LastName_2: apellido_21,
        Email: email1,
        password: password1,

    };

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${API_URL}/persona/${cedula}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            swal.fire({
                title: 'Usuario actualizado',
                text: 'Usuario actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.href = '/vistas/usuarios/usuarios.html';
            });

        } else {
            console.error('Error update user:', this.statusText);
        }
    };

    xhr.send(JSON.stringify(data));



}  // Fin de la función updateData
