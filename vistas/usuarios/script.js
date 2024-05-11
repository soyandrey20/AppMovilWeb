// Objetivo: manejar la lógica de la vista de usuarios

const URL_API = 'http://192.168.1.6:3000';

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



async function cargarTabla() {
  try {
    const response = await fetch(`${URL_API}/persona`);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const users = await response.json();

    tableData.innerHTML = '';

    users.forEach(user => {
      const tableRow = document.createElement('tr');

      tableRow.innerHTML = `
        <td id="Cedula">${user.cedula}</td>
        <td id="nombre1">${user.Nombre_1}</td>
        <td id="nombre2">${user.Nombre_2 || ''}</td>
        <td id="apellido1">${user.LastName_1 || ''}</td>
        <td id="apellido2">${user.LastName_2 || ''}</td>
        <td id="Email">${user.email}</td>
        <td id="Estado">${user.estado}</td>
        <td>
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

// Llama a la función para cargar la tabla cuando se cargue la página
window.addEventListener('DOMContentLoaded', cargarTabla);


btnClose.addEventListener('click', () => {

  modal.classList.toggle('translate');
  modal.classList.toggle('translate');

});


window.addEventListener('click', async (e) => {
  count = 0;

  if (e.target.classList.contains('bxs-edit-alt')) {

    let data1 = (e.target.parentElement.parentElement.parentElement.children);
    fillData(data1);
    modal.classList.toggle('translate');
  } else if (e.target.classList.contains('bxs-trash-alt')) {
    modal1.classList.toggle('translate');
    dataD = (e.target.parentElement.parentElement.parentElement.children);

  } else if (e.target.classList.contains('bxs-check-circle')) {
    modal2.classList.toggle('translate');
    dataD = (e.target.parentElement.parentElement.parentElement.children);
  }




});

btnEliminar.addEventListener('click', deleteCiudad);

btnCancelar.addEventListener('click', () => {

  modal1.classList.toggle('translate');
});

btnActivate.addEventListener('click', activateUser);

btnCancelar1.addEventListener('click', () => {
  modal2.classList.toggle('translate');
});


const fillData = (data1) => {
  for (let index of inputs) {

    index.value = data1[count].textContent;

    count++;
  }



}
async function updateData() {
  const Cedula = inputs[0].value;
  const Nombre_1 = inputs[1].value;
  const Nombre_2 = inputs[2].value;
  const LastName_1 = inputs[3].value;
  const LastName_2 = inputs[4].value;
  const Email = inputs[5].value;
  const Estado = inputs[6].value;
  const data = {
    Cedula,
    Nombre_1,
    Nombre_2,
    LastName_1,
    LastName_2,
    Email,
    Estado
  };
  const xhr = new XMLHttpRequest();

  xhr.open('PUT', `${URL_API}/persona/${Cedula}`);

  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      const datad = JSON.parse(this.response);
      console.log(datad);

      Swal.fire({
        icon: 'success',
        title: 'Usuario actualizado',
        text: 'Usuario actualizado correctamente',
        confirmButtonText: 'Aceptar'
      });
      cargarTabla();
      modal.classList.toggle('translate');
    } else {
      console.log(this.status);
      console.error('Error fetching users:', this.statusText);

    }
  };
  xhr.send(JSON.stringify(data));

}








async function deleteCiudad() {

  const cedula = dataD[0].textContent;

  const Estado = false;
  const data = {
    cedula,
    Estado
  };


  const xhr = new XMLHttpRequest();

  xhr.open('PUT', `${URL_API}/DeleteUsuarios/${Cedula}`);


  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      const data = JSON.parse(this.response);
      console.log(data);

      Swal.fire({
        title: 'Usuario desactivado',
        text: 'Usuario desactivado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      cargarTabla();

      modal1.classList.toggle('translate');
    } else {
      console.log(this.status);
      console.error('Error fetching users:', this.statusText);
    }
  };
  xhr.send(JSON.stringify(data));

}

async function activateUser() {

  const cedula = dataD[0].textContent;

  const Estado = true;
  const data = {
    cedula,
    Estado
  };


  const xhr = new XMLHttpRequest();

  xhr.open('PUT', `${URL_API}/DeleteUsuarios/${Cedula}`);


  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      const data = JSON.parse(this.response);
      console.log(data);

      Swal.fire({
        title: 'Usuario activado',
        text: 'Usuario activado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      cargarTabla();

      modal2.classList.toggle('translate');
    } else {
      console.log(this.status);
      console.error('Error fetching users:', this.statusText);

    }
  };
  xhr.send(JSON.stringify(data));

}



btnClose.addEventListener('click', () => {

  modal.classList.toggle('translate');
});



btnConfirm.addEventListener('click', updateData);