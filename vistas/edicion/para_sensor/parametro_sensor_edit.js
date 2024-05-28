import { API_URL } from "../../config.js";

const idX = document.getElementById('id');
const SelectTipoSensorx = document.getElementById('SelectTipoSensor');
const SelectTipoParametrox = document.getElementById('SelectTipoParametro');
const estadox = document.getElementById('Estado');

const btnActualizar = document.getElementById('btnActualizar');
const back = document.getElementById('back');

const idd = localStorage.getItem('id');
const id_sensorr = localStorage.getItem('id_sensor');
const id_parametroo = localStorage.getItem('id_parametro');
const estadoo = localStorage.getItem('estado');

function cargarDatos() {
    idX.value = idd,
        SelectTipoSensorx.value = id_sensorr,
        SelectTipoParametrox.value = id_parametroo,
        estadox.value = estadoo

}

window.onload = cargarDatos;


async function getParametro() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Tipo_parametro`);

    const SelectTipoParametro = document.getElementById('SelectTipoParametro');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);

            for (let i = 0; i < data.length; i++) {
                const parametro = data[i];
                const option = document.createElement('option');
                option.value = parametro.Id;
                option.innerText = parametro.Descripcion;
                SelectTipoParametro.appendChild(option);

            }
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };

    xhr.send();
}




async function getSensor() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/sensor`);

    const SelectTipoSensor = document.getElementById('SelectTipoSensor');

    xhr.onload = function () {


        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);

            for (let i = 0; i < data.length; i++) {
                const sensor = data[i];

                const option = document.createElement('option');
                option.value = sensor.Id;
                option.innerText = sensor.informacion;
                SelectTipoSensor.appendChild(option);

            }
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };
    xhr.send();

}
getParametro();
getSensor();


async function updateData() {
    const id = idX.value;
    const id_parametro = SelectTipoParametrox.value == 0 ? id_parametroo : SelectTipoParametrox.value;
    const id_sensor = SelectTipoSensorx.value == 0 ? id_sensorr : SelectTipoSensorx.value;
    const estado = estadox.value;

    const data = {
        id,
        id_parametro,
        id_sensor,
        estado
    };

    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/parametro_sensor/${id}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = async function () {
        if (this.readyState === 4 && this.status === 200) {

            window.alert('Parametro sensor actualizado correctamente');
            window.location.href = '/vistas/edicion/para_sensor/parametro_sensor_crud.html';
        } else {

            window.alert('Error al actualizar el parametro sensor');
        }
    };
    xhr.send(JSON.stringify(data));


}

btnActualizar.addEventListener('click', updateData);

back.addEventListener('click', () => {
    window.location.href = '/vistas/edicion/para_sensor/parametro_sensor_crud.html';
});