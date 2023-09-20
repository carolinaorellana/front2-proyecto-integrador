/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    //regular expresion: solo letras, sin números, más de 2 cifras y menos de 10.
    const regex = /^[a-zA-Z]{3,9}$/; 
    let validacion = false;

    if (regex.test(texto)) {
        console.log("El texto es válido.");
        validacion = true;
    } else {
    console.log("El texto no es válido.");
    }
    return validacion
}

function normalizarTexto(texto) {
    texto = texto.replace(/\s+/g, '');                      // Elimina espacios en blanco.
    texto = texto.toLowerCase();                            // Pasa todo a munisculas.
    texto = texto.charAt(0).toUpperCase() + texto.slice(1); // La primera cifra a mayusculas.
    return texto
}

/* ---------------------------------- email --------------------------------- */
/* EXPLICACION DE LA EXPRESION REGULAR
        ^               : Coincide con el inicio de la cadena.
    [a-zA-Z0-9._%+-]+   : Coincide con el nombre de usuario del correo electrónico. Puede contener letras, números, y algunos 
                          caracteres especiales como punto (.), guiones bajos (_), porcentaje (%), más (+), y guiones (-).
        @               : Coincide con el símbolo "@" que separa el nombre de usuario del dominio.
    [a-zA-Z0-9.-]+      : Coincide con el dominio del correo electrónico. Puede contener letras, números, punto (.) y guiones (-).
        \.              : Escapa el punto para que coincida literalmente con el punto que separa el dominio de la extensión.
    [a-zA-Z]{2,}        : Coincide con la extensión del correo electrónico, que debe tener al menos dos letras.
        $               : Coincide con el final de la cadena.
*/
function validarEmail(email) {
    const regex         = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let   validacion    = false;

    if (regex.test(email)) {
        console.log("El correo electrónico es válido.");
        validacion = true;
    } else {
        console.log("El correo electrónico no es válido.");
    }
    return validacion
}

function normalizarEmail(email) {
    email = email.toLowerCase();
    return email
}

/* -------------------------------- password -------------------------------- */
/* EXPLICACION DE LA EXPRESION REGULAR
        ^                   : Coincide con el inicio de la cadena.
    (?=.*[a-z])             : Debe contener al menos una letra minúscula.
    (?=.*[A-Z])             : Debe contener al menos una letra mayúscula.
    (?=.*\d)                : Debe contener al menos un dígito.
    (?=.*[@$!%*?&])         : Debe contener al menos un carácter especial entre los especificados
                              (puedes modificar esta lista según tus necesidades).
    [A-Za-z\d@$!%*?&]{6,}   : Debe tener al menos 6 caracteres y solo puede contener letras (mayúsculas y minúsculas),
                              dígitos y los caracteres especiales mencionados.
        $                   : Coincide con el final de la cadena.
*/
function validarContrasenia(contrasenia) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    let validacion = false;

    if (regex.test(contrasenia)) {
        console.log("Contraseña válida.");
        validacion = true;
    } else {
        console.log("Contraseña no válida.");
    }
    return validacion
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    // la igualdad de contraseñas es 'false' por defecto
    let validacion = false;
    if (contrasenia_1===contrasenia_2){validacion = true};
    return validacion
}