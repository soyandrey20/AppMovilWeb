const URL_API = 'http://localhost:3000';

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
        const response = await fetch(`${URL_API}/sensor`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const users = await response.json();

        tableData.innerHTML = '';

        users.forEach(user => {
            const tableRow = document.createElement('tr');

            tableRow.innerHTML = `
        <td id="id">${user.Id}</td>
        <td id="id_parametro" disabled>${user.informacion}</td>
       
        <td id="id_sensor" disabled>${user.id_tp_sensor}</td>
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

/**---------------------------volver atras----------------------- */

const btnBack = document.getElementById('back');
btnBack.addEventListener('click', () => {
    window.location.href = `/vistas/sensor/sensor.html`;
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
    for (let index of inputs) {

        index.value = data1[count].textContent;

        count++;
    }



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

    xhr.open('PUT', `${URL_API}/deleteSensor/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);
            Swal.fire({
                title: 'Sensor desactivado',
                text: 'El sensor ha sido desactivado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            cargarTabla();

            modal1.classList.toggle('translate');
        } else {
            console.log(this.status);
            console.error('Error fetching users:', this.statusText);
            Swal.fire({
                title: 'Error al desactivar sensor',
                text: 'Ha ocurrido un error al desactivar el sensor',
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

    xhr.open('PUT', `${URL_API}/deleteSensor/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);
            swal.fire({
                title: 'Sensor activado',
                text: 'El sensor ha sido activado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            cargarTabla();

            modal2.classList.toggle('translate');
        } else {
            console.log(this.status);
            console.error('Error fetching users:', this.statusText);
            swal.fire({
                title: 'Error al activar sensor',
                text: 'Ha ocurrido un error al activar el sensor',
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
    const informacion = inputs[1].value;
    const id_tp_sensor = inputs[2].value;

    const estado = inputs[3].value;
    const data = {
        id,
        informacion,
        id_tp_sensor,
        estado
    };
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${URL_API}/sensor/${id}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const datad = JSON.parse(this.response);
            console.log(datad);
            
            Swal.fire({
                title: 'Sensor actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            cargarTabla();
            modal.classList.toggle('translate');
        } else {
            console.log(this.status);
            console.error('Error fetching users:', this.statusText);
            Swal.fire({
                title: 'Error al actualizar el sensor',
                text: 'No se pudo actualizar el sensor',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };
    xhr.send(JSON.stringify(data));

}
