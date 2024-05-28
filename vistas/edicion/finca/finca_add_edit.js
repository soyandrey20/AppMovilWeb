import { API_URL } from "../../config.js";

const idX = document.getElementById('id');

const SelectCedulax = document.getElementById('SelectCedula');
const SelectVeredax = document.getElementById('SelectVereda');
const estadox = document.getElementById('Estado');
const nombrex = document.getElementById('Nombre');
const btnActualizar = document.getElementById('btnActualizar');
const btnBack = document.getElementById('btnBack');


//obtener informacion de la otra vista
const idd = localStorage.getItem('id');
const nombree = localStorage.getItem('nombre');
const cedulaa = localStorage.getItem('cedula');
const veredaa = localStorage.getItem('id_vereda');
const estadoo = localStorage.getItem('estado');


function llenarDatos() {
    idX.value = idd;
    nombrex.value = nombree;
    SelectCedulax.selected = cedulaa;
    SelectVeredax.selected = veredaa;
    estadox.value = estadoo;
    ;

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
                option.innerText = usuario.Nombre_1 + '' + usuario.LastName_1;
                SelectCedula.appendChild(option);
            }

        } else {
            console.error('Error get Usuarios:', this.status);
        }
    };
    xhr.send();
}

getUsuarios();


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

getVereda();

function updateData() {
    const opt = validarConfirmacion();
    if (opt) {

        const id = idX.value;
        const cedula = SelectCedulax.value;
        const nombre = nombrex.value;
        const id_vereda = SelectVeredax.value;
        const estado = estadox.value;
        const data = {
            id,
            cedula,
            nombre,
            id_vereda,
            estado
        };
        const xhr = new XMLHttpRequest();

        xhr.open('PUT', `${API_URL}/Fincas/${id}`);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {

              window.alert('Finca actualizada correctamente');
                window.location.href = '/vistas/edicion/finca/finca_crud.html';
            } else {

                window.alert('No se pudo actualizar la finca, si el problema persiste contacte al administrador del sistema');
            }
        };
        xhr.send(JSON.stringify(data));

    }else{
        window.alert('Por favor complete todos los campos');
    }
}




btnBack.addEventListener('click', () => {
    window.location.href = '/vistas/edicion/finca/finca_crud.html';
});


document.addEventListener('DOMContentLoaded', llenarDatos);



function validarConfirmacion() {
    console.log(document.getElementById('SelectCedula').value == 0);
    if (document.getElementById('SelectCedula').value == 0) {
 
        return false;
    }
    else if (document.getElementById('SelectVereda').value == 0) {
   
        return false;
    }else {
        return true;
    
    }
}
btnActualizar.addEventListener('click', updateData);