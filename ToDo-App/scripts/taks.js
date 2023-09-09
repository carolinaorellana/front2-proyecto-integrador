// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener("load", function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  const formCrearTarea = document.forms[0];
  const newTask = formCrearTarea["nuevaTarea"];
  const btnCerrarSesion = document.getElementById("closeApp");
  const url = "https://todo-api.ctd.academy/v1";
  const urlTareas = `${url}/tasks`;
  const urlUsuario = `${url}/users/getMe`;
  const userInfoElement = document.querySelector(".user-info");
  const usernameElement = userInfoElement.querySelector("p");
  const token = JSON.parse(localStorage.getItem("jwt"));
  // console.log(token);

  obtenerNombreUsuario();
  consultarTareas();
  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener("click", function () {
    const cerrarSesion = confirm("Estás seguro de que deseas cerrar la sesión");
    console.warn(cerrarSesion);

    if (cerrarSesion) {
      localStorage.removeItem("jwt");
      location.replace("./index.html");
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  async function obtenerNombreUsuario() {
    try {
      const settings = {
        method: "GET",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(urlUsuario, settings);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();
      if (data) {
        usernameElement.textContent = data.firstName + " " + data.lastName;
      }
    } catch (error) {
      console.warn("Promesa Rechazada");
      // console.log(error.message);
      if (error.message == 404) {
        alert("El usuario no existe");
      } else {
        console.warn("Error del servidor");
        alert("Error del servidor");
      }
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  async function consultarTareas() {
    const settings_get = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(urlTareas, settings_get);
      if (!response.ok) {
        //Ojo CAMBIARRRR
        throw new Error(`${response.status}`);
      }
      const tareas = await response.json();
      renderizarTareas(tareas) 
      botonesCambioEstado()
      botonBorrarTarea()
      
    } catch (error) {
      console.warn("Promesa Rechazada");
      // console.log(error.message);
      if (error.message == 401) {
        alert("Requiere Autorización");
      } else {
        console.log(error.message);
        console.warn("Error del servidor");
        alert("Error del servidor");
      }
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */
  formCrearTarea.addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const confirmacion = confirm(`¿Deseas crear la tarea: "${newTask.value}"?`);
    if (!confirmacion) {
      return; // Si el usuario cancela, no hacemos nada
    }
    const payload = {
      description: newTask.value.trim(),
    };

    const settings_post = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        // 'Accept': 'application/json',
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(urlTareas, settings_post);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      alert("Tarea agregada correctamente");
      consultarTareas();
    } catch (error) {
      console.warn("Promesa Rechazada");
      // console.log(error.message);
      if (error.message == 400) {
        alert("Alguno de los datos requeridos está incompleto");
      } else if (error.message == 401) {
        alert("Requiere Autorización");
      } else {
        console.warn("Error del servidor");
        alert("Error del servidor");
      }
    }
    formCrearTarea.reset();
  });

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(tareas) {
    const filaDeTareasIncompletas = document.querySelector(".tareas-pendientes");
    const filaDeTareasCompletadas = document.querySelector(".tareas-terminadas");
    filaDeTareasIncompletas.innerHTML = "";
    filaDeTareasCompletadas.innerHTML = "";
    
    const numeroFinalizadas = document.querySelector("#cantidad-finalizadas");
    
    let contador = 0
    tareas.forEach((tarea) => {
      const fecha = new Date(tarea.createdAt);
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const anio = fecha.getFullYear();
      const horas = fecha.getHours();
      const minutos = fecha.getMinutes();
      const ampm = horas >= 12 ? "pm" : "am"; // Determina si es AM o PM
      const horas12 = horas % 12 || 12; // Convierte las horas a un formato de 12 horas
      
      const fechaFormateada = `${dia < 10 ? "0" : ""}${dia}-${
        mes < 10 ? "0" : ""
      }${mes}-${anio} ${horas12}:${minutos} ${ampm}`;
      
      if (tarea.completed) {
        contador++
        
        filaDeTareasCompletadas.innerHTML += `
        <li class="tarea">
        <div class="hecha">
        <i class="fa-regular fa-circle-check"></i>
          </div>
          <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
          <div class="cambios-estados">
          <button class="change incompleta" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
          <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
          </div>
          </div>  
          </li>
          `
        } else {
          filaDeTareasIncompletas.innerHTML += `
          <li class="tarea">
        <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
        <div class="descripcion">
        <p class="nombre">${tarea.description}</p>
        <p class="timestamp">${fechaFormateada}</p>
        </div>
        </li>
        `
      }
      numeroFinalizadas.textContent = contador
  });
}

/* -------------------------------------------------------------------------- */
/*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
/* -------------------------------------------------------------------------- */
async function botonesCambioEstado(event) {
  
  const btnCambioEstado = document.querySelectorAll('.change');
  btnCambioEstado.forEach(boton => {
    //a cada boton le asignamos una funcionalidad
    boton.addEventListener("click", async (e) => {
      console.log("Cambiando estado de tarea...");
        const id = e.target.id
        const urlChangeState = `${urlTareas}/${id}`
        const payload = {}
        const descripcionText = e.target.closest(".tarea").querySelector(".nombre").textContent;
        const confirmacion = confirm(`¿Deseas modificar la tarea: "${descripcionText}"?`);
          if (!confirmacion) {
            return; // Si el usuario cancela, no hacemos nada
          }
        //segun el tipo de boton que fue clickeado, cambiamos el estado de la tarea
        if (e.target.classList.contains("incompleta")) {
          // si está completada, la paso a pendiente
          payload.completed = false
          
        } else {
          // si está incompletada, la paso a completa
          payload.completed = true
        }

        const settingsCambio = {
          method: 'PUT',
          headers: {
            "Authorization": token,
            "Content-type": "application/json"
          },
          body: JSON.stringify(payload)
        }

        try {
          const response = await fetch(urlChangeState, settingsCambio);
          if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status}`);
          }
  
          await consultarTareas(); // Esperar a que la consulta de tareas se complete
        } catch (error) {
          console.warn("Ups Algo pasó");
          console.log(error.message);
          if (error.message == 400) {
            alert("ID Inválido");
          } else if (error.message == 401) {
            alert("Requiere Autorización");
          } else if (error.message == 404) {
            alert("Tarea Inexistente");
          } else {
            console.warn("Error del servidor");
            alert("Error del servidor");
          }
        }
      })
    })

  }
  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  async function botonBorrarTarea(event) {
    const btnDelete = document.querySelectorAll('.borrar');
    btnDelete.forEach(boton => {
      boton.addEventListener("click", async (event) => {
      const id = event.target.id
      const urlDelete = `${urlTareas}/${id}`
      console.log(urlDelete);
      const descripcionText = event.target
      .closest(".tarea")
      .querySelector(".nombre").textContent;
      const confirmacion = confirm(
        `¿Deseas eliminar la tarea: "${descripcionText}"?`
        );
        if (!confirmacion) {
          return; // Si el usuario cancela, no hacemos nada
        }
        const payload_del = {
          id: parseInt(id),
        };
        try {
          const settings_delete = {
            method: "DELETE",
            body: JSON.stringify(payload_del),
            headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(urlDelete, settings_delete);
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        const data = await response.json();
        
        alert("Tarea eliminada correctamente");
        await consultarTareas();
      } catch (error) {
        console.warn("Ups Algo pasó");
        // console.log(error.message);
        if (error.message == 400) {
          alert("ID Inválido");
        } else if (error.message == 401) {
          alert("Requiere Autorización");
        } else if (error.message == 404) {
          alert("Tarea Inexistente");
        } else {
          console.warn("Error del servidor");
          alert("Error del servidor");
        }
      }
    })
    })




  }
});
