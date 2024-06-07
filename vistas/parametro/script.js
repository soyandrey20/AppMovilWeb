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

    const valid = validarParametro();
    if (valid) {

        const idTipoSensor = document.getElementById('SelectTipoParametro').value;
        const RangoSuperior = document.getElementById('RangoSuperior').value;
        const RangoInferior = document.getElementById('RangoInferior').value;

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
                swal.fire({
                    title: 'Parametro creado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = '/vistas/edicion/parametro/parametro_crud.html';

                });
            } else {
                swal.fire({
                    title: 'Error al crear el parametro',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        };

        xhr.send(JSON.stringify(data));
    }
}

const addParametroButton = document.getElementById('addParametro');
addParametroButton.addEventListener('click', addParametro);




function validarParametro() {
    const val = true;
    const RangoSuperior = document.getElementById('RangoSuperior').value;
    const RangoInferior = document.getElementById('RangoInferior').value;
    const SelectTipoParametro = document.getElementById('SelectTipoParametro').value;

    if (RangoSuperior === '' || RangoInferior === '' || SelectTipoParametro === '') {
        swal.fire({
            title: 'Todos los campos son obligatorios',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: false,
            timer: 1500
        });
        val = false;
    } else if (RangoSuperior < RangoInferior) {
        swal.fire({
            title: 'El rango superior no puede ser menor al rango inferior',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: false,
            timer: 1500
        });
        val = false;
    } else if (parametro.find(parametro => parametro.RangoSuperior === RangoSuperior && parametro.RangoInferior === RangoInferior)) {
        swal.fire({
            title: 'Ya existe un parametro con estos rangos',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: false,
            timer: 1500
        });
        val = false;
    }

    return val;
}

getTpParametro();
getParametro();