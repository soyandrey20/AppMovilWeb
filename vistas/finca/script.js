import { API_URL } from '../config.js';

const fincas = [];

function getFincas() {
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



function getUsuarios() {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/persona`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const SelectCedula = document.getElementById('SelectCedula');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const usuarios = JSON.parse(this.responseText);

            for (let i = 0; i < usuarios.length; i++) {
                const usuario = usuarios[i];
                const option = document.createElement('option');
                option.value = usuario.cedula;
                option.innerText = usuario.Nombre_1 + ' ' + usuario.LastName_1;
                SelectCedula.appendChild(option);
            }

        } else {
            console.error('Error get Usuarios:', this.status);
        }
    };
    xhr.send();
}



function getVereda() {

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
    const opt = validarFinca();

    if (opt) {



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
            if (this.readyState === 4 && this.status === 200) {

                window.alert('Finca creada correctamente');
                window.location.href = `/vistas/edicion/finca/finca_crud.html`;
            } else {
                window.alert('Error al crear la finca');
            }
        };

        xhr.send(JSON.stringify(data));
    } else {
        window.alert('Error al crear la finca, verifique los datos ingresados');


    }
}

const add = document.getElementById('addFinca');
add.addEventListener('click', addFinca);

function validarFinca() {
    var opt = true;


    if (document.getElementById('SelectCedula').value == 0) {
        opt = false;
    }
    else if (document.getElementById('SelectVereda').value == 0) {
        opt = false;
    } else if (document.getElementById('Nombre').value == '') {
        opt = false;
    }

    return opt;
}



window.onload = getFincas();
window.onload = getUsuarios();
window.onload = getVereda();

const back = document.getElementById('back');

back.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/finca/finca_crud.html`;
});