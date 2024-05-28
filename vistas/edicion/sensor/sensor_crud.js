import { API_URL } from '../../config.js'

const userTable = document.getElementById('userTable');
const tableData = document.getElementById('tableData');


const inputs = document.querySelectorAll('input');


let count = 0;
let dataD = null;

const para_sensores = [];

async function cargarTabla() {
    try {
        const response = await fetch(`${API_URL}/sensor`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const users = await response.json();

        tableData.innerHTML = '';

        users.forEach(user => {
            const tableRow = document.createElement('tr');

            tableRow.innerHTML = `
        <td id="id">${user.Id}</td>
        <td id="id_parametro" disabled>${user.informacion}</td>
       
        <td id="id_sensor" disabled>${user.id_tp_sensor}</td>
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

/**---------------------------volver atras----------------------- */

const btnBack = document.getElementById('back');
btnBack.addEventListener('click', () => {
    window.location.href = `/vistas/home/home.html`;
});

/** ---------------------------------------------------------- abrir modal */


window.addEventListener('click', async (e) => {
    count = 0;
    if (e.target.classList.contains('bx-plus-circle')) {

        window.location.href = `/vistas/sensor/sensor.html`;
    } else if (e.target.classList.contains('bxs-edit-alt')) {

        let data1 = (e.target.parentElement.parentElement.parentElement.children);
        localStorage.setItem('id', data1[0].textContent);
        localStorage.setItem('informacion', data1[1].textContent);
        localStorage.setItem('id_tp_sensor', data1[2].textContent);
        localStorage.setItem('estado', data1[3].textContent);

        window.location.href = `/vistas/edicion/sensor/sensor_edit.html`;

    } else if (e.target.classList.contains('bxs-trash-alt')) {

        dataD = (e.target.parentElement.parentElement.parentElement.children);
        var opt = window.confirm('¿Está seguro de que desea eliminar el sensor?');
        if (opt) {
            deleteCiudad();
        }

    } else if (e.target.classList.contains('bxs-check-circle')) {

        dataD = (e.target.parentElement.parentElement.parentElement.children);
        var opt = window.confirm('¿Está seguro de que desea activar el sensor?');
        if (opt) {
            activateUser();
        }

    }
});




/** ---------------------------------------------------------- eliminar usuario */

async function deleteCiudad() {

    let opt = validarParaSensor();
    if (!opt) {
        window.alert('No se puede eliminar el sensor, ya que está asociado a un parámetro');
    } else {

        const id = dataD[0].textContent;

        const estado = false;
        const data = {
            id,
            estado
        };


        const xhr = new XMLHttpRequest();

        xhr.open('PUT', `${API_URL}/deleteSensor/${id}`);


        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                window.alert('Sensor desactivado correctamente');
                cargarTabla();
            } else {
                window.alert('Error al desactivar el sensor');
                cargarTabla();

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

    xhr.open('PUT', `${API_URL}/deleteSensor/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            window.alert('Sensor activado correctamente');
            cargarTabla();
        } else {
            window.alert('Error al activar el sensor');
            cargarTabla();
        }
    };
    xhr.send(JSON.stringify(data));

}



function validarParaSensor() {
    let opt = true;
    for (let i = 0; i < para_sensores.length; i++) {

        if (para_sensores[i].id_sensor == dataD[0].textContent) {

            opt = false;
        }
    }

    return opt;
}
