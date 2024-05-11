
const API_URL = 'http://192.168.56.1:3000';

const departa = [];


async function addDepart() {


    const nombre = document.getElementById('Departamento').value;
    const estado = true;



    const data = {
        nombre: nombre,
        estado: estado
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}/Departamento`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 201) {
            Swal.fire({
                title: 'Departamento creado',
                text: 'El Departamento ha sido creado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            window.location.href = window.location.href;
        } else {
            console.error('Error add Departamento:', this.statusText);
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido crear el Departamento',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    xhr.send(JSON.stringify(data));
}
const addDepartamentoBtn = document.getElementById('addDepartamento');
addDepartamentoBtn.addEventListener('click', validarDepart);




async function getDepart() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Departamento`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const departamentos = JSON.parse(this.responseText);
            departa.push(...departamentos);
            console.log(departa);


        } else {
            console.error('Error get Departamentos:', this.statusText);
        }
    };

    xhr.send();
}

getDepart();


async function validarDepart() {
    const nombre = document.getElementById('Departamento').value;

    for (let i = 0; i < departa.length; i++) {
        const dep = departa[i];

        if (dep.nombre === nombre) {
            Swal.fire({
                title: 'Error',
                text: 'El departamento ya existe',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return false;
        }
    }
    addDepart();
}

const btnSetings = document.getElementById('btnSetings');
btnSetings.addEventListener('click', () => {
    window.location.href = '/vistas/edicion/departamento/departamento_crud.html';
}); 