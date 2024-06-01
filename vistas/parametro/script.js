import { API_URL } from '../config.js';

const parametro = [];

const back = document.getElementById('back')

back.addEventListener('click', () => {
    window.location.href = '/vistas/edicion/parametro/parametro_crud.html';
});

async function getParametro() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/parametro`);


    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);
            parametro.push(...data);
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };

    xhr.send();
}



async function getTpParametro() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Tipo_parametro`);

    const SelectTipoParametro = document.getElementById('SelectTipoParametro');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                const sensor = data[i];
                const option = document.createElement('option');
                option.value = sensor.Id;
                option.innerText = sensor.Descripcion;
                SelectTipoParametro.appendChild(option);

            }
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };

    xhr.send();
}


async function addParametro() {

    const idTipoSensor = document.getElementById('SelectTipoParametro').value;
    const RangoSuperior = document.getElementById('RangoSuperior').value;
    const RangoInferior = document.getElementById('RangoInferior').value;
    console.log(idTipoSensor);

    const data = {
        id_Tp_Parametro: idTipoSensor,
        Rango_Superior: RangoSuperior,
        Rango_inferior: RangoInferior
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}/parametro`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {

        if (this.readyState === 4 && this.status === 200) {
            window.alert('Parametro creado correctamente');
            window.location.href = '/vistas/edicion/parametro/parametro_crud.html';
        } else {
            window.alert('Error al crear el parametro');
        }
    };

    xhr.send(JSON.stringify(data));
}

const addParametroButton = document.getElementById('addParametro');
addParametroButton.addEventListener('click', validarParametro);




async function validarParametro() {
    const RangoSuperior = document.getElementById('RangoSuperior').value;
    const RangoInferior = document.getElementById('RangoInferior').value;
    const SelectTipoParametro = document.getElementById('SelectTipoParametro').value;

    if (RangoSuperior === '' || RangoInferior === '' || SelectTipoParametro === '') {
        window.alert('Todos los campos son obligatorios');
        return;
    } else if (RangoSuperior < RangoInferior) {
        window.alert('El rango superior no puede ser menor al rango inferior');
        return;
    } else if (parametro.find(parametro => parametro.RangoSuperior === RangoSuperior && parametro.RangoInferior === RangoInferior)) {
        window.alert('El parametro ya existe');
        return;
    }

    addParametro();
}

getTpParametro();
getParametro();