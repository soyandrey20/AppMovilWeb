import { API_URL } from "../../config.js";


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
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
  }
}

window.addEventListener('DOMContentLoaded', cargarTabla);
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

      window.alert('Parametro sensor eliminado correctamente');


      cargarTabla();


    } else {

      window.alert('Error al eliminar el parametro sensor');
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

      window.alert('Parametro sensor activado correctamente');
      cargarTabla();

    } else {

      window.alert('Error al activar el parametro sensor');
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

  xhr.onload = async function () {
    if (this.readyState === 4 && this.status === 200) {

      window.alert('Parametro sensor actualizado correctamente');
      cargarTabla();

    } else {

      window.alert('Error al actualizar el parametro sensor');
    }
  };
  xhr.send(JSON.stringify(data));


}

