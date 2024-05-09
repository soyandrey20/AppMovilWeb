
const API_URL = 'http://192.168.56.1:3000';




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





const optusuario = document.getElementById('optusuario');
const optParaSensor = document.getElementById('optParaSen');
const optPara = document.getElementById('optPara');
const optTpPara = document.getElementById('optTpPara');
const optSensor = document.getElementById('optSensor');
const optTpSensor = document.getElementById('optTpSensor');
const logout = document.getElementById('logout');

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


const optusuarioE = document.getElementById('optusuarioE');
const optParaSensorE = document.getElementById('optParaSenE');
const optParaE = document.getElementById('optParaE');
const optTpParaE = document.getElementById('optTpParaE');
const optSensorE = document.getElementById('optSensorE');
const optTpSensorE = document.getElementById('optTpSensorE');




// optusuarioE.addEventListener('click', () => {
//     window.location.href = `/vistas/usuarios/usuarios.html`;
// });

optParaSensorE.addEventListener('click', () => {
    window.location.href = `/vistas/edicion/parametro_sensor_crud.html`;
});

optParaE.addEventListener('click', () => {
    window.location.href = `/vistas/parametro/parametro.html`;
});

optTpParaE.addEventListener('click', () => {
    window.location.href = `/vistas/parametro/tipo_parametro.html`;
});

optSensorE.addEventListener('click', () => {
    window.location.href = `/vistas/sensor/sensor.html`;
});

optTpSensorE.addEventListener('click', () => {
    window.location.href = `/vistas/sensor/tipo_sensor.html`;
});

