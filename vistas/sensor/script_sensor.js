import { API_URL } from '../config.js';


var listaTpSensores = [];
const listaSensores = [];
const back = document.getElementById('back');

back.addEventListener('click', () => {
    window.location.href = '/vistas/edicion/sensor/sensor_crud.html';
});


async function getSensor() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/sensor`);

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            listaSensores.push(...data);

        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };
    xhr.send();
}

function validarSensor() {
    let existe = true;

    const descriptionSensor = document.getElementById('descriptionSensor');
    const idSelectTipoSensor = document.getElementById('SelectTipoSensor');
    if (idSelectTipoSensor.value === '0') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe seleccionar un tipo de sensor',
            confirmButtonText: 'Aceptar'
        });
        existe = false;
    } else if (descriptionSensor.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe ingresar una descripción',
            confirmButtonText: 'Aceptar'
        });
        existe = false;
    } else if (listaSensores.find(sensor => sensor.informacion === descriptionSensor.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ya existe un sensor con ese tipo',
            confirmButtonText: 'Aceptar'
        });
        existe = false;
    }
    return existe;

}


async function getTpsensor() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Tipo_sensor`);

    const SelectTipoSensor = document.getElementById('SelectTipoSensor');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            listaTpSensores = data;
            console.log(data);
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
getSensor();

async function addSensor() {

    let valida = validarSensor();

    if (!valida) {
        swal.fire({
            title: 'Error al agregar el sensor',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
        });
    } else {

        const descriptionSensor = document.getElementById('descriptionSensor');
        const idSelectTipoSensor = document.getElementById('SelectTipoSensor');



        const xhr = new XMLHttpRequest();

        xhr.open('post', `${API_URL}/sensor`);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            id_tp_sensor: idSelectTipoSensor.value,
            informacion: descriptionSensor.value
        }));
        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {

                Swal.fire({
                    icon: 'success',
                    title: 'Sensor creado',
                    text: 'Sensor creado correctamente',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    window.location.href = '/vistas/edicion/sensor/sensor_crud.html';
                });
            } else {
                console.error('Error fetching users:', this.statusText);

            }
        };
    }
}


const btnAddSensor = document.getElementById('addSensor');

btnAddSensor.addEventListener('click', addSensor);


const btnSetings = document.getElementById('btnSetings');

btnSetings.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/sensor/sensor_crud.html`;
});