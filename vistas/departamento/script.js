
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
                window.alert('Departamento creado correctamente');
                window.location.href = '/vistas/edicion/departamento/departamento_crud.html';
            } else {
                window.alert('Error al crear el departamento');
            }
        };

        xhr.send(JSON.stringify(data));
    } else {
        window.alert('El departamento ya existe');
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




async function validarDepart() {
    const nombre = document.getElementById('Departamento').value;
    var opt = false;
    for (let i = 0; i < departa.length; i++) {
        const dep = departa[i];

        if (dep.nombre === nombre) {
            opt = false;
            break;
        } else {
            opt = true;
            break;
        }
    }
    return opt;
}



addDepartamentoBtn.addEventListener('click', addDepart);
window.onload = getDepart;

btnBack.addEventListener('click', () => {
    window.location.href = '/vistas/edicion/departamento/departamento_crud.html';
});