// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.



/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const formCrearTarea = document.forms[0]
  const newTask = formCrearTarea['nuevaTarea']
  const btnCerrarSesion = document.getElementById("closeApp")
  const url = "https://todo-api.ctd.academy/v1"
  const userInfoElement  = document.querySelector('.user-info')
  const usernameElement = userInfoElement.querySelector('p')
  const jwt = JSON.parse(localStorage.getItem('jwt'))
  console.log(jwt);
  const listado =[]
  
    
  
  obtenerNombreUsuario()
  consultarTareas()
  renderizarTareas(listado) 
  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    localStorage.clear()
    location.replace("./index.html")
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    const settings = {
      method: "GET",
      headers: {
        'Authorization': `${jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    fetch(`${url}/users/getMe`, settings)
        .then(function (response) {
          // console.log(response);
            if (!response.ok){
                throw new Error(`${response.status}`)
            }return response.json()
        })
        .then(data => {
          console.log("Promesa cumplida💍");
            if (data) {
              
                // Seteamos el dato jwt del local storage (token de autenticación para consultar los datos del usuario)
                // localStorage.setItem("user", JSON.stringify(data))
                // alert(`Bienvenido ${data.firstName} ${data.lastName}`)
                usernameElement.textContent = data.firstName + " " + data.lastName
                // location.replace("./mis-index.htmls")
            }
        })
        .catch(error => {
            console.warn("Promesa Rechazada");
            console.log(error.message)
            if (error.message == 404) {
                alert("El usuario no existe")
                form.reset()
            } else {
                console.warn("Error del servidor")
                alert("Error del servidor")
            }
        })
  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    const settings_get = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': `${jwt}`,
        'Content-Type': 'application/json',
      }
    }
    fetch(`${url}/tasks`, settings_get)
    .then(function (response) {
      // console.log(response);
        if (!response.status == 200){
            throw new Error(`${response.status}`)
        }return response.json()
    })
    .then(data => {
      console.log("Promesa cumplida💍");
      console.log(data);
    })
    .catch(error => {
        console.warn("Promesa Rechazada");
        console.log(error.message)
        if (error.message == 404) {
            alert("El usuario no existe")
            form.reset()
        } else {
            console.warn("Error del servidor")
            alert("Error del servidor")
        }
    })
  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault()
    const payload = {
      description: newTask.value,
      completed: false
    }
    console.log(payload);
    const settings_post = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        // 'Accept': 'application/json',
        'Authorization': `${jwt}`,
        'Content-Type': 'application/json',
      }
    }
    console.log(settings_post);
    fetch(`${url}/tasks`, settings_post)
    .then(function (response) {
      console.log(response);
        if (!response.ok){
            throw new Error(`${response.status}`)
        }return response.json()
    })
    .then(data => {
        console.log(data);

            // Seteamos el dato jwt del local storage (token de autenticación para consultar los datos del usuario)
            // location.replace("./mis-index.htmls")
        
    })
    .catch(error => {
        console.warn("Promesa Rechazada");
        console.log(error.message)
        if (error.message == 400) {
            alert("Alguno de los datos requeridos está incompleto")
            form.reset()
        } else if(error.message == 401){
            alert("Requiere Autorización")
        }else {
            console.warn("Error del servidor")
            alert("Error del servidor")
        }
    })




  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    






  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    
    



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
   
    

    

  };

});