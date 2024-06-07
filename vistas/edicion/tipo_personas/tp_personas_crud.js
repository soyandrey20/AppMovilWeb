import { API_URL } from '../../config.js'

const tableData = document.getElementById('tableData');



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
        swal.fire({
            title: '¿Está seguro de que desea desactivar el tipo de persona?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCiudad();
            }
        });

    } else if (e.target.classList.contains('bxs-check-circle')) {
        dataD = (e.target.parentElement.parentElement.parentElement.children);
        swal.fire({
            title: '¿Está seguro de que desea activar el tipo de persona?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                activateUser();
            }
        });
    }
});

/** ---------------------------------------------------------- cerrar modal */




/** ---------------------------------------------------------- llenar datos en el modal */
const fillData = (data1) => {
    for (let index of inputs) {

        index.value = data1[count].textContent;

        count++;
    }



}

/** ---------------------------------------------------------- eliminar usuario */


async function deleteCiudad() {

    let opt = validarTpPersonaActiva();

    if (!opt) {
        swal.fire({
            title: 'No se puede desactivar el tipo de persona',
            text: 'El tipo de persona está siendo usado por una persona',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
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
                swal.fire({
                    title: 'Tipo de persona desactivado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    window.location.reload();
                });
            } else {
                swal.fire({
                    title: 'No se ha podido desactivar el tipo de persona',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        };
        xhr.send(JSON.stringify(data));

    }
}

/** ---------------------------------------------------------- activar usuario */



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
            swal.fire({
                title: 'Tipo de persona activado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.reload();
            });

        } else {
            swal.fire({
                title: 'No se ha podido activar el tipo de persona',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });

        }
    };
    xhr.send(JSON.stringify(data));

}


/** ---------------------------------------------------------- actualizar usuario */


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