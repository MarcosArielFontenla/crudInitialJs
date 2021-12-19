"use strict";

class TaskProvider {

  buttonsAction = {
    btnCreate: document.getElementById("btnCreate"),
    btnEliminar: document.getElementById("btnEliminar"),
    btnEditar: document.getElementById("btnEditar"),
    table: document.getElementById("tbody")
  }

  constructor() {
  }

  // ### FUNCIONES ###.
  // Agregar un registro en el storage.
  AppendTaskToStorage(obj) {
    let data = [],
    dataInLocalStorage = localStorage.getItem("tareas");

    if (dataInLocalStorage !== null) {
      data = JSON.parse(dataInLocalStorage);
    }

    data.push(obj);
    localStorage.setItem("tareas", JSON.stringify(data));
    console.log(localStorage.getItem("tareas"));
  }

  // tener un objeto donde cada tarea sea un objeto con el nombre, mes y descripcion de la tarea. Donde yo asi tenga un array de tareas que lo voy a estar guardando en el storage. iterar el array de tareas para agregar cada tarea en la tabla.

  // Agrega la tarea ingresada al formulario en la tabla (no depende del storage)
  AppendTaskToTable(task) {
    let tr = taskProvider.buttonsAction.table.insertRow(1);
    let nombre = task.nombre;
    let mes = task.mes;
    let tarea = task.tarea;
    let registro = `
      <th>${nombre}</th>
      <th>${mes}</th>
      <th>${tarea}</th>
      <th>
        <button class="btn btn-outline-danger" id="btnDelete">Eliminar</button>
      </th>`;

    tr.innerHTML = registro;
    taskProvider.buttonsAction.table.appendChild(tr);
  }

  // Agregar un registro en el storage
  GetPreviousTaskOnReload() {
    let tasks = JSON.parse(localStorage.getItem("tareas")) || [];

    tasks.forEach((task) => {
      let tr = taskProvider.buttonsAction.table.insertRow(1);
      let nombre = task.nombre;
      let mes = task.mes;
      let tarea = task.tarea;

      let registro = `
        <th>${nombre}</th>
        <th>${mes}</th>
        <th>${tarea}</th>`;

      tr.innerHTML = registro;
      taskProvider.buttonsAction.table.appendChild(tr);
    });
  }

  // Eliminar un registro en el storage.
  DeleteTaskFromStorage(task) {
    let data = JSON.parse(localStorage.getItem("tareas")) || [];
    let index = data.indexOf(task);
    data.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(data));
  }

  ShowInputData() {
    Swal.fire({
      title: "Tarea a ingresar:",
      html: `<input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
             <input type="text" id="mes" class="swal2-input" placeholder="Mes">
             <textarea type="text" id="tarea" style="width: 300px; height: 200px;" class="swal2-input" placeholder="Tarea...">`,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const nombre = Swal.getPopup().querySelector("#nombre").value;
        const mes = Swal.getPopup().querySelector("#mes").value;
        const tarea = Swal.getPopup().querySelector("#tarea").value;

        if (!nombre || !mes || !tarea) {
          Swal.showValidationMessage("Por favor ingrese todos los datos!.");
        } else {
          return { nombre: nombre, mes: mes, tarea: tarea };
        }
      },
    }).then((result) => {
      taskProvider.AppendTaskToStorage(result.value);
      taskProvider.AppendTaskToTable(result.value);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tus datos fueron ingresados con exito!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }
}
// ### FIN DE LA CLASE ###

// Instancia de la clase.
let taskProvider = new TaskProvider();

// Llamadas de las funciones.
window.addEventListener("load", () => {
  taskProvider.GetPreviousTaskOnReload();
});

taskProvider.buttonsAction.btnCreate.addEventListener("click", () => {
  taskProvider.ShowInputData();
});

taskProvider.buttonsAction.btnEliminar.addEventListener("click", (e) => {
  Swal.fire({
    title: "¿Estas seguro de eliminar?",
    text: "Esta acción no se puede deshacer!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.value) {
      let task = e.target.parentElement.parentElement;
      taskProvider.DeleteTaskFromStorage(task);
      task.remove(task);
    }
  });
});