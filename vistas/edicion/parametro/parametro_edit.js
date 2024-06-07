import { API_URL } from "../../config.js";

const idX = document.getElementById('id');
const id_tp_parametroo = document.getElementById('SelectTipoParametro');
const rango_inferiorr = document.getElementById('RangoInferior');
const rango_superiorr = document.getElementById('RangoSuperior');
const estadoo = document.getElementById('Estado')

const btnActualizar = document.getElementById('btnActualizar');
const back = document.getElementById('back');


const id = localStorage.getItem('id');
const id_tp_parametror = localStorage.getItem('id_Tp_Parametro');
const Rango_inferior = localStorage.getItem('Rango_inferior');
const Rango_Superior = localStorage.getItem('Rango_Superior');
const estado = localStorage.getItem('estado');

back.addEventListener('click', () => {
    window.location.href = '../parametro/parametro_crud.html';
});


function cargarDatos() {
    idX.value = id,
        id_tp_parametroo.value = id_tp_parametror,
        rango_inferiorr.value = Rango_inferior,
        rango_superiorr.value = Rango_Superior,
        estadoo.value = estado
}

window.onload = cargarDatos;


async function getTpparametro() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Tipo_parametro`);

    const SelectTipoparametro = document.getElementById('SelectTipoParametro');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);

            for (let i = 0; i < data.length; i++) {
                const parametro = data[i];
                const option = document.createElement('option');
                option.value = parametro.Id;
                option.innerText = parametro.Descripcion;
                SelectTipoparametro.appendChild(option);

            }
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };

    xhr.send();
}

getTpparametro();



async function updateData() {



    const id = idX.value;
    const id_Tp_Parametro = id_tp_parametroo.value == 0 ? id_tp_parametror : id_tp_parametroo.value;
    const Rango_inferior = rango_inferiorr.value;
    const Rango_Superior = rango_superiorr.value;
    const estado = estadoo.value;
    const data = {
        id,
        id_Tp_Parametro,
        Rango_inferior,
        Rango_Superior,
        estado
    };
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/parametro/${id}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            swal.fire({
                title: 'Parametro actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '../parametro/parametro_crud.html';
            });

        } else {
            swal.fire({
                title: 'Error al actualizar el parametro',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    xhr.send(JSON.stringify(data));

}

btnActualizar.addEventListener('click', updateData);


