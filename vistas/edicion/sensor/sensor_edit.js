import { API_URL } from "../../config.js";

const idX = document.getElementById('id');
const selectTipoSensorr = document.getElementById('SelectTipoSensor');
const descriptionSensorr = document.getElementById('descriptionSensor');
const estadoo = document.getElementById('Estado')

const btnActualizar = document.getElementById('btnActualizar');
const back = document.getElementById('back');


const id = localStorage.getItem('id');
const informacion = localStorage.getItem('informacion');
const id_tp_sensorr = localStorage.getItem('id_tp_sensor');
const estado = localStorage.getItem('estado');


back.addEventListener('click', () => {
    window.location.href = '../sensor/sensor_crud.html';
});


function cargarDatos() {
    idX.value = id,
        selectTipoSensorr.value = id_tp_sensorr,
        descriptionSensorr.value = informacion,
        estadoo.value = estado
}

window.onload = cargarDatos;


async function getTpsensor() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Tipo_sensor`);

    const SelectTipoSensor = document.getElementById('SelectTipoSensor');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);

            for (let i = 0; i < data.length; i++) {
                const sensor = data[i];
                const option = document.createElement('option');
                option.value = sensor.Id;
                option.innerText = sensor.Descripcion;
                SelectTipoSensor.appendChild(option);

            }
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };

    xhr.send();
}

getTpsensor();



async function updateData() {
    const id = idX.value;
    const informacion = descriptionSensorr.value;
    const id_tp_sensor = selectTipoSensorr.value == 0 ? id_tp_sensorr : selectTipoSensorr.value;
    const estado = estadoo.value;

    const data = {
        id,
        informacion,
        id_tp_sensor,
        estado
    };
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/sensor/${id}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            swal.fire({
                title: 'Sensor actualizado correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '../sensor/sensor_crud.html';
            });
        } else {
            swal.fire({
                title: 'Error al actualizar el sensor',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    xhr.send(JSON.stringify(data));

}

btnActualizar.addEventListener('click', updateData);