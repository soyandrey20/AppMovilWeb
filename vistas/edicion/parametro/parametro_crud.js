import { API_URL } from '../../config.js'

const tableData = document.getElementById('tableData');

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

        swal.fire({
            title: '¿Está seguro de que desea eliminar el parametro?',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCiudad();
            }
        });

    } else if (e.target.classList.contains('bxs-check-circle')) {
        dataD = (e.target.parentElement.parentElement.parentElement.children);
        swal.fire({
            title: '¿Está seguro de que desea activar el parametro?',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                activateUser();
            }
        });
    }
});


/** ---------------------------------------------------------- eliminar usuario */


async function deleteCiudad() {


    let opt = validarParaSensor();

    if (!opt) {
        swal.fire({
            title: 'No se puede eliminar el parametro',
            icon: 'error',
            confirmButtonText: 'Aceptar',
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

        xhr.open('PUT', `${API_URL}/DeleteParametro/${id}`);


        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                swal.fire({
                    title: 'Parametro eliminado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.reload();
                });
            } else {
                swal.fire({
                    title: 'Error al eliminar el parametro',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
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

    xhr.open('PUT', `${API_URL}/DeleteParametro/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            swal.fire({
                title: 'Parametro activado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload();
            });
        } else {
            swal.fire({
                title: 'Error al activar el parametro',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                showConfirmButton: false,
                timer: 1500
            });
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
