/*Verificar que el campo este vacio */
const setErrors = (message, field, isError = true) => {
    console.log(field);
    if (isError) {
        field.classList.add("invalid");
        field.nextElementSibling.classList.add("error");
        field.nextElementSibling.textContent = message;
    } else {
        field.classList.remove("invalid");
        field.nextElementSibling.classList.remove("error");
        field.nextElementSibling.textContent = "";
    }
};

const isEmpty = (message, e) => {
    const field = e.target;
    const fieldValue = normalizarEmail(field.value);

    if (fieldValue.length == 0) {
        setErrors(message, field);
    }
};

/* ---------------------------------- texto --------------------------------- */
function validarTexto(e) {
    const field = e.target;
    const fieldValue = normalizarTexto(field.value);
    const regex = new RegExp(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ'° ]+$/);

    if (
        (fieldValue.length < 3 && !regex.test(fieldValue)) ||
        (fieldValue.length < 3 && !regex.test(fieldValue)) ||
        !regex.test(fieldValue)
    ) {
        setErrors(
            `Por favor ingrese un ${field.name} de al menos 3 caracteres validos`,
            field
        );
    } else {
        setErrors("", field, false);
    }
}

function normalizarTexto(texto) {
    return texto.trim();
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(e) {
    // console.log(e.target);
    const field = e.target;
    const fieldValue = normalizarEmail(field.value);
    // console.log(fieldValue);

    //Expresion regular para comprobar el correo
    const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    if (fieldValue.length > 4 && !regex.test(fieldValue)) {
        setErrors(`Por favor ingrese un ${field.name} valido`, field);
    } else {
        setErrors("", field, false);
    }
}

function normalizarEmail(email) {
    return email.trim().toLowerCase();
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(e) {
    // console.log(e.target);
    const field = e.target;
    const fieldValue = normalizarTexto(field.value);

    if (fieldValue.length < 6) {
        setErrors(`Por favor ingrese una ${field.name} valida`, field);
    } else {
        setErrors("", field, false);
    }
}

function compararContrasenias(contrasenia_1, contrasenia_2, e) {
    const field = e.target;
    const contrasena_1 = normalizarTexto(contrasenia_1.value);
    const contrasena_2 = normalizarTexto(contrasenia_2.value);
    if (contrasena_1 !== contrasena_2) {
        setErrors(`Por favor ingrese una ${field.name} acorde a la primera`, field);
    } else {
        setErrors("", field, false);
    }
}
