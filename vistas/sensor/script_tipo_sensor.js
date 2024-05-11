
const API_URL = 'http://192.168.56.1:3000';


const listaTpSensores = [];


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

async function validarTpSensor() {
    const descriptionSensor = document.getElementById('descriptionSensor');
    for (let i = 0; i < listaTpSensores.length; i++) {
        if (descriptionSensor.value == listaTpSensores[i].Descripcion) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El tipo de sensor ya existe',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
    }
    addParametro();


}



async function addParametro() {
    const descriptionSensor = document.getElementById('descriptionSensor');
    const xhr = new XMLHttpRequest();

    xhr.open('post', `${API_URL}/Tipo_sensor`);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        Descripcion: descriptionSensor.value
    }));
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            Swal.fire({
                icon: 'success',
                title: 'Tipo de sensor creado',
                text: 'El tipo de sensor se ha creado correctamente',
                confirmButtonText: 'Aceptar'
            });
            window.location.href = window.location.href;
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };


}

const addSensorButton = document.getElementById('addSensor');
addSensorButton.addEventListener('click', validarTpSensor);

const btnSetings = document.getElementById('btnSetings');

btnSetings.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/tp_sensor/tp_sensor_crud.html`;
});