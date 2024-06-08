import { API_URL } from '../../config.js'


const tableData = document.getElementById('tableData');


let count = 0;
let dataD = null;

const sensores = [];

async function cargarTabla() {
    try {
        const response = await fetch(`${API_URL}/tipo_sensor`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const users = await response.json();

        tableData.innerHTML = '';

        users.forEach(user => {
            const tableRow = document.createElement('tr');

            tableRow.innerHTML = `
        <td id="id">${user.Id}</td>
        <td id="Descripcion" disabled>${user.Descripcion}</td>
  
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
        $(document).ready(function () {

            $('#userTable').DataTable({
                "paging": true,
                "pageLength": 5,
                "searching": true,
                "lengthMenu": [5, 10, 15],
                "language": {
                    "paginate": {
                        "next": "Siguiente", // Cambia el texto del botón "Next"
                        "previous": "Anterior" // Cambia el texto del botón "Previous"
                    },
                    "search": "Buscar", // Cambia el texto de la etiqueta "Search"
                    "lengthMenu": "Mostrar _MENU_ entradas por página",
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas"
                }
            });
        });
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
    }
}
window.onload = cargarTabla();
/**
 * --------------------- V O L V E R ---------------------
 */

const btnBack = document.getElementById('back');
btnBack.addEventListener('click', () => {
    window.location.href = `/vistas/home/home.html`;
});



/** ---------------------------------------------------------- abrir modal */


window.addEventListener('click', async (e) => {
    count = 0;
    if (e.target.classList.contains('bx-plus-circle')) {
        window.location.href = `/vistas/sensor/tipo_sensor.html`;


    } else if (e.target.classList.contains('bxs-edit-alt')) {

        let data1 = (e.target.parentElement.parentElement.parentElement.children);
        localStorage.setItem('id', data1[0].textContent);
        localStorage.setItem('Descripcion', data1[1].textContent);
        localStorage.setItem('estado', data1[2].textContent);

        window.location.href = `/vistas/edicion/tp_sensor/tp_sensor_edit.html`;


    } else if (e.target.classList.contains('bxs-trash-alt')) {

        dataD = (e.target.parentElement.parentElement.parentElement.children);
        swal.fire({
            title: '¿Está seguro de que desea desactivar el tipo de sensor?',
            showCancelButton: true,
            confirmButtonText: `Aceptar`,
            cancelButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCiudad();
            }
        });
    } else if (e.target.classList.contains('bxs-check-circle')) {

        dataD = (e.target.parentElement.parentElement.parentElement.children);
        swal.fire({
            title: '¿Está seguro de que desea activar el tipo de sensor?',
            showCancelButton: true,
            confirmButtonText: `Aceptar`,
            cancelButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                activateUser();
            }
        });
    }
});

async function deleteCiudad() {


    let opt = validarTpSensorActivo();

    if (!opt) {
        swal.fire({
            title: 'No se puede desactivar el tipo de sensor',
            text: 'El tipo de sensor está asignado a un sensor',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
        });
    } else {

        const id = dataD[0].textContent;

        const estado = false;
        const data = {
            id,
            estado
        };


        const xhr = new XMLHttpRequest();

        xhr.open('PUT', `${API_URL}/DeleteTipo_sensor/${id}`);


        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                swal.fire({
                    title: 'Tipo de sensor desactivado correctamente',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.reload();
                });
            } else {
                swal.fire({
                    title: 'Error al desactivar el tipo de sensor',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                });
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

    xhr.open('PUT', `${API_URL}/DeleteTipo_sensor/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            swal.fire({
                title: 'Tipo de sensor activado correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload();
            });
        } else {
            swal.fire({
                title: 'Error al activar el tipo de sensor',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    xhr.send(JSON.stringify(data));

}


/** ---------------------------------------------------------- actualizar usuario */



function validarTpSensorActivo() {
    let opt = true;
    for (let i = 0; i < sensores.length; i++) {
        console.log(sensores[i].id_tp_sensor);
        if (sensores[i].id_tp_sensor == dataD[0].textContent) {

            opt = false;
            break;
        }
    }

    return opt;


}


function getSensores() {
    fetch(`${API_URL}/sensor`)
        .then(response => response.json())
        .then(data => {
            data.forEach(sensor => {

                sensores.push(sensor);

            });
        });
}

window.onload = getSensores();