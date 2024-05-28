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

const para_sensores = [];


async function cargarTabla() {
    try {
        const response = await fetch(`${API_URL}/parametro`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const users = await response.json();

        tableData.innerHTML = '';

        users.forEach(user => {
            const tableRow = document.createElement('tr');

            tableRow.innerHTML = `
        <td id="id">${user.id}</td>
        <td id="id_parametro" disabled>${user.id_Tp_Parametro}</td>
       
        <td id="id_sensor" disabled>${user.Rango_inferior}</td>
        <td id="id_sensor" disabled>${user.Rango_Superior}</td>
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


/**-------------------------boton de atras */
const btnBack = document.getElementById('back');
btnBack.addEventListener('click', () => {
    window.location.href = `/vistas/home/home.html`;
});

/** ---------------------------------------------------------- abrir modal */


window.addEventListener('click', async (e) => {
    count = 0;
    if (e.target.classList.contains('bx-plus-circle')) {
        window.location.href = `/vistas/parametro/parametro.html`;



    } else if (e.target.classList.contains('bxs-edit-alt')) {

        let data1 = (e.target.parentElement.parentElement.parentElement.children);
        localStorage.setItem('id', data1[0].textContent);
        localStorage.setItem('id_Tp_Parametro', data1[1].textContent);
        localStorage.setItem('Rango_inferior', data1[2].textContent);
        localStorage.setItem('Rango_Superior', data1[3].textContent);
        localStorage.setItem('estado', data1[4].textContent);
        window.location.href = `/vistas/edicion/parametro/parametro_edit.html`;
    } else if (e.target.classList.contains('bxs-trash-alt')) {
        dataD = (e.target.parentElement.parentElement.parentElement.children);

        var opt = window.confirm('¿Está seguro de que desea eliminar el parametro?');
        if (opt) {
            deleteCiudad();
        }

    } else if (e.target.classList.contains('bxs-check-circle')) {
        dataD = (e.target.parentElement.parentElement.parentElement.children);
        var opt = window.confirm('¿Está seguro de que desea activar el parametro?');
        if (opt) {
            activateUser();
        }
    }
});


/** ---------------------------------------------------------- eliminar usuario */


async function deleteCiudad() {


    let opt = validarParaSensor();

    if (!opt) {
        window.alert('No se puede eliminar el parametro, ya que está asociado a un sensor');
    } else {


        const id = dataD[0].textContent;

        const estado = false;
        const data = {
            id,
            estado
        };


        const xhr = new XMLHttpRequest();

        xhr.open('PUT', `${API_URL}/DeleteParametro/${id}`);


        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                window.alert('Parametro desactivado correctamente');
                cargarTabla();

            } else {
                window.alert('Error al desactivar el parametro');
            }
        };
        xhr.send(JSON.stringify(data));

    }
}
/** ---------------------------------------------------------- activar usuario */





async function activateUser() {

    const id = dataD[0].textContent;

    const estado = true;
    const data = {
        id,
        estado
    };


    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/DeleteParametro/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            window.alert('Parametro activado correctamente');
            cargarTabla();
        } else {
            window.alert('Error al activar el parametro');
        }
    };
    xhr.send(JSON.stringify(data));

}




function getParaSensor() {
    fetch(`${API_URL}/parametro_sensor`)
        .then(response => response.json())
        .then(data => {
            para_sensores.push(...data);
        });
}
getParaSensor();

function validarParaSensor() {
    let opt = true;
    for (let i = 0; i < para_sensores.length; i++) {

        if (para_sensores[i].id_sensor == dataD[0].textContent) {

            opt = false;
        }
    }

    return opt;
}
