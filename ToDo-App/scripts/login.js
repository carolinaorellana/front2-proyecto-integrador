window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales (o de entorno) ---------------------- */
    //const form = document.querySelector("form");
    const form = document.forms[0];
    const email = document.querySelector("#inputEmail");
    const contrasena = document.getElementById("inputPassword");
    const url = "https://todo-api.ctd.academy/v1"

    
    /* -------------------------------------------------------------------------- */
    /*           VALIDACION DE LOS CAMPOS           */
    /* -------------------------------------------------------------------------- */
    // email.addEventListener("blur",(e =>{
    //     console.log(e.target);
    //     const field = e.target;
    //     const fieldValue = field.value;
    //     console.log(fieldValue);

    //     if (fieldValue ==0) {
    //         field.classList.add("invalid")
    //         field.nextElementSibling.classList.add("error")
    //         field.nextElementSibling.textContent=`${field.name} es requerido`
    //     } else {
    //         field.classList.remove("invalid")
    //         field.nextElementSibling.classList.remove("error")
    //         field.nextElementSibling.textContent=""
    //     }
    // }))

    // email.addEventListener("blur", (e) => validarEmail(e))
    
    //VALIDANDO CON EXTERNAS:
    // email.addEventListener("blur", validarEmail)
    // contrasena.addEventListener("blur", validarContrasenia)

    //ESTO ES PARA CUANDO YO SALGO DELIMPUT 
    email.addEventListener("input", validarEmail)
    contrasena.addEventListener("input", validarContrasenia)


    //Si esta vacio
    email.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${email.name}`, e))

    contrasena.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${contrasena.name}`,e))
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        //creamos el cuerpo de la request(peticion al servidor)
        const payload = {
            email: email.value,
            password: contrasena.value
        }

        //veamos el objeto que estamos pasando por aca
        // console.log(payload);

        //configurando lo que necesita el request del fetch
        const settings = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //lanzamos la consulta
        realizarLogin(settings);

        //limpiamos el formulario
        form.reset();
    });

    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
        //console.log(settings);
        console.log("Lanzar consulta a la API...")

        fetch(`${url}/users/login`,settings)
            .then(response => {
                console.log(response);

                //manejar el error
                if(response.ok)return response.json();

                //si llego aca es porque la request no es la correcta (no es necesario este return porque automatico con el catch el error)
                //return Promise.reject(response)
            })

            //EN DATA
            .then (data =>{
                console.log("Promesa cumplida")
                console.log(data)
                if(data.jwt){
                    //guardamos el dato en jwt en el local storage
                    localStorage.setItem("jwt",JSON.stringify(data.jwt))
                    //redireccionamos
                    location.replace("./mis-tareas.html")
                }
            })

            //manejar el error
            .catch(err => {
                console.warn("Promesa rechazada")
                console.log(err);
                console.log(err.status)
                if (err.status == 400) {
                    console.warn("contraseña incorrecta")
                    alert("contraseña incorrecta")
                }else if (err.status == 404){
                    console.warn("El usuario no existe")
                    alert("El usuario no existe")
                }else{
                    console.error("Error del servidor")
                    alert("Error del servidor")
                }
            })
        };
});