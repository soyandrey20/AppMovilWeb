import { API_URL } from "../../config.js";


 
const tableData = document.getElementById('tableData');
const inputs = document.querySelectorAll('input');

 
let count = 0;
let dataD = null;

 


 


async function cargarTabla() {
  try {
    const response = await fetch(`${API_URL}/parametro_sensor`);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const users = await response.json();

    tableData.innerHTML = '';

    users.forEach(user => {
      const tableRow = document.createElement('tr');

      tableRow.innerHTML = `
        <td id="id">${user.Id}</td>
        <td id="id_parametro" disabled>${user.id_parametro}</td>
        <td id="id_sensor" disabled>${user.id_sensor}</td>
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
    window.location.href = `/vistas/para_sensor/para_sensor.html`;

  } else if (e.target.classList.contains('bxs-edit-alt')) {

    let data1 = (e.target.parentElement.parentElement.parentElement.children);
    localStorage.setItem('id', data1[0].textContent);
    localStorage.setItem('id_parametro', data1[1].textContent);
    localStorage.setItem('id_sensor', data1[2].textContent);
    localStorage.setItem('estado', data1[3].textContent);
    window.location.href = `/vistas/edicion/para_sensor/parametro_sensor_edit.html`;
  } else if (e.target.classList.contains('bxs-trash-alt')) {
    dataD = (e.target.parentElement.parentElement.parentElement.children);
    var opt = window.confirm('¿Está seguro de eliminar el parametro sensor?');
    if (opt) {
      deleteCiudad();
    }
  } else if (e.target.classList.contains('bxs-check-circle')) {

    dataD = (e.target.parentElement.parentElement.parentElement.children);
    var opt = window.confirm('¿Está seguro de activar el parametro sensor?');
    if (opt) {
      activateUser();
    }
  }
});


/** ---------------------------------------------------------- eliminar usuario */
 

async function deleteCiudad() {

  const id = dataD[0].textContent;

  const estado = false;
  const data = {
    id,
    estado
  };


  const xhr = new XMLHttpRequest();

  xhr.open('PUT', `${API_URL}/DeleteParametro_sensor/${id}`);


  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function () {
    if (this.readyState === 4 && this.status === 200) {

      window.alert('Parametro sensor eliminado correctamente');


      window.location.reload();


    } else {

      window.alert('Error al eliminar el parametro sensor');
    }
  };
  xhr.send(JSON.stringify(data));

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

  xhr.open('PUT', `${API_URL}/DeleteParametro_sensor/${id}`);


  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function () {
    if (this.readyState === 4 && this.status === 200) {

      window.alert('Parametro sensor activado correctamente');
      window.location.reload();
    } else {

      window.alert('Error al activar el parametro sensor');
    }
  };
  xhr.send(JSON.stringify(data));

}

 