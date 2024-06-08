import { API_URL } from '../../config.js'

const idx = document.getElementById('id');
const descripcionn = document.getElementById('descripcion');
const estadoo = document.getElementById('Estado');


const btnActualizar = document.getElementById('btnActualizar');

const back = document.getElementById('back');

const id = localStorage.getItem('id');
const descripcion = localStorage.getItem('Descripcion');
const estado = localStorage.getItem('estado');

back.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/tp_sensor/tp_sensor_crud.html`;
}
);


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

    xhr.open('PUT', `${API_URL}/tipo_sensor/${id}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            swal.fire({
                title: 'Tipo de sensor actualizado',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '/vistas/edicion/tp_sensor/tp_sensor_crud.html';
            });

        } else {
            swal.fire({
                title: 'Error al actualizar el tipo de sensor',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    xhr.send(JSON.stringify(data));

}

btnActualizar.addEventListener('click', updateData);