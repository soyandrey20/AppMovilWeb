
const API_URL = 'http://192.168.1.6:3000';

var userData = JSON.parse(sessionStorage.getItem('userData'));
console.log(userData);


const cedula = document.getElementById('Cedula');
const nombre1 = document.getElementById('nombre1');
const nombre2 = document.getElementById('nombre2');
const LastName_1 = document.getElementById('apellido1');
const LastName_2 = document.getElementById('apellido2');
const email = document.getElementById('email');
const Permisos = document.getElementById('Permisos');

async function getUsuario() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/persona`);
    console.log(`${API_URL}/persona`);
    xhr.onload = function () {



        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);
            for (let i = 0; i < data.length; i++) {
                const user = data[i];

                if (user.Cedula === userData.cedula) {
                    cedula.value = user.cedula;
                    nombre1.value = user.Nombre_1;
                    nombre2.value = user.Nombre_2;
                    LastName_1.value = user.LastName_1;
                    LastName_2.value = user.LastName_2;
                    email.value = user.email;
                    Permisos.value = 'Administrador';


                    if (user.estado === 1) {
                        document.getElementById('Estado').value = 'Activo';
                    } else {
                        document.getElementById('Estado').value = 'Inactivo';
                    }

                    return;
                }
            }
        } else {
            console.error('Error fetching users:', this.statusText);
        }
    };
    xhr.send();
}

getUsuario();

