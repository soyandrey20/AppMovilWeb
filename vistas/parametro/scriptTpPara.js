
const API_URL = 'http://192.168.56.1:3000';

 
let sensor = document.getElementById('optsensor');

sensor.addEventListener('click', () => {
    window.location.href = 'sensor.html';
});





async function addParametro() {
    const descriptionParametro = document.getElementById('descriptionSensor');
    const xhr = new XMLHttpRequest();

    xhr.open('post', `${API_URL}/Tipo_parametro`);
    
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        Descripcion: descriptionParametro.value
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

const addSensorButton = document.getElementById('addSensor');
addSensorButton.addEventListener('click', addParametro);

