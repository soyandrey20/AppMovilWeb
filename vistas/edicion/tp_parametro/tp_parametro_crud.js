import { API_URL } from '../../config.js'

const userTable = document.getElementById('userTable');
const tableData = document.getElementById('tableData');


const inputs = document.querySelectorAll('input');


let count = 0;
let dataD = null;

const parametros = [];

async function cargarTabla() {
    try {
        const response = await fetch(`${API_URL}/tipo_parametro`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const users = await response.json();

        tableData.innerHTML = '';

        users.forEach(user => {
            const tableRow = document.createElement('tr');

            tableRow.innerHTML = `
        <td id="id">${user.Id}</td>
        <td id="id_parametro" disabled>${user.Descripcion}</td>
    
        <td id="estado" disabled>${user.estado == true ? 'Activo' : 'Inactivo'}</td>
  
        <td>
        <a href="#" class="btn-update"><i class='bx bx-plus-circle' ></i></a>
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
    window.location.href = `/vistas/home/home.html`;
});


/** ---------------------------------------------------------- abrir modal */


window.addEventListener('click', async (e) => {
    count = 0;
    if (e.target.classList.contains('bx-plus-circle')) {
        window.location.href = `/vistas/parametro/tipo_parametro.html`;
    }

    else if (e.target.classList.contains('bxs-edit-alt')) {

        let data1 = (e.target.parentElement.parentElement.parentElement.children);
        localStorage.setItem('id', data1[0].textContent);
        localStorage.setItem('descripcion', data1[1].textContent);
        localStorage.setItem('estado', data1[2].textContent);

        window.location.href = `/vistas/edicion/tp_parametro/tp_parametro_edit.html`;

    } else if (e.target.classList.contains('bxs-trash-alt')) {

        dataD = (e.target.parentElement.parentElement.parentElement.children);
        const opt = window.confirm('¿Está seguro de que desea eliminar el tipo de parametro?');
        if (opt) {
            deleteCiudad();
        }

    } else if (e.target.classList.contains('bxs-check-circle')) {

        dataD = (e.target.parentElement.parentElement.parentElement.children);

        const opt = window.confirm('¿Está seguro de que desea activar el tipo de parametro?');
        if (opt) {
            activateUser();
        }

    }
});



/** ---------------------------------------------------------- llenar datos en el modal */
const fillData = (data1) => {
    for (let index of inputs) {

        index.value = data1[count].textContent;

        count++;
    }



}

/** ---------------------------------------------------------- eliminar usuario */


async function deleteCiudad() {

    let opt = validarTpParamaActivo();

    if (!opt) {
        window.alert('No se puede eliminar el tipo de parametro ya que esta siendo utilizado en un parametro');
    } else {

        const id = dataD[0].textContent;


        const estado = false;
        const data = {
            id,
            estado
        };


        const xhr = new XMLHttpRequest();

        xhr.open('PUT', `${API_URL}/DeleteTipo_parametro/${id}`);


        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                window.alert('Tipo de parametro eliminado correctamente');
                cargarTabla();
            } else {
                window.alert('Error al eliminar el tipo de parametro');

            }
        };
        xhr.send(JSON.stringify(data));

    }
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

    xhr.open('PUT', `${API_URL}/DeleteTipo_parametro/${id}`);


    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            window.alert('Tipo de parametro activado correctamente');
            cargarTabla();
        } else {
            window.alert('Error al activar el tipo de parametro');
        }
    };
    xhr.send(JSON.stringify(data));

}




function validarTpParamaActivo() {
    let opt = true;
    for (let i = 0; i < parametros.length; i++) {

        if (parametros[i].id_Tp_Parametro == dataD[0].textContent) {

            opt = false;
        }
    }

    return opt;

}
