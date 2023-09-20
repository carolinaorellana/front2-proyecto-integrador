window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form      = document.forms[0]
    const email     = document.getElementById("inputEmail");
    const password  = document.getElementById("inputPassword");
    const url       = "https://todo-api.ctd.academy/v1";
    
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault()
        //Creamos el cuerpo de la request (petición al servidor)
        const payload = {
            email    : email.value,
            password : password.value
        }
        // vemos el objeto que recibimos del formulario
        //console.log(payload);

        //configuramos la request del Fetch
        const settings = {
            method  : "POST",
            body    :  JSON.stringify(payload),
            headers :  {'Content-Type': 'application/json'}
        }

        // Lanzamos la consulta del login a la API
        realizarLogin(settings)
        // Limpiamos el formulario
        //form.reset()

    });

    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */

    async function realizarLogin(settings) {
        console.log("Lanzar la consulta a la API...");

        fetch(`${url}/users/login`, settings)
            .then(response => {
                if (!response.ok){
                    throw new Error('No hay Respuesta de la API').status = response.status;
                }
                return response.json();
            })

            .then(data => {
                console.log("Promesa cumplida poh!!!");

                const tokenVacio = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImlkIjoxNCwiaWF0I"; // token de login vacio
                if (data.jwt.startsWith(tokenVacio)) { // Corroboro si el token comienza con "tokenVacio"
                    alert('No ha ingresado Datos aun');
                };
       
                if (Object.prototype.toString.call(data) === "[object Object]") { // Match de Usuario :D
                    alert('Match de Usuario');
                    console.log(data.jwt);
                };
            })

            .catch(error =>{
                console.warn("Promesa rechazada poh!!!");
                switch (error){
                    case 400:
                        console.log('Contraseña incorrecta');
                        break;
                    case 404:
                        console.log('El Usuario no Existe');
                        break;
                    case 500:
                        console.log('Error del Servidor');
                        break;
                    default:
                        console.log('Error tipo: ' + error);
                }
            })

    };
    
});




                //const errores = ['Contraseña incorrecta','El usuario no existe','Error del servidor']; // tipo de error
                //if(errores.includes(data)){
                //    alert(data);
                //};