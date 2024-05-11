
const API_URL = 'http://192.168.56.1:3000';

const parametro = [];


async function getParametro() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/parametro`);

    const SelectParametro = document.getElementById('SelectParametro');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                const parametro = data[i];
                const option = document.createElement('option');
                option.value = parametro.Id;
                option.innerText = parametro.Id;
                SelectParametro.appendChild(option);

            }
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
        if (this.readyState === 4 && this.status === 201) {
            Swal.fire({
                title: 'Parametro creado',
                text: 'El parametro ha sido creado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            window.location.href = window.location.href;
        } else {
            console.error('Error fetching users:', this.statusText);
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido crear el parametro',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    xhr.send(JSON.stringify(data));
}

const addParametroButton = document.getElementById('addParametro');
addParametroButton.addEventListener('click', validarParametro);


const btnSetings = document.getElementById('btnSetings');

btnSetings.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/parametro/parametro_crud.html`;
});


async function validarParametro() {
    const RangoSuperior = document.getElementById('RangoSuperior').value;
    const RangoInferior = document.getElementById('RangoInferior').value;
    const SelectTipoParametro = document.getElementById('SelectTipoParametro').value;

    if (RangoSuperior === '' || RangoInferior === '' || SelectTipoParametro === '') {
       Swal.fire({
            title: 'Error',
            text: 'Todos los campos son obligatorios',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    } else if (RangoSuperior < RangoInferior) {
        Swal.fire({
            title: 'Error',
            text: 'El rango inferior no puede ser mayor al rango superior',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    } else if (RangoInferior > RangoSuperior) {
        Swal.fire({
            title: 'Error',
            text: 'El rango superior no puede ser menor al rango inferior',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    } else if (parametro.find(parametro => parametro.RangoSuperior === RangoSuperior && parametro.RangoInferior === RangoInferior)) {
        Swal.fire({
            title: 'Error',
            text: 'El parametro ya existe',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    addParametro();
}

getTpParametro();
getParametro();