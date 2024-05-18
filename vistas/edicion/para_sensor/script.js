import { API_URL } from '../../config.js'

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

async function getTipoPersona() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${API_URL}/Tipo_parametro`);

  const SelectTipoParametro = document.getElementById('SelectTipoParametro');
  xhr.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      const data = JSON.parse(this.response);

      for (let i = 0; i < data.length; i++) {
        const parametro = data[i];
        const option = document.createElement('option');
        option.value = parametro.Id;
        option.innerText = parametro.Descripcion;
        SelectTipoParametro.appendChild(option);

      }
    } else {
      console.error('Error fetching users:', this.statusText);
    }
  };

  xhr.send();
}



async function getSensor() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${API_URL}/sensor`);

  const SelectTipoSensor = document.getElementById('SelectTipoSensor');

  xhr.onload = function () {


    if (this.readyState === 4 && this.status === 200) {
      const data = JSON.parse(this.response);

      for (let i = 0; i < data.length; i++) {
        const sensor = data[i];

        const option = document.createElement('option');
        option.value = sensor.Id;
        option.innerText = sensor.informacion;
        SelectTipoSensor.appendChild(option);

      }
    } else {
      console.error('Error fetching users:', this.statusText);
    }
  };
  xhr.send();

}

getTipoPersona();
getSensor();



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
        <td id="estado" disabled>${user.estado}</td>
  
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

window.addEventListener('DOMContentLoaded', cargarTabla);
/**-------------------------------------------------- volver-------------------------------- */
const btnBack = document.getElementById('back');
btnBack.addEventListener('click', () => {
  window.location.href = `/vistas/para_sensor/para_sensor.html`;
});



/** ---------------------------------------------------------- abrir modal */


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

/** ---------------------------------------------------------- cerrar modal */



btnClose.addEventListener('click', () => {

  modal.classList.toggle('translate');


});

btnCancelar1.addEventListener('click', () => {
  modal2.classList.toggle('translate');
});

btnCancelar.addEventListener('click', () => {

  modal1.classList.toggle('translate');
});

/** ---------------------------------------------------------- llenar datos en el modal */
const fillData = (data1) => {
  inputs[0].value = data1[0].textContent;


  inputs[1].value = data1[3].textContent;


}

/** ---------------------------------------------------------- eliminar usuario */
btnEliminar.addEventListener('click', deleteCiudad);

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
      const data = JSON.parse(this.response);
      console.log(data);
      Swal.fire({
        title: 'Parametro sensor desactivado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      cargarTabla();

      modal1.classList.toggle('translate');
    } else {
      console.log(this.status);
      console.error('Error fetching users:', this.statusText);
      Swal.fire({
        title: 'Error al desactivado el parametro sensor',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };
  xhr.send(JSON.stringify(data));

}

/** ---------------------------------------------------------- activar usuario */



btnActivate.addEventListener('click', activateUser);
btnConfirm.addEventListener('click', updateData);

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
      const data = JSON.parse(this.response);
      console.log(data);
      Swal.fire({
        title: 'Parametro sensor activado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      cargarTabla();

      modal2.classList.toggle('translate');
    } else {
      console.log(this.status);
      console.error('Error fetching users:', this.statusText);
      Swal.fire({
        title: 'Error al activar el parametro sensor',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };
  xhr.send(JSON.stringify(data));

}


/** ---------------------------------------------------------- actualizar usuario */

async function updateData() {
  const id = inputs[0].value;
  const id_parametro = document.getElementById('SelectTipoParametro').value;
  const id_sensor = document.getElementById('SelectTipoSensor').value;
  const estado = inputs[1].value;
  const data = {
    id,
    id_parametro,
    id_sensor,
    estado
  };

  const xhr = new XMLHttpRequest();

  xhr.open('PUT', `${API_URL}/parametro_sensor/${id}`);

  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      const datad = JSON.parse(this.response);
      console.log(datad);

      Swal.fire({
        title: 'Parametro sensor actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      cargarTabla();
      modal.classList.toggle('translate');
    } else {
      console.log(this.status);
      console.error('Error fetching users:', this.statusText);
      Swal.fire({
        title: 'Error al actualizar el parametro sensor',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };
  xhr.send(JSON.stringify(data));

}

