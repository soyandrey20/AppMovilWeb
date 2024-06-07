import { API_URL } from '../../config.js';


const tableData = document.getElementById('tableData');





let count = 0;
let dataD = null;

const personas = [];

/** ---------------------------------------------------------- cargar la tabla con sus datos */
async function cargarTabla() {
    try {
        const response = await fetch(`${API_URL}/fincas`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const users = await response.json();

        tableData.innerHTML = '';

        users.forEach(user => {
            const tableRow = document.createElement('tr');
            console.log(user)
            tableRow.innerHTML = `
        <td id="id">${user.id}</td>
        <td id="id_persona" disabled>${user.id_persona}</td>
        <td id="nombre" disabled>${user.nombre_finca}</td>
        <td id="direccion" id_vereda>${user.id_vereda}</td>
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

/** ---------------------------------------------------------- volver atras */


const btnBack = document.getElementById('back');
btnBack.addEventListener('click', () => {
    window.location.href = `/vistas/home/home.html`;
});


/** ---------------------------------------------------------- abrir modal */


window.addEventListener('click', async (e) => {
    count = 0;
    if (e.target.classList.contains('bx-plus-circle')) {
        window.location.href = `/vistas/finca/finca.html`;
    }
    else if (e.target.classList.contains('bxs-edit-alt')) {

        let data1 = (e.target.parentElement.parentElement.parentElement.children);
        localStorage.setItem('id', data1[0].textContent);
        localStorage.setItem('cedula', data1[1].textContent);
        localStorage.setItem('nombre', data1[2].textContent);
        localStorage.setItem('id_vereda', data1[3].textContent);
        localStorage.setItem('estado', data1[4].textContent == true ? 'Activo' : 'Inactivo');



        window.location.href = `/vistas/edicion/finca/finca_add_edit.html`;

    } else if (e.target.classList.contains('bxs-trash-alt')) {

        dataD = (e.target.parentElement.parentElement.parentElement.children);
        swal.fire({
            title: '¿Está seguro de que desea desactivar la finca?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFinca();
            }
        });
    } else if (e.target.classList.contains('bxs-check-circle')) {

        dataD = (e.target.parentElement.parentElement.parentElement.children);

        swal.fire({
            title: '¿Está seguro de que desea activar la finca?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                activateFinca();
            }
        });
    }
});





/** ---------------------------------------------------------- eliminar usuario */


async function deleteFinca() {

    const id = dataD[0].textContent;

    const estado = false;
    const data = {
        id,
        estado
    };


    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/deleteFincas/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            swal.fire({
                title: 'Finca desactivada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload();
            });

        } else {
            swal.fire({
                title: 'Error al desactivar la finca',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    xhr.send(JSON.stringify(data));

}

/** ---------------------------------------------------------- activar usuario */





async function activateFinca() {

    const id = dataD[0].textContent;

    const estado = true;
    const data = {
        id,
        estado
    };


    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/deleteFincas/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {

            swal.fire({
                title: 'Finca activada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload();

            });
        } else {

            swal.fire({
                title: 'Error al activar la finca',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    xhr.send(JSON.stringify(data));

}


/** ---------------------------------------------------------- actualizar usuario */






