


import { API_URL } from '../config.js';

let Cedula = '';



const userPassword = document.getElementById('userPassword');

const contraseñaRees = document.getElementById('contraseñaRees');

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
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Por favor digitar campos vacios',
                    });


                    return;
                }

                if (user.Cedula === UserName.value && user.Password === Password.value && user.Estado === true && user.Permisos === 'Admin') {

                    var userData = {

                        Cedula: user.Cedula,


                    };


                    sessionStorage.setItem('userData', JSON.stringify(userData));

                    window.location.href = '../home/home.html';



                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Usuario o contraseña incorrectos',
                    });
                }
            }




        } else {
            console.error('Error obtener users:', this.statusText);
        }
    };

    xhr.send();
}

const loginButton = document.getElementById("btn-info");
loginButton.addEventListener('click', getUser);





async function sendEmail() {
    const id = Cedula;



    const data = {
        id: id,
    };
    console.log('data', data);
    if (id === '') {
        window.alert('Por favor ingrese la cedula');

        return false;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('post', `${API_URL}/enviarcorreo`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {

            Swal.fire({
                icon: 'success',
                title: 'Correo enviado',
                text: 'Se ha enviado un correo con la contraseña',
            });

        } else {
            console.error('Error obtener users:', this.statusText);
        }
    };

    xhr.send(JSON.stringify(data));
}

contraseñaRees.addEventListener('click', pedirContraseña)


function pedirContraseña() {
    Swal.fire({
        title: 'Ingrese la cédula del cliente',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off',
            pattern: '[0-9]{10}'
        },
        showCancelButton: true,
        confirmButtonText: 'Reestablecer contraseña',
        cancelButtonText: 'Cancelar',
        preConfirm: (cedula) => {
            if (cedula === '') {
                Swal.showValidationMessage('Por favor ingrese la cédula');

            }
        }

    }).then((result) => {
        if (result.isConfirmed) {
            Cedula = result.value;

            sendEmail();
        }
    });
}