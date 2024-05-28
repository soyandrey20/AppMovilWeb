import { API_URL } from "../../config.js";

const idX = document.getElementById('id');
const nombrex = document.getElementById('Departamento');

const estadox = document.getElementById('Estado');
const btnActualizar = document.getElementById('btnActualizar');
const btnBack = document.getElementById('btnBack');
const departa = [];

//obtener informacion de la otra vista
const idd = localStorage.getItem('id');
const nombree = localStorage.getItem('nombre');

const estadoo = localStorage.getItem('estado');


function llenarDatos() {
    idX.value = idd;
    nombrex.value = nombree;

    estadox.value = estadoo;

}






async function updateData() {
    const opt = validarDepart();
    if (opt) {


        const id = idX.value;
        const nombre = nombrex.value;
        const estado = estadox.value;

        const data = {
            id,
            nombre,

            estado
        };
        const xhr = new XMLHttpRequest();

        xhr.open('PUT', `${API_URL}/departamento/${id}`);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                window.alert('Departamento actualizado correctamente');
                window.location.href = '/vistas/edicion/departamento/departamento_crud.html';
            } else {
                window.alert('Error al actualizar el departamento');
            }
        };
        xhr.send(JSON.stringify(data));
    } else {
        window.alert('El departamento ya existe');
    }
}

function validarDepart() {

    var opt = false;
    for (let i = 0; i < departa.length; i++) {
        const dep = departa[i];

        if (dep.nombre === nombrex.value) {

            opt = false;
            break;
        } else {
            opt = true;
            break;
        }
    }
    return opt;
}

function getDepart() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Departamento`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const departamentos = JSON.parse(this.responseText);
            departa.push(...departamentos);
            console.log(departa);


        } else {
            console.error('Error get Departamentos:', this.statusText);
        }
    };

    xhr.send();
}

getDepart();

btnActualizar.addEventListener('click', updateData);

btnBack.addEventListener('click', () => {
    window.location.href = '/vistas/edicion/departamento/departamento_crud.html';
});


document.addEventListener('DOMContentLoaded', llenarDatos);