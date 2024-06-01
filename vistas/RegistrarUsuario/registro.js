import { API_URL } from '../config.js';


const cedula = document.getElementById('cedula');
const SelectTpPersona = document.getElementById('SelectTpPersona');
const primerNombre = document.getElementById('primerNombre');
const segundoNombre = document.getElementById('segundoNombre');
const primerApellido = document.getElementById('primerApellido');
const segundoApellido = document.getElementById('segundoApellido');
const addUsuario = document.getElementById('addUsuario');

const email = document.getElementById('email');
const confEmail = document.getElementById('confEmail');
const password = document.getElementById('password');
const confPassword = document.getElementById('confPassword');

const persona = [];


const msgCedula = document.querySelector('#msgCedula');
const msgTpPersona = document.querySelector('#msgTpPersona');
const msgPrimerNombre = document.querySelector('#msgPrimerNombre');
const msgPrimerApellido = document.querySelector('#msgPrimerApellido');
const msgEmail = document.querySelector('#msgEmail');
const msgConfEmail = document.querySelector('#msgConfEmail');

const msgPassword = document.querySelector('#msgPassword');
const msgConfPassword = document.querySelector('#msgConfPassword');

const back = document.getElementById('btnBack');
back.addEventListener('click', () => {
    window.location.href = `/vistas/usuarios/usuarios.html`;
});

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
                    SelectTpPersona.appendChild(option);

                }
            } else {
                console.error('Error fetching users:', this.statusText);
            }
        };

        xhr.send();
    }

window.addEventListener('DOMContentLoaded', getTipoPersona);

addUsuario.addEventListener('click', registrarUsuario);

function registrarUsuario() {



    if (validarFormulario()) {
        if (validarExistencia()) {


            const data = {
                Cedula: cedula.value,
                id_tipo_persona: SelectTpPersona.value,
                Nombre_1: primerNombre.value,
                Nombre_2: segundoNombre.value == '' ? 'N/A' : segundoNombre.value,
                LastName_1: primerApellido.value,
                LastName_2: segundoApellido.value == '' ? 'N/A' : segundoApellido.value,
                Email: email.value,
                password: password.value,
                Permisos: 'usuario'
            };

            const xhr = new XMLHttpRequest();
            xhr.open('POST', `${API_URL}/Usuarios`);

            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = function () {
                if (this.readyState === 4 && this.status === 200) {
                    window.alert('Usuario registrado correctamente');
                    window.location.href = '/vistas/usuarios/usuarios.html';
                } else {
                    window.alert('Error al registrar usuario');
                }
            };

            xhr.send(JSON.stringify(data));
        }
    }
}

function getUsuarios() {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Usuarios`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const usuarios = JSON.parse(this.responseText);

            for (let i = 0; i < usuarios.length; i++) {
                const usuario = usuarios[i];
                persona.push(usuario);
            }

        } else {
            console.error('Error get Usuarios:', this.status);
        }
    };
    xhr.send();
}

window.addEventListener('DOMContentLoaded', getUsuarios);

function validarExistencia() {



    for (let i = 0; i < persona.length; i++) {
        if (persona[i].Cedula === cedula.value) {
            window.alert('La cedula ya existe');
            return false;
        }
    }
    return true;
}


function validarFormulario() {
    let validado = true;

    let msgs = document.querySelectorAll('small[id^="msg"')

    for (let m of msgs) {
        m.innerHTML = "";
    }

    var rgxCedula = /^[0-9]{10}$/;
    var rgxEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
    var rgxPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    if (cedula.value.trim() === '') {
        msgCedula.innerHTML += 'La cedula es obligatoria <br>';
        validado = false;
    } else if (!rgxCedula.test(cedula.value)) {
        msgCedula.innerHTML += 'La cedula no es válida';
        validado = false;
    }
    if (SelectTpPersona.value === '0') {
        msgTpPersona.innerHTML += 'El tipo de persona es obligatorio  ';
        validado = false;
    }
    if (primerNombre.value === '') {
        msgPrimerNombre.innerHTML += 'El primer nombre es obligatorio  ';
        validado = false;
    }
    if (primerApellido.value === '') {
        msgPrimerApellido.innerHTML += 'El primer apellido es obligatorio ';
        validado = false;
    } if (email.value !== confEmail.value) {
        msgConfEmail.innerHTML += 'Los correos no coinciden';
        validado = false;
    } else if (!rgxEmail.test(email.value)) {
        msgEmail.innerHTML += 'El correo no es válido';
        validado = false;
    }
    if (password.value === '') {
        msgPassword.innerHTML += 'La contraseña es obligatoria';
        validado = false;
    } else if (!rgxPassword.test(password.value)) {
        msgPassword.innerHTML += 'La contraseña no es válida';
        validado = false;
    }

    if (password.value !== confPassword.value) {
        msgConfPassword.innerHTML += 'Las contraseñas no coinciden';
        validado = false;
    }

    return validado;
}