import { API_URL } from '../../config.js'


const idex = document.getElementById('id');
const descripcionn = document.getElementById('descripcion');
const estadoo = document.getElementById('Estado');

const id = localStorage.getItem('id');
const descripcion = localStorage.getItem('descripcion');
const estado = localStorage.getItem('estado');

const back = document.getElementById('back');

const btnActualizar = document.getElementById('btnActualizar');

back.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/tipo_personas/tp_personas_crud.html`;
});

function cargarDatos() {
    idex.value = id;
    descripcionn.value = descripcion;
    estadoo.value = estado;
}

cargarDatos();


async function updateData() {
    const id = idex.value;
    const descripcion = descripcionn.value;
    const estado = estadoo.value;

    const data = {
        id,
        descripcion,
        estado
    };
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', `${API_URL}/Tipo_persona/${id}`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            swal.fire({
                title: 'Tipo de persona actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.href = `/vistas/edicion/tipo_personas/tp_personas_crud.html`;
            });
        } else {
            swal.fire({
                title: 'No se ha podido actualizar el tipo de persona',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };
    xhr.send(JSON.stringify(data));

}

btnActualizar.addEventListener('click', updateData);