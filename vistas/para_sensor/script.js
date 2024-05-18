
import { API_URL } from '../config.js';



const parametro_sensor = [];



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


async function addParaSensor() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}/parametro_sensor`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const SelectTipoParametro = document.getElementById('SelectTipoParametro');
    const SelectTipoSensor = document.getElementById('SelectTipoSensor');


    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);
            Swal.fire({
                icon: 'success',
                title: 'parametro_sensor creado',
                text: 'parametro_sensor creado correctamente',
                confirmButtonText: 'Aceptar'
            });
        } else {
            console.error('Error fetching users:', this.statusText);
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido crear el parametro_sensor',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    xhr.send(JSON.stringify({
        id_parametro: SelectTipoParametro.value,
        id_sensor: SelectTipoSensor.value,

    }));
}

const addParaSensors = document.getElementById('addParaSensor');

addParaSensors.addEventListener('click', validarParaSensor);


const btnSetings = document.getElementById('btnSetings');

btnSetings.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/para_sensor/parametro_sensor_crud.html`;
});

async function getParaSensor() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/parametro_sensor`);

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);

            parametro_sensor.push(...data);
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };

    xhr.send();
}

async function validarParaSensor() {
    const SelectTipoParametro = document.getElementById('SelectTipoParametro');
    const SelectTipoSensor = document.getElementById('SelectTipoSensor');

    if (SelectTipoParametro.value === 0 || SelectTipoSensor.value === 0) {
        Swal.fire({
            title: 'Error',

            text: 'todos los campos son obligatorios',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });

        return;
    } else if (parametro_sensor.find((parametro_sensor) => parametro_sensor.id_parametro === SelectTipoParametro.value && parametro_sensor.id_sensor === SelectTipoSensor.value)) {
        Swal.fire({
            title: 'Error',
            text: 'El parametro_sensor ya existe',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    addParaSensor();
}