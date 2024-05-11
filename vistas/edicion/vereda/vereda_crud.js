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
        const response = await fetch(`${URL_API}/Vereda`);

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
    window.location.href = `/vistas/vereda/vereda.html`;
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
    inputs[1].value = data1[1].textContent;
    inputs[2].value = data1[3].textContent;


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

    xhr.open('PUT', `${URL_API}/deleteVereda/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);
            Swal.fire({
                title: 'vereda desactivada',
                text: 'vereda desactivada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            cargarTabla();

            modal1.classList.toggle('translate');
        } else {
            console.log(this.status);
            console.error('Error fetching users:', this.statusText);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al desactivar la vereda',
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

    xhr.open('PUT', `${URL_API}/deleteVereda/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);
            Swal.fire({
                title: 'vereda activada',
                text: 'vereda activada correctamente',
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
                text: 'Error al activar la vereda',
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
    const nombre = inputs[1].value;
    const id_ciudad = document.getElementById('SelectCiudad').value;
    const estado = inputs[2].value;
    const data = {
        id,
        nombre,
        id_ciudad,
        estado
    };

    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${URL_API}/Vereda/${id}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const datad = JSON.parse(this.response);

            Swal.fire({
                title: 'vereda actualizada',
                text: 'vereda actualizada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });


            modal.classList.toggle('translate');
        } else {
            console.log(this.status);
            console.error('Error fetching users:', this.statusText);
            Swal.fire({
                title: 'Error',
                text: 'Error al actualizar la vereda',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };
    xhr.send(JSON.stringify(data));

}
async function getCiudad() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${URL_API}/Ciudad`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const SelectCiudad = document.getElementById('SelectCiudad');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const ciudades = JSON.parse(this.responseText);

            for (let i = 0; i < ciudades.length; i++) {
                const ciudad = ciudades[i];
                const option = document.createElement('option');
                option.value = ciudad.id;
                option.innerText = ciudad.nombre;
                SelectCiudad.appendChild(option);
            }

        } else {
            console.error('Error get Ciudad:', this.status);
        }
    };

    xhr.send();

}

getCiudad();