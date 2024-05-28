import { API_URL } from '../../config.js'

const userTable = document.getElementById('userTable');
const tableData = document.getElementById('tableData');


const inputs = document.querySelectorAll('input');

const modal = document.getElementById('modal');
const modal1 = document.getElementById('modal1');
const modal2 = document.getElementById('modal2');

const btnClose = document.getElementById('close');
const btnConfirm = document.getElementById('confirm');
const btnEliminar = document.getElementById('eliminar')
const btnCancelar = document.getElementById('cancelar')
const btnActivate = document.getElementById('activate')
const btnCancelar1 = document.getElementById('cancelar1')
let count = 0;
let dataD = null;


const personas = [];


async function cargarTabla() {
    try {
        const response = await fetch(`${API_URL}/Tipo_persona`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const users = await response.json();

        tableData.innerHTML = '';

        users.forEach(user => {
            const tableRow = document.createElement('tr');

            tableRow.innerHTML = `
        <td id="id">${user.id}</td>
        <td id="id_persona" disabled>${user.descripcion}</td>
    
        <td id="estado" disabled>${user.estado == true ? 'Activo' : 'Inactivo'}</td>
  
        <td>
        <a href="#" class="btn-update"><i class='bx bx-plus-circle' ></i></a>
        <a href="#" class="btn-update"><i class='bx bxs-edit-alt'></i></a>
        <a href="#" class="btn-delete"><i class='bx bxs-trash-alt'></i></a> 
        <a href="#" class="btn-activate"><i class='bx bxs-check-circle'></i></a>
        </td>
      `;

            tableData.appendChild(tableRow);


        });
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
    }
}
window.addEventListener('DOMContentLoaded', cargarTabla);

/**------------------------------------------------volver atras----------------------------------------- */
const btnBack = document.getElementById('back');
btnBack.addEventListener('click', () => {
    window.location.href = `/vistas/home/home.html`;
});


/** ---------------------------------------------------------- abrir modal */


window.addEventListener('click', async (e) => {
    if (e.target.classList.contains('bx-plus-circle')) {
        window.location.href = `/vistas/personas/tipo_persona.html`;
    } else if (e.target.classList.contains('bxs-edit-alt')) {

        let data1 = (e.target.parentElement.parentElement.parentElement.children);
        localStorage.setItem('id', data1[0].textContent);
        localStorage.setItem('descripcion', data1[1].textContent);
        localStorage.setItem('estado', data1[2].textContent);

        window.location.href = `/vistas/edicion/tipo_personas/tp_personas_edit.html`;

    } else if (e.target.classList.contains('bxs-trash-alt')) {

        dataD = (e.target.parentElement.parentElement.parentElement.children);

        var opt = window.confirm('¿Está seguro de que desea desactivar el tipo de persona?');

        if (opt) {
            deleteCiudad();
        }

    } else if (e.target.classList.contains('bxs-check-circle')) {
        dataD = (e.target.parentElement.parentElement.parentElement.children);
        var opt = window.confirm('¿Está seguro de que desea activar el tipo de persona?');
        if (opt) {
            activateUser();
        }
    }
});

/** ---------------------------------------------------------- cerrar modal */



btnClose.addEventListener('click', () => {

    modal.classList.toggle('translate');


});

btnCancelar1.addEventListener('click', () => {
    modal2.classList.toggle('translate');
});

btnCancelar.addEventListener('click', () => {

    modal1.classList.toggle('translate');
});

/** ---------------------------------------------------------- llenar datos en el modal */
const fillData = (data1) => {
    for (let index of inputs) {

        index.value = data1[count].textContent;

        count++;
    }



}

/** ---------------------------------------------------------- eliminar usuario */
btnEliminar.addEventListener('click', deleteCiudad);

async function deleteCiudad() {

    let opt = validarTpPersonaActiva();

    if (!opt) {
        window.alert('No se puede desactivar el tipo de persona, ya que hay personas que lo tienen asignado');
    }
    else {
        const id = dataD[0].textContent;

        const estado = false;
        const data = {
            id,
            estado
        };


        const xhr = new XMLHttpRequest();

        xhr.open('PUT', `${API_URL}/deleteTipo_persona/${id}`);


        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                window.alert('Tipo de persona desactivado correctamente');
                cargarTabla();
            } else {
                window.alert('No se ha podido desactivar el tipo de persona');
            }
        };
        xhr.send(JSON.stringify(data));

    }
}

/** ---------------------------------------------------------- activar usuario */



btnActivate.addEventListener('click', activateUser);
btnConfirm.addEventListener('click', updateData);

function activateUser() {

    const id = dataD[0].textContent;

    const estado = true;
    const data = {
        id,
        estado
    };


    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/deleteTipo_persona/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            window.alert('Tipo de persona activado correctamente');
            cargarTabla();
        } else {
            window.alert('No se ha podido activar el tipo de persona');
            cargarTabla();
        }
    };
    xhr.send(JSON.stringify(data));

}


/** ---------------------------------------------------------- actualizar usuario */

async function updateData() {
    const id = inputs[0].value;
    const descripcion = inputs[1].value;


    const estado = inputs[2].value;
    const data = {
        id,
        descripcion,
        estado
    };
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/Tipo_persona/${id}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            window.alert('Tipo de persona actualizado correctamente');
        } else {
            window.alert('No se ha podido actualizar el tipo de persona');
        }
    };
    xhr.send(JSON.stringify(data));

}

function getpersonas() {
    fetch(`${API_URL}/persona`)
        .then(response => response.json())
        .then(data => {
            personas.push(...data);
        });
}

getpersonas();

function validarTpPersonaActiva() {
    let opt = true;
    for (let i = 0; i < personas.length; i++) {

        if (personas[i].id_tipo_persona == dataD[0].textContent) {

            opt = false;
            break;
        }
    }

    return opt;
}