


import { API_URL } from '../config.js';



const modal = document.getElementById('modal');
const modal1 = document.getElementById('modal1');

const btnClose = document.getElementById('close');
const btnConfirmar = document.getElementById('confirmar');
const btnContraseña = document.getElementById('contraseñaRees');

const btnConfirm = document.getElementById('confirm');


const Cedula = document.getElementById('Cedula');

history.pushState(null, "", location.href);
window.addEventListener("popstate", function (e) {
    history.pushState(null, "", location.href);
});

function getUser() {
    const UserName = document.getElementById('UserName');
    const Password = document.getElementById('userPassword');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}/usuarios`);

    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.response);

            for (let i = 0; i < data.length; i++) {
                const user = data[i];

                if (UserName.value === '' || Password.value === '') {
                    Swal.fire({
                        title: 'Error',
                        text: 'Por favor digitar campos vacios',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                }

                if (user.Cedula === UserName.value && user.Password === Password.value && user.Estado === true && user.Permisos === 'Admin') {

                    var userData = {

                        Cedula: user.Cedula,


                    };
                    sessionStorage.setItem('userData', JSON.stringify(userData));

                    window.location.href = '/vistas/home/home.html';

                    return;
                }
            }


            modal.classList.toggle('translate');


        } else {
            console.error('Error obtener users:', this.statusText);
        }
    };

    xhr.send();
}

const loginButton = document.getElementById("btn-info");
loginButton.addEventListener('click', getUser);

btnConfirm.addEventListener('click', function () {
    modal.classList.toggle('translate');
});


btnContraseña.addEventListener('click', function () {
    modal1.classList.toggle('translate');
});


btnClose.addEventListener('click', function () {
    modal1.classList.toggle('translate');
});
btnConfirmar.addEventListener('click', function () {

    sendEmail();

});


async function sendEmail() {
    const id = document.getElementById('Cedula').value;



    const data = {
        id: id,
    };
    console.log('data', data);
    if (id === '') {
        Swal.fire({
            title: 'Error',
            text: 'por favor ingrese la cedula',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return false;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('post', `${API_URL}/enviarcorreo`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {

            modal1.classList.toggle('translate');

            Swal.fire({
                title: 'correo enviado',
                text: 'Por favor revisar el correo electronico registrado en la base de datos',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } else {
            console.error('Error obtener users:', this.statusText);
        }
    };

    xhr.send(JSON.stringify(data));
}
