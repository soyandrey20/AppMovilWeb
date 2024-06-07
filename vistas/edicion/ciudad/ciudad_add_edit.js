import { API_URL } from "../../config.js";

const idX = document.getElementById('id');
const nombrex = document.getElementById('ciudad');
const id_departamentox = document.getElementById('SelectTipoDepartamento');
const estadox = document.getElementById('Estado');
const btnActualizar = document.getElementById('btnActualizar');
const back = document.getElementById('back');

//obtener informacion de la otra vista
const idd = localStorage.getItem('id');
const nombree = localStorage.getItem('nombre');
const id_departamentoo = localStorage.getItem('id_departamento');
const estadoo = localStorage.getItem('estado');


function llenarDatos() {
    idX.value = idd;
    nombrex.value = nombree;
    id_departamentox.selectedIndex = id_departamentoo;
    estadox.value = estadoo;

}


back.addEventListener('click', () => {
    window.location.href = '/vistas/edicion/ciudad/ciudad_crud.html';
});


async function getDepart() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Departamento`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const SelectDepartamento = document.getElementById('SelectTipoDepartamento');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const departamentos = JSON.parse(this.responseText);

            for (let i = 0; i < departamentos.length; i++) {
                const departamento = departamentos[i];
                const option = document.createElement('option');
                option.value = departamento.id;
                option.innerText = departamento.nombre;
                SelectDepartamento.appendChild(option);

            }

        } else {
            console.error('Error get Departamentos:', this.status);
        }
    };

    xhr.send();

}
async function updateData() {
    var opt = validarUpdate();

    if (opt) {


        const id = idX.value;
        const nombre = nombrex.value;
        const id_departamento = id_departamentox.value == 0 ? id_departamentoo : id_departamentox.value;
        const estado = estadox.value;

        const data = {
            id,
            nombre,
            id_departamento,
            estado
        };
        const xhr = new XMLHttpRequest();

        xhr.open('PUT', `${API_URL}/ciudad/${id}`);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                swal.fire({
                    icon: 'success',
                    title: 'Ciudad actualizada correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = '/vistas/edicion/ciudad/ciudad_crud.html';
                });

            } else {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al actualizar la ciudad.',
                    confirmButtonText: 'Aceptar'
                });
            }
        };
        xhr.send(JSON.stringify(data));
    } else {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al actualizar la ciudad',
            confirmButtonText: 'Aceptar'
        });
    }

}

async function validarUpdate() {
    let opt = true;
    if (document.getElementById('ciudad').value == '') {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ingrese un nombre',
            confirmButtonText: 'Aceptar'
        });
        opt = false;
    }
    return opt;
}

btnActualizar.addEventListener('click', updateData);

window.addEventListener('DOMContentLoaded', getDepart);


window.onload = llenarDatos;