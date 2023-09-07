window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form =document.forms[0]
    const firstName=form['inputNombre']
    const lastName=form['inputApellido']
    const email=form['inputEmail']
    const passwordInput = form['inputPassword']
    const passwordRepeated = form['inputPasswordRepetida']
    const url = "https://todo-api.ctd.academy/v1"

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const nombreNormalizado = normalizarTexto(firstName.value)
        if (!validarTexto(nombreNormalizado)) {
            alert('El nombre ingresado no debe incluir nùmeros o símbolos, con una longitud mínima de 2 caracteres. ')
            return
        }
        const apellidoNormalizado = normalizarTexto(lastName.value)
        if (!validarTexto(apellidoNormalizado)) {
            alert('El apellido ingresado no debe incluir nùmeros o símbolos, con una longitud mínima de 2 caracteres. ')
            return
        }

        const emailNormalizado = normalizarEmail(email.value)
        if (!validarEmail(emailNormalizado)){
            alert("Correo electrónico no válido")
            return
        }
        //Validar el correo
        //Validar la contraseña
        password = passwordInput.value
        const contraseniaValida = validarContrasenia(password);
        if (!contraseniaValida) {
            alert('La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y no debe contener espacios en blanco, con una longitud mínima de 4 caracteres.');
            return;
        }
        //Validar que coincidan las contraseñas
        let passwordsMatch = false;  
        while(!passwordsMatch){
            if (compararContrasenias(password,passwordRepeated)){
                passwordsMatch = true
            }else {
                alert('Contraseña no coinciden, intente de nuevo')
                return
            }
        }
    
        const payload = {
            firstName: firstName.value,
            lastName : lastName.value ,
            email: email.value,
            password: password.value
            
        }
        console.log(payload);
        const settings = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        realizarRegister(settings) 
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        
    // console.log(settings);
    // console.log("Lanzar la consulta a la API...");
    fetch(`${url}/users`, settings)
        .then(function (response) {
            if (!response.ok){
                throw new Error(`${response.status}`)
            }return response.json()
        })
        .then(data => {
            console.log(data)
            if (data.jwt) {
                // Guardamos el dato jwt en el local storage (este token de autenticación)
                localStorage.setItem("jwt", JSON.stringify(data.jwt))
                alert("Usuario creado correctamente")
                location.replace("./index.html")
            }
        })
        .catch(error => {
            console.warn("Promesa Rechazada");
            console.log(error.message)
            if (error.message == 400) {
                alert("Usuario ya existe")
                form.reset()
            } else {
                console.warn("Error del servidor")
                alert("Error del servidor")
            }
        })
    };
});