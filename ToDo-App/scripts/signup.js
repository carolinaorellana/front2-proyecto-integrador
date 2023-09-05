window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form =document.forms[0]
    const nombre=form['inputNombre']
    const apellido=form['inputApellido']
    const email=form['inputEmail']
    const password = form['inputPassword']
    const passwordRepeated = form['inputPasswordRepetida']
    const url = "https://todo-api.ctd.academy/v1"
    console.log(form);

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault()  

    const payload = {
        nombre: nombre.value,
        apellido : apellido.value ,
        email: email.value,
        password: password.value
    }

    const settings = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }


    });/* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
      




    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        




    };


});