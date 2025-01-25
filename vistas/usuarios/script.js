// Objetivo: manejar la lógica de la vista de usuarios

import { API_URL } from '../config.js';


const tableData = document.getElementById('tableData');

const back = document.getElementById('back');
const pdfButton = document.getElementById('pdfButton');

const inputs = document.querySelectorAll('input');

let count = 0;
let dataD = null;


const fincas = [];

back.addEventListener('click', () => {
  window.location.href = `/vistas/home/home.html`;
});


async function cargarTabla() {

  try {
    const response = await fetch(`${API_URL}/persona`);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const users = await response.json();

    tableData.innerHTML = '';

    users.forEach(user => {
      const tableRow = document.createElement('tr');

      tableRow.innerHTML = `
        <td id="Cedula">${user.cedula}</td>
        <td id="Cedula_tp">${user.id_tipo_persona}</td>
        <td id="nombre1">${user.Nombre_1}</td>
        <td id="nombre2">${user.Nombre_2 || ''}</td>
        <td id="apellido1">${user.LastName_1 || ''}</td>
        <td id="apellido2">${user.LastName_2 || ''}</td>
        <td id="Email">${user.email}</td>
        <td id="Estado">${user.estado == true ? 'Activo' : 'Inactivo'}</td>
        <td>
          <a href="#" class="btn-add"><i class='bx bxs-plus-circle' ></i></a>
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

// Llama a la función para cargar la tabla cuando se cargue la página
window.addEventListener('DOMContentLoaded', cargarTabla);



window.addEventListener('click', async (e) => {
  count = 0;
  if (e.target.classList.contains('bxs-plus-circle')) {
    window.location.href = `/vistas/RegistrarUsuario/registro.html`;
  }
  else if (e.target.classList.contains('bxs-edit-alt')) {

    let data1 = (e.target.parentElement.parentElement.parentElement.children);
    localStorage.setItem('cedula', data1[0].textContent);
    localStorage.setItem('tipo', data1[1].textContent);
    localStorage.setItem('nombre_1', data1[2].textContent);
    localStorage.setItem('nombre_2', data1[3].textContent);
    localStorage.setItem('apellido_1', data1[4].textContent);
    localStorage.setItem('apellido_2', data1[5].textContent);
    localStorage.setItem('email', data1[6].textContent);
    localStorage.setItem('password', data1[7].textContent);
    localStorage.setItem('Estado', data1[7].textContent);


    window.location.href = `/vistas/usuarios/usuarios_edit.html`;



  } else if (e.target.classList.contains('bxs-trash-alt')) {
    dataD = (e.target.parentElement.parentElement.parentElement.children);
    swal.fire({
      title: "¿Está seguro de que desea desactivar el usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deactivateUser();
      }
    });


  } else if (e.target.classList.contains('bxs-check-circle')) {

    dataD = (e.target.parentElement.parentElement.parentElement.children);

    swal.fire({
      title: "¿Está seguro de que desea activar el usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        activateUser();
      }
    });
  }




});




const fillData = (data1) => {
  inputs[0].value = data1[0].textContent;


  inputs[1].value = data1[2].textContent;
  inputs[2].value = data1[3].textContent;
  inputs[3].value = data1[4].textContent;
  inputs[4].value = data1[5].textContent;
  inputs[5].value = data1[6].textContent;
  inputs[6].value = data1[7].textContent;




}









async function deactivateUser() {

  let opt = validarFincasActivas();

  if (!opt) {

    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se puede desactivar un usuario con fincas activas',
    });

  } else {


    const cedula = dataD[0].textContent;

    const Estado = false;
    const data = {
      cedula,
      Estado
    };


    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/DeleteUsuarios/${cedula}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
      if (this.readyState === 4 && this.status === 200) {

        swal.fire({
          icon: 'success',
          title: 'Usuario desactivado correctamente',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });

      } else {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al desactivar el usuario',
        });
      }
    };
    xhr.send(JSON.stringify(data));

  }
}

async function activateUser() {

  const cedula = dataD[0].textContent;

  const Estado = true;
  const data = {
    cedula,
    Estado
  };


  const xhr = new XMLHttpRequest();

  xhr.open('PUT', `${API_URL}/DeleteUsuarios/${cedula}`);


  xhr.setRequestHeader('Content-Type', 'application/json');
  console.log(JSON.stringify(data));
  xhr.onload = function () {
    console.log(this.response)
    if (this.readyState === 4 && this.status === 200) {

      swal.fire({
        icon: 'success',
        title: 'Usuario activado correctamente',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });


    } else {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al activar el usuario',
      });
    }
  };
  xhr.send(JSON.stringify(data));

}


function getFincas() {
  fetch(`${API_URL}/fincas`)
    .then(response => response.json())
    .then(data => {
      fincas.push(...data);
    })
    .catch(error => console.error('Error obteniendo veredas:', error));
}

window.addEventListener('DOMContentLoaded', getFincas);



function validarFincasActivas() {
  let opt = true;

  for (let i = 0; i < fincas.length; i++) {

    if (fincas[i].id_persona == dataD[0].textContent) {
      opt = false;
      break;
    }
  }
  return opt;
}

pdfButton.addEventListener('click', () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${API_URL}/pdfpersona`);
  xhr.responseType = 'blob';

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      const blob = xhr.response;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Listado_usuarios.pdf'; // Nombre del archivo PDF
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Error al obtener el PDF:', xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error('Error al obtener el PDF:', xhr.statusText);
  };
  xhr.send();
});