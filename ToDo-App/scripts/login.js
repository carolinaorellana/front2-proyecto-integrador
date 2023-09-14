window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0]
    const email = document.getElementById("inputEmail");
    const password = document.getElementById("inputPassword");
    const url = "https://todo-api.ctd.academy/v1";
    
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault()
        //Creamos el cuerpo de la request (petición al servidor)
        const payload = {
            email: email.value,
            password: password.value
        }
        // vemos el objeto que recibimos del formulario
        //console.log(payload);

        //configuramos la request del Fetch
        const settings = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // Lanzamos la consulta del login a la API
        realizarLogin(settings)
        // Limpiamos el formulario
        form.reset()

    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */

    function realizarLogin(settings) {
        //console.log(settings);
        console.log("Lanzar la consulta a la API...");


        fetch(`${url}/users/login`, settings)
            .then(response => {
                //console.log(response); // se imprime la respuesta que es un ...
                return response.json()
            })

            .then(data => {
                const tokenVacio = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImlkIjoxNCwiaWF0I"; // token de login vacio
                
                if (data.jwt.startsWith(tokenVacio)) { // Corroboro si el token comienza con "tokenVacio"
                    alert('No ha ingresado Datos aun');
                } else {
                    switch (Object.prototype.toString.call(data)){ //corrobora el tipo de token (Objeto o string)
                        case "[object String]":
                            switch(data){ // tipo de error
                                case 'Contraseña incorrecta':
                                    alert('Contraseña incorrecta');
                                    break;
                                case 'El usuario no existe':
                                    alert('El usuario no existe');
                                    break;
                                case 'Error del servidor':
                                    alert('Error del servidor');
                                    break;
                            }
                        case "[object Object]": // Match de Usuario :D
                            alert('Match de Usuario');
                            break;    
                    }
                }

/*
                if (data.jwt) {
                    // Guardamos el dato jwt en el local storage (este token de autenticación)
                    localStorage.setItem("jwt", JSON.stringify(data.jwt))

                    // redireccionamos a nuestro dashboard de todo
                    // location.replace("./mis-tareas.html")
                }
*/
            })



            .catch( function (e){
                console.warn("Promesa rechazada ");
                console.log(e);
                /*
                if (err.status == 400) {
                    console.warn("Contraseña incorrecta")
                    alert("Contraseña incorrecta")
                } else if (err.status == 404) {
                    console.warn("El usuario no existe")
                    alert("El usuario no existe")
                } else {
                    console.error("Error del servidor | url no existe")
                    alert("Error del servidor | url no existe")
                }
                */
            })



    };
    

});