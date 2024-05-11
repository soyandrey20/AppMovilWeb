
const API_URL = 'http://192.168.56.1:3000';

const ciudad = [];





async function getDepart() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Departamento`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const SelectDepartamento = document.getElementById('SelectTipoDepartamento');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const departamentos = JSON.parse(this.responseText);

            for (let i = 0; i < departamentos.length; i++) {
                const departamento = departamentos[i];
                const option = document.createElement('option');
                option.value = departamento.id;
                option.innerText = departamento.nombre;
                SelectDepartamento.appendChild(option);
            }

        } else {
            console.error('Error get Departamentos:', this.status);
        }
    };

    xhr.send();

}


async function addCiudad() {

    const idDepartamento = document.getElementById('SelectTipoDepartamento').value;
    const nombre = document.getElementById('ciudad').value;
    const estado = true;

    const data = {
        id_departamento: idDepartamento,
        nombre: nombre,
        estado: estado
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}/Ciudad`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 201) {
            Swal.fire({
                title: 'Ciudad creada',
                text: 'La ciudad ha sido creada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            window.location.href = 'ciudad.html';
        } else {
            console.error('Error add Ciudad:', this.status);
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido crear la ciudad',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    xhr.send(JSON.stringify(data));
}

const addParametroButton = document.getElementById('addCiudad');
addParametroButton.addEventListener('click', validarCiudad);

async function validarCiudad() {
    const nombre = document.getElementById('ciudad').value;

    for (let i = 0; i < ciudad.length; i++) {
        if (ciudad[i].nombre === nombre) {
            Swal.fire({
                title: 'Error',
                text: 'La ciudad ya existe',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
    }

    addCiudad();
}


async function getCiudad() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Ciudad`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const ciudades = JSON.parse(this.responseText);
            ciudad.push(...ciudades);

        } else {
            console.error('Error get Ciudad:', this.statusText);
        }
    };

    xhr.send();
}

getDepart();
getCiudad();

const btnSetings = document.getElementById('btnSetings');

btnSetings.addEventListener('click', () => {
    window.location.href = '/vistas/edicion/ciudad/ciudad_crud.html';
});


