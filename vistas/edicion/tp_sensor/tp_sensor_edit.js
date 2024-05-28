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
            window.alert('tipo de sensor actualizado');
            window.location.href = '/vistas/edicion/tp_sensor/tp_sensor_crud.html';
        } else {
            window.alert('Error al actualizar el tipo de sensor');
        }
    };
    xhr.send(JSON.stringify(data));

}

btnActualizar.addEventListener('click', updateData);