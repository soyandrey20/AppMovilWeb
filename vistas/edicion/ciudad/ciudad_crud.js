import { API_URL } from "../../config.js";


const tableData = document.getElementById('tableData');






let dataD = null;

const veredas = [];
/** ---------------------------------------------------------- cargar la tabla con sus datos */
async function cargarTabla() {
    try {
        const response = await fetch(`${API_URL}/ciudad`);

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
        <td id="id_parametro" disabled>${user.id_departamento}</td>
        <td id="estado" disabled>${user.estado == true ? 'Activo' : 'Desactivo'}</td>
  
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

/** ---------------------------------------------------------- devolverse */
const btnBack = document.getElementById('back');
btnBack.addEventListener('click', () => {
    window.location.href = `/vistas/home/home.html`;
});

/** ---------------------------------------------------------- abrir modal */


window.addEventListener('click', async (e) => {
    if (e.target.classList.contains('bx-plus-circle')) {
        window.location.href = `/vistas/ciudad/ciudad.html`;
    }

    else if (e.target.classList.contains('bxs-edit-alt')) {

        let data1 = (e.target.parentElement.parentElement.parentElement.children);
        //enviar datos a otra ventana
        localStorage.setItem('id', data1[0].textContent);
        localStorage.setItem('nombre', data1[1].textContent);
        localStorage.setItem('id_departamento', data1[2].textContent);
        localStorage.setItem('estado', data1[3].textContent);
        window.location.href = `/vistas/edicion/ciudad/ciudad_add_edit.html`;





    } else if (e.target.classList.contains('bxs-trash-alt')) {

        dataD = (e.target.parentElement.parentElement.parentElement.children);
        var opt = window.confirm('¿Desea desactivar la ciudad?');
        if (opt) {
            deleteCiudad();
        }
    } else if (e.target.classList.contains('bxs-check-circle')) {



        dataD = (e.target.parentElement.parentElement.parentElement.children);
        var opt = window.confirm('¿Desea activar la ciudad?');
        if (opt) {
            activateUser();
        }
    }
});




/** ---------------------------------------------------------- eliminar usuario */


async function deleteCiudad() {

    let opt = validarCiudadActivo();
    if (!opt) {
        window.confirm('No se puede eliminar la ciudad porque tiene veredas asociadas.');

    } else {


        const id = dataD[0].textContent;

        const estado = false;
        const data = {
            id,
            estado
        };


        const xhr = new XMLHttpRequest();

        xhr.open('PUT', `${API_URL}/DeleteCiudad/${id}`);


        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {

                window.confirm('Ciudad desactivada correctamente.');
                 window.location.reload(); 
            } else {
                window.alert('Ocurrió un error al desactivar la ciudad.')
            }
        };
        xhr.send(JSON.stringify(data));

    }
}





/** ---------------------------------------------------------- actualizar usuario */

function activateUser() {
    const id = dataD[0].textContent;

    const estado = true;
    const data = {
        id,
        estado
    };


    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/DeleteCiudad/${id}`, true);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            window.alert('Ciudad activada correctamente.');
            window.location.reload();

        } else {
            window.alert('Ocurrió un error al activar el Ciudad.');
        }
    };

    xhr.send(JSON.stringify(data));


}


function getVeredas() {
    fetch(`${API_URL}/vereda`)
        .then(response => response.json())
        .then(data => {
            veredas.push(...data);
        })
        .catch(error => console.error('Error obteniendo veredas:', error));
}

window.addEventListener('DOMContentLoaded', getVeredas);

function validarCiudadActivo() {
    let opt = true;
    for (let i = 0; i < veredas.length; i++) {
        if (veredas[i].id == dataD[0].textContent) {
            opt = false;
            break;
        }
    }
    return opt;
}





