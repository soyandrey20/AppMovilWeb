import { API_URL } from "../../config";

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

/** ---------------------------------------------------------- devolverse */
const btnBack = document.getElementById('back');
btnBack.addEventListener('click', () => {
    window.location.href = `/vistas/ciudad/ciudad.html`;
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

    xhr.open('PUT', `${API_URL}/DeleteCiudad/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);

            Swal.fire({
                title: '¡Éxito!',
                text: 'Usuario desactivado correctamente.',
                icon: 'success'
            });

            cargarTabla();

            modal1.classList.toggle('translate');
        } else {
            console.log(this.status);
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al desactivar el usuario.',
                icon: 'error'
            });
        }
    };
    xhr.send(JSON.stringify(data));

}

/** ---------------------------------------------------------- activar usuario */



btnActivate.addEventListener('click', activateUser);
btnConfirm.addEventListener('click', validarUpdate);

async function validarUpdate() {
    if (document.getElementById('SelectTipoDepartamento').value == 0) {
        Swal.fire({
            title: 'Error',
            text: 'Debe seleccionar un departamento valido.',
            icon: 'error'
        });
        return false;
    }
    updateData();
}

async function activateUser() {

    const id = dataD[0].textContent;

    const estado = true;
    const data = {
        id,
        estado
    };


    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/DeleteCiudad/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);
            Swal.fire({
                title: '¡Éxito!',
                text: 'Usuario activado correctamente.',
                icon: 'success'
            });
            cargarTabla();

            modal2.classList.toggle('translate');
        } else {
            console.log(this.status);
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al activar el usuario.',
                icon: 'error'
            });
        }
    };
    xhr.send(JSON.stringify(data));

}


/** ---------------------------------------------------------- actualizar usuario */

async function updateData() {
    const id = inputs[0].value;
    const nombre = inputs[1].value;
    const id_departamento = document.getElementById('SelectTipoDepartamento').value;

    const estado = inputs[2].value;
    const data = {
        id,
        nombre,
        id_departamento,
        estado
    };
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/ciudad/${Cedula}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const datad = JSON.parse(this.response);
            console.log(datad);
            Swal.fire({
                title: '¡Éxito!',
                text: 'Usuario actualizado correctamente.',
                icon: 'success'
            });
            cargarTabla();
            modal.classList.toggle('translate');
        } else {
            console.log(this.status);
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al actualizar el usuario.',
                icon: 'error'
            });
        }
    };
    xhr.send(JSON.stringify(data));

}
async function modalDinacontent() {
    const response = await fetch(`${API_URL}/departamento`);
    const data = await response.json();
    let content = '';
    data.forEach(element => {
        content += `<option value="${element.id}">${element.nombre}</option>`;
    });
    document.getElementById('departamento').innerHTML = content;
}

async function getDepart() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Departamento`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const SelectDepartamento = document.getElementById('SelectTipoDepartamento');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const departamentos = JSON.parse(this.responseText);

            for (let i = 0; i < departamentos.length; i++) {
                const departamento = departamentos[i];
                const option = document.createElement('option');
                option.value = departamento.id;
                option.innerText = departamento.nombre;
                SelectDepartamento.appendChild(option);
            }

        } else {
            console.error('Error get Departamentos:', this.status);
        }
    };

    xhr.send();

}

getDepart();








