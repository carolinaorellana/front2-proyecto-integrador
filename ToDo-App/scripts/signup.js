window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0]

    const nombre            = document.getElementById("inputNombre"          );
    const apellido          = document.getElementById("inputApellido"        );
    const email             = document.getElementById("inputEmail"           );
    const password          = document.getElementById("inputPassword"        );
    const passwordRepetida  = document.getElementById("inputPasswordRepetida");
    const url               = "https://todo-api.ctd.academy/v1";  

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {

        event.preventDefault()

        const payload = {
            firstName        : nombre.value,
            lastName         : apellido.value,
            email            : email.value,
            password         : password.value,
        }

        const settings = {
            method          : "POST",
            body            : JSON.stringify(payload),
            headers         : {'Content-Type': 'application/json'}
        }

        console.log(settings.body)

        realizarRegister(settings)
        // Limpiamos el formulario
        //form.reset()
    
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {

        //console.log(settings);
        console.log("Lanzar la consulta a la API...");

        fetch(`${url}/users`, settings)
            .then(response => {
                return response.json()
            })

            .then(data => {
                console.log(data + 'lelo');
            })

            .catch( function (e){
                console.log(e + 'loco');
            })
    
    };

});