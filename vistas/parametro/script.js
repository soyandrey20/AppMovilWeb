
const API_URL = 'http://192.168.56.1:3000';


 




async function getTpParametro() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/Tipo_parametro`);

    const SelectTipoParametro = document.getElementById('SelectTipoParametro');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                const sensor = data[i];
                const option = document.createElement('option');
                option.value = sensor.Id_tipo_sensor;
                option.innerText = sensor.Descripcion;
                SelectTipoParametro.appendChild(option);

            }
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };

    xhr.send();
}

getTpParametro();

async function addParametro() {

    const idTipoSensor = document.getElementById('SelectTipoParametro').value;
    const RangoSuperior = document.getElementById('RangoSuperior').value;
    const RangoInferior = document.getElementById('RangoInferior').value;


    const data = {
        id_Tp_Parametro: idTipoSensor,
        Rango_Superior: RangoSuperior,
        Rango_inferior: RangoInferior
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}/parametro`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 201) {
            alert('Parametro agregado correctamente');
            window.location.href = 'parametro.html';
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };

    xhr.send(JSON.stringify(data));
}

const addParametroButton = document.getElementById('addParametro');
addParametroButton.addEventListener('click', addParametro);