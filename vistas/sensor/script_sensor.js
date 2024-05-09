
const API_URL = 'http://192.168.1.6:3000';


var listaTpSensores = [];
var listaSensores = [];

let arrow = document.querySelectorAll('.arrow');

for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener('click', (e) => {
        let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
        arrowParent.classList.toggle('showMenu');

    });
}

let sidebar = document.querySelector('.sidebar');

let sidebarBtn = document.querySelector('.bx-menu');

sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('close');
});


// Path: home.html
let logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    console.log('logout');
    window.location.href = 'login.html';
});


async function getSensor() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/sensor`);

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            listaSensores = JSON.parse(this.response);
            console.log(listaSensores);
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };
    xhr.send();
}



async function getTpsensor() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Tipo_sensor`);

    const SelectTipoSensor = document.getElementById('SelectTipoSensor');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            listaTpSensores = data;
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                const sensor = data[i];
                const option = document.createElement('option');
                option.value = sensor.Id;
                option.innerText = sensor.Descripcion;
                SelectTipoSensor.appendChild(option);

            }
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };

    xhr.send();
}

getTpsensor();
getSensor();

async function addSensor() {
    const descriptionSensor = document.getElementById('descriptionSensor');
    const idSelectTipoSensor = document.getElementById('SelectTipoSensor');
    console.log(idSelectTipoSensor.value);
    if (descriptionSensor.value === '') {
        alert('Debe ingresar una descripción');
        return;
    }
    for (let i = 0; i < listaTpSensores.length; i++) {
        if (listaSensores[i].informacion === descriptionSensor.value) {
            alert('Ya existe un sensor con ese tipo');
            return;
        }

    }

    const xhr = new XMLHttpRequest();

    xhr.open('post', `${API_URL}/sensor`);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        id_tp_sensor: idSelectTipoSensor.value,
        informacion: descriptionSensor.value
    }));
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);
            alert('Sensor agregado correctamente');
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };
}

const btnAddSensor = document.getElementById('addSensor');

btnAddSensor.addEventListener('click', addSensor);