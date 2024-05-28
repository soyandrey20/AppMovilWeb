





let arrow = document.querySelectorAll('.arrow');

for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener('click', (e) => {
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle('showMenu');

    });
}

let sidebar = document.querySelector('.sidebar');

let sidebarBtn = document.querySelector('.bx-menu');

sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('close');
});

window.addEventListener('DOMContentLoaded', cargarPagina);

async function cargarPagina() {
    sidebar.classList.toggle('close');
}

const optusuario = document.getElementById('optusuario');
const optParaSensor = document.getElementById('optParaSen');
const optPara = document.getElementById('optPara');
const optTpPara = document.getElementById('optTpPara');
const optSensor = document.getElementById('optSensor');
const optTpSensor = document.getElementById('optTpSensor');
const optTpPersona = document.getElementById('optTpPersona');
const logout = document.getElementById('logout');
const ver = document.getElementById('ver');

optTpPersona.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/tipo_personas/tp_personas_crud.html`;
});


optusuario.addEventListener('click', () => {
    window.location.href = `/vistas/usuarios/usuarios.html`;
});

optParaSensor.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/para_sensor/parametro_sensor_crud.html`;
});

optPara.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/parametro/parametro_crud.html`;
});

optTpPara.addEventListener('click', () => {
   window.location.href = `/vistas/edicion/tp_parametro/tp_parametro_crud.html`;
});

optSensor.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/sensor/sensor_crud.html`;
});

optTpSensor.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/tp_sensor/tp_sensor_crud.html`;
});

logout.addEventListener('click', () => {
    window.location.href = `/vistas/login/login.html`;
});

ver.addEventListener('click', () => {
    window.location.href = `/vistas/informacion/usuario.html`;
});


const optDepartamento = document.getElementById('optDepartamento');
const optCiudad = document.getElementById('optCiudad');
const optVereda = document.getElementById('optVereda');
const optFinca = document.getElementById('optFinca');


optDepartamento.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/departamento/departamento_crud.html`;
});

optCiudad.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/ciudad/ciudad_crud.html`;
});

optVereda.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/vereda/vereda_crud.html`;
});

optFinca.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/finca/finca_crud.html`;
});


