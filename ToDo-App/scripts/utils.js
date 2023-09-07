/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    let result = false;
    let regExp = new RegExp("^[a-zA-Zá-úÁ-Ú\s']*$")
    if (regExp.test(texto) && texto.length >= 2){
        result = true;
    }
    return result;
}

function normalizarTexto(texto) {
    let newText = texto.toLowerCase()
    return newText
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    let result = false;
    let regExp = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}")
    if (regExp.test(email)) {
        result = true
    }
    return result
}

function normalizarEmail(email) {
    let newEmail = email.toLowerCase()
    return newEmail
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    let result=false
    
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/
    if (regex.test(contrasenia)) {
        result = true;
    }
    return result;
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    let result = false;

    if (contrasenia_1 == contrasenia_2){
        result = true;
    }
    return result;
}

