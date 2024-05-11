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
        const response = await fetch(`${URL_API}/parametro`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const users = await response.json();

        tableData.innerHTML = '';

        users.forEach(user => {
            const tableRow = document.createElement('tr');

            tableRow.innerHTML = `
        <td id="id">${user.id}</td>
        <td id="id_parametro" disabled>${user.id_Tp_Parametro}</td>
       
        <td id="id_sensor" disabled>${user.Rango_inferior}</td>
        <td id="id_sensor" disabled>${user.Rango_Superior}</td>
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


/**-------------------------boton de atras */
const btnBack = document.getElementById('back');
btnBack.addEventListener('click', () => {
    window.location.href = `/vistas/parametro/parametro.html`;
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

    xhr.open('PUT', `${URL_API}/DeleteParametro/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);

            Swal.fire({
                icon: 'success',
                title: 'Parametro desactivado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            cargarTabla();

            modal1.classList.toggle('translate');
        } else {
            console.log(this.status);
            console.error('Error fetching users:', this.statusText);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo desactivar el parametro',
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

    xhr.open('PUT', `${URL_API}/DeleteParametro/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);

            Swal.fire({
                title: 'Parametro activado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            cargarTabla();

            modal2.classList.toggle('translate');
        } else {
            console.log(this.status);
            console.error('Error fetching users:', this.statusText);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo activar el parametro',
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
    const id_Tp_Parametro = inputs[1].value;
    const Rango_inferior = inputs[2].value;
    const Rango_Superior = inputs[3].value;
    const estado = inputs[4].value;
    const data = {
        id,
        id_Tp_Parametro,
        Rango_inferior,
        Rango_Superior,
        estado
    };
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${URL_API}/parametro/${id}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const datad = JSON.parse(this.response);
            console.log(datad);

            Swal.fire({
                title: '¡Éxito!',
                text: 'Parametro actualizado correctamente.',
                icon: 'success'
            });
            cargarTabla();
            modal.classList.toggle('translate');
        } else {
            console.log(this.status);
            console.error('Error fetching users:', this.statusText);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar el parametro',
                icon: 'error'
            });
        }
    };
    xhr.send(JSON.stringify(data));

}
