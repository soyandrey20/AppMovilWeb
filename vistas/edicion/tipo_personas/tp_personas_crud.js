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


const personas = [];


async function cargarTabla() {
    try {
        const response = await fetch(`${API_URL}/Tipo_persona`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const users = await response.json();

        tableData.innerHTML = '';

        users.forEach(user => {
            const tableRow = document.createElement('tr');

            tableRow.innerHTML = `
        <td id="id">${user.id}</td>
        <td id="id_persona" disabled>${user.descripcion}</td>
    
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

/**------------------------------------------------volver atras----------------------------------------- */
const btnBack = document.getElementById('back');
btnBack.addEventListener('click', () => {
    window.location.href = `/vistas/personas/tipo_persona.html`;
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

    let opt = validarTpPersonaActiva();
    if (!opt) {
        Swal.fire({
            title: 'Error',
            text: 'No se puede desactivar el tipo de persona porque esta siendo usado',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        modal1.classList.toggle('translate');
    }
    else {
        const id = dataD[0].textContent;

        const estado = false;
        const data = {
            id,
            estado
        };


        const xhr = new XMLHttpRequest();

        xhr.open('PUT', `${API_URL}/deleteTipo_persona/${id}`);


        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.response);
                console.log(data);

                Swal.fire({
                    icon: 'success',
                    title: 'Usuario desactivado',
                    text: 'Usuario desactivado correctamente',
                    confirmButtonText: `Aceptar`,
                });

                cargarTabla();

                modal1.classList.toggle('translate');
            } else {
                console.log(this.status);
                console.error('Error fetching users:', this.statusText);
                Swal.fire({
                    title: 'Error',
                    text: 'No se ha podido desactivar el tipo de persona',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        };
        xhr.send(JSON.stringify(data));

    }
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

    xhr.open('PUT', `${API_URL}/deleteTipo_persona/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);
            Swal.fire({
                title: 'tipo de persona activado  ',
                text: 'El tipo de persona ha sido activado correctamente',
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
                text: 'No se ha podido activar el tipo de persona',
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
    const descripcion = inputs[1].value;


    const estado = inputs[2].value;
    const data = {
        id,
        descripcion,
        estado
    };
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/Tipo_persona/${id}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const datad = JSON.parse(this.response);
            console.log(datad);

            Swal.fire({
                title: 'tipo de persona actualizado',
                text: 'El tipo de persona ha sido actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            cargarTabla();
            modal.classList.toggle('translate');
        } else {
            console.log(this.status);
            console.error('Error fetching users:', this.statusText);
            Swal.fire({
                title: 'Error al actualizar tipo de persona',
                text: 'Ha ocurrido un error al actualizar el tipo de persona',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };
    xhr.send(JSON.stringify(data));

}

function getpersonas() {
    fetch(`${API_URL}/persona`)
        .then(response => response.json())
        .then(data => {
            personas.push(...data);
        });
}

getpersonas();

function validarTpPersonaActiva() {
    let opt = true;
    for (let i = 0; i < personas.length; i++) {

        if (personas[i].id_tipo_persona == dataD[0].textContent) {

            opt = false;
        }
    }

    return opt;
}