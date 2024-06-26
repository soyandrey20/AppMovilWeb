import { API_URL } from '../../config.js'


const idx = document.getElementById('id');
const descripcionn = document.getElementById('Descripcion');
const estadoo = document.getElementById('Estado');
const btnActualizar = document.getElementById('btnActualizar');
const back = document.getElementById('back');
const id = localStorage.getItem('id');
const descripcion = localStorage.getItem('descripcion');
const estado = localStorage.getItem('estado');

function cargarDatos() {
    idx.value = id;
    descripcionn.value = descripcion;
    estadoo.value = estado;
}

cargarDatos();


async function updateData() {
    const id = idx.value;
    const Descripcion = descripcionn.value;


    const estado = estadoo.value;
    const data = {
        id,
        Descripcion,
        estado
    };
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/Tipo_parametro/${id}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            swal.fire({
                title: 'Tipo de parametro actualizado correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '/vistas/edicion/tp_parametro/tp_parametro_crud.html';
            });
        } else {
            swal.fire({
                title: 'Error al actualizar el tipo de parametro',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    xhr.send(JSON.stringify(data));

}

btnActualizar.addEventListener('click', updateData);


back.addEventListener('click', () => {
    window.location.href = '/vistas/edicion/tp_parametro/tp_parametro_crud.html';
});