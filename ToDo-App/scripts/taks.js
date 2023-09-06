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
          // console.log("Promesa cumplida💍");
            if (data) {
                // localStorage.setItem("user", JSON.stringify(data))
                // alert(`Bienvenido ${data.firstName} ${data.lastName}`)
                usernameElement.textContent = data.firstName + " " + data.lastName
            }
        })
        .catch(error => {
            console.warn("Promesa Rechazada");
            console.log(error.message)
            if (error.message == 404) {
                alert("El usuario no existe")
            } else {
                console.warn("Error del servidor")
                alert("Error del servidor")
            }
        })
  };
  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  async function consultarTareas() {
    const settings_get = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': `${jwt}`,
        'Content-Type': 'application/json',
      }
    }
    try {
      const response = await fetch(`${url}/tasks`, settings_get)
      if (!response.ok){ //Ojo CAMBIARRRR
        throw new Error(`${response.status}`)
      }
      const data = await response.json()
      listado.length = 0
      data.forEach(task => {
        listado.push(task);
      });
      renderizarTareas(listado)
      const cantidadFinalizadasSpan = document.getElementById('cantidad-finalizadas');
      const tareasCompletadas = listado.filter(tarea => tarea.completed === true);
      cantidadFinalizadasSpan.textContent = tareasCompletadas.length;
    } catch(error) {
        console.warn("Promesa Rechazada");
        console.log(error.message)
        if (error.message == 401) {
            alert("Requiere Autorización")
        } else {
            console.warn("Error del servidor")
            alert("Error del servidor")
        }
    }
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
    // console.log(payload);
    const settings_post = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        // 'Accept': 'application/json',
        'Authorization': `${jwt}`,
        'Content-Type': 'application/json',
      }
    }
    // console.log(settings_post);
    fetch(`${url}/tasks`, settings_post)
    .then(function (response) {
      // console.log(response);
        if (!response.ok){
            throw new Error(`${response.status}`)
        }return response.json()
    })
    .then(data => {
        // console.log(data);
        alert('Tarea agregada correctamente')
        formCrearTarea.reset()
        consultarTareas()
            // Seteamos el dato jwt del local storage (token de autenticación para consultar los datos del usuario)
            // location.replace("./mis-index.htmls")
        
    })
    .catch(error => {
        console.warn("Promesa Rechazada");
        console.log(error.message)
        if (error.message == 400) {
            alert("Alguno de los datos requeridos está incompleto")
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
    // console.log(listado);
    const filaDeTareasIncompletas = document.querySelector(".tareas-pendientes");
    const filaDeTareasCompletadas = document.querySelector(".tareas-terminadas");
    filaDeTareasIncompletas.innerHTML = "";
    filaDeTareasCompletadas.innerHTML = "";
    listado.forEach((tarea) => {      
      const li = document.createElement("li");
      li.setAttribute("class", "tarea");
      li.setAttribute("id", `${tarea.id}`);
      const div = document.createElement("div");
      div.setAttribute("class", "descripcion");
      const div2 = document.createElement("div");
      div2.setAttribute("class", "nombre");
      div2.textContent = tarea.description
      // Hacer que el texto sea editable al hacer clic en él
      div2.setAttribute("contentEditable", "true");

      // Agregar un evento para guardar los cambios cuando se presiona Enter o se pierde el enfoque
      div2.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          tarea.description = div2.textContent.trim();
          div2.blur(); // Pierde el enfoque para guardar los cambios
        }
      });

      div2.addEventListener("blur", function () {
        tarea.description = div2.textContent.trim();
      });
      const div3 = document.createElement("div");
      div3.setAttribute("class", "timestamp");
      const fechaOriginal = tarea.createdAt
      const fecha = new Date(fechaOriginal)
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1; 
      const anio = fecha.getFullYear();
      const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}-${mes < 10 ? '0' : ''}${mes}-${anio}`;
      div3.textContent = "Fecha de creación: "+ fechaFormateada
      const button = document.createElement("button");
      button.setAttribute("type", "submit");
      button.onclick = botonesCambioEstado
      const i = document.createElement("i")
      i.setAttribute("class","fa fa-check")
      li.appendChild(div);
      div.appendChild(div2);
      div.appendChild(div3);
      li.appendChild(button)
      button.appendChild(i);
      if (tarea.completed == false){
      filaDeTareasIncompletas.appendChild(li)
      } else {
        i.setAttribute('class','fa fa-close')
        button.onclick = botonBorrarTarea
        filaDeTareasCompletadas.appendChild(li)
        div3.textContent = "Fecha de modificación: "+ fechaFormateada
      }
    })
  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  async function botonesCambioEstado(event) {
    const taskId = event.target.closest('.tarea').id;
    const descripcionText = event.target.closest('.tarea').querySelector('.nombre').textContent;
    const payload_put = {
      description: descripcionText,
      completed: true
    }
    try {
      const settings_put = {
        method: "PUT",
        body: JSON.stringify(payload_put),
        headers: {
          // 'Accept': 'application/json',
          'Authorization': `${jwt}`,
          'Content-Type': 'application/json',
        }
      }
    response = await fetch(`${url}/tasks/${taskId}`, settings_put)
      
    if (!response.ok){
      throw new Error(`${response.status}`)
    }
    alert('Tarea actualizada correctamente')
    await consultarTareas()
        
    
    } catch(error) {
      console.warn("Ups Algo pasó");
      console.log(error.message)
      if (error.message == 400) {
          alert("ID Inválido")
      } else if(error.message == 401){
          alert("Requiere Autorización")
      } else if(error.message == 404){
          alert("Tarea Inexistente")
      }else {
          console.warn("Error del servidor")
          alert("Error del servidor")
      }
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  async function botonBorrarTarea(event) {
    const taskId = event.target.closest('.tarea').id;
    const payload_del = {
      id: parseInt(taskId),
      }
    
      try {
      const settings_delete = {
        method: "DELETE",
        body: JSON.stringify(payload_del),
        headers: {
          // 'Accept': 'application/json',
          'Authorization': `${jwt}`,
          'Content-Type': 'application/json',
        }
      }
      const response = await fetch(`${url}/tasks/${taskId}`, settings_delete)
      if (!response.ok) {
        throw new Error(`${response.status}`)
      }
      
      const data = await response.json()
      
      alert('Tarea eliminada correctamente');
      await consultarTareas();

    } catch (error) {
      console.warn("Ups Algo pasó");
      console.log(error.message)
      if (error.message == 400) {
        alert("ID Inválido")
      } else if(error.message == 401){
        alert("Requiere Autorización")
      } else if(error.message == 404){
        alert("Tarea Inexistente")
      }else {
        console.warn("Error del servidor")
        alert("Error del servidor")
      }
    }
  }
})
