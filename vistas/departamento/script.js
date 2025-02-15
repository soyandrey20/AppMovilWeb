
import { API_URL } from '../config.js';

const departa = [];
const btnBack = document.getElementById('btnBack');
const addDepartamentoBtn = document.getElementById('addDepartamento');


async function addDepart() {
    var opt = validarDepart();

    if (opt) {



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
            if (this.readyState === 4 && this.status === 200) {
                swal.fire({
                    title: 'Departamento creado',
                    text: 'El departamento ha sido creado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    window.location.href = '/vistas/edicion/departamento/departamento_crud.html';
                });
            } else {
                console.error('Error add Departamento:', this.statusText);
                swal.fire({
                    title: 'Error',
                    text: 'No se ha podido crear el departamento',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        };

        xhr.send(JSON.stringify(data));
    }  
}




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




function validarDepart() {
    const nombre = document.getElementById('Departamento').value;
    var opt = true;

    if (nombre == '') {
        swal.fire({
            title: 'Error',
            text: 'El departamento necesita un nombre',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        opt = false;

    } else {



        for (let i = 0; i < departa.length; i++) {
            const dep = departa[i];

            if (dep.nombre === nombre) {
                opt = false;
                swal.fire({
                    title: 'Error',
                    text: 'El departamento ya existe',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                break;
            }
        }
    }

    return opt;
}



addDepartamentoBtn.addEventListener('click', addDepart);
window.onload = getDepart;

btnBack.addEventListener('click', () => {
    window.location.href = '/vistas/edicion/departamento/departamento_crud.html';
});