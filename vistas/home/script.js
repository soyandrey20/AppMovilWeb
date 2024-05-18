
 




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

async function cargarPagina(){
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
    window.location.href = `/vistas/personas/tipo_persona.html`;
});


optusuario.addEventListener('click', () => {
    window.location.href = `/vistas/usuarios/usuarios.html`;
});

optParaSensor.addEventListener('click', () => {
    window.location.href = `/vistas/para_sensor/para_sensor.html`;
});

optPara.addEventListener('click', () => {
    window.location.href = `/vistas/parametro/parametro.html`;
});

optTpPara.addEventListener('click', () => {
    window.location.href = `/vistas/parametro/tipo_parametro.html`;
});

optSensor.addEventListener('click', () => {
    window.location.href = `/vistas/sensor/sensor.html`;
});

optTpSensor.addEventListener('click', () => {
    window.location.href = `/vistas/sensor/tipo_sensor.html`;
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
    window.location.href = `/vistas/departamento/departamento.html`;
});

optCiudad.addEventListener('click', () => {
    window.location.href = `/vistas/ciudad/ciudad.html`;
});

optVereda.addEventListener('click', () => {
    window.location.href = `/vistas/vereda/vereda.html`;
});

optFinca.addEventListener('click', () => {
    window.location.href = `/vistas/finca/finca.html`;
});


