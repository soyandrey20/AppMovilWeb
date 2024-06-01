import { API_URL } from '../../config.js'

 
const tableData = document.getElementById('tableData');
 
let count = 0;
let dataD = null;

const fincas = [];

async function cargarTabla() {
    try {
        const response = await fetch(`${API_URL}/Vereda`);

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
        <td id="id_parametro" disabled>${user.nombre}</td>
        <td id="id_parametro" disabled>${user.id_ciudad}</td>
 
        <td id="estado" disabled>${user.estado == true ? 'Activo' : 'Inactivo'}</td>
  
        <td>
        <a href="#" class="btn-update"><i class='bx bxs-plus-circle'></i></a>
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

/**-------------------------------------------------- volver-------------------------------- */
const btnBack = document.getElementById('back');
btnBack.addEventListener('click', () => {
    window.location.href = `/vistas/home/home.html`;
});




/** ---------------------------------------------------------- abrir modal */


window.addEventListener('click', async (e) => {
    count = 0;
    if (e.target.classList.contains('bxs-plus-circle')) {
        window.location.href = `/vistas/vereda/vereda.html`;
    } else if (e.target.classList.contains('bxs-edit-alt')) {

        let data1 = (e.target.parentElement.parentElement.parentElement.children);
        localStorage.setItem('id', data1[0].textContent);
        localStorage.setItem('nombre', data1[1].textContent);
        localStorage.setItem('id_ciudad', data1[2].textContent);
        localStorage.setItem('estado', data1[3].textContent);
        window.location.href = `/vistas/edicion/vereda/vereda_edit.html`;
    } else if (e.target.classList.contains('bxs-trash-alt')) {

        dataD = (e.target.parentElement.parentElement.parentElement.children);
        var opt = window.confirm('¿Está seguro que desea eliminar la vereda?');
        if (opt) {
            deleteCiudad();
        }
    } else if (e.target.classList.contains('bxs-check-circle')) {
        dataD = (e.target.parentElement.parentElement.parentElement.children);
        var opt = window.confirm('¿Está seguro que desea activar la vereda?');
        if (opt) {
            activateUser();
        }
    }
});



/** ---------------------------------------------------------- llenar datos en el modal */

/** ---------------------------------------------------------- eliminar usuario */
 

async function deleteCiudad() {

    let opt = validarVeredaActivo();
    if (!opt) {
        window.alert('No se puede eliminar la vereda, ya que esta asociada a una finca');
    } else {

        const id = dataD[0].textContent;

        const estado = false;
        const data = {
            id,
            estado
        };


        const xhr = new XMLHttpRequest();

        xhr.open('PUT', `${API_URL}/deleteVereda/${id}`);


        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                window.alert('vereda eliminada correctamente');
               window.location.reload();


            } else {
                window.alert('Error al eliminar la vereda');
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

    xhr.open('PUT', `${API_URL}/deleteVereda/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            window.alert('vereda activada correctamente');
            window.location.reload();
        } else {
            window.alert('Error al activar la vereda');
        }
    };
    xhr.send(JSON.stringify(data));

}


/** ---------------------------------------------------------- actualizar usuario */



function validarVeredaActivo() {
    let opt = true;
    for (let i = 0; i < fincas.length; i++) {
        if (fincas[i].id == dataD[0].textContent) {
            opt = false;
            break;
        }
    }
    return opt;
}