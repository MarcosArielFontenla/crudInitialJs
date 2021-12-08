function ShowInputData() {
    Swal.fire({
        title: 'Tarea a ingresar:',
        html: `<input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
               <input type="text" id="apellido" class="swal2-input" placeholder="Apellido">
               <textarea type="text" id="tarea" style="width: 300px; height: 200px;" class="swal2-input" placeholder="Tarea...">`,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
          const nombre = Swal.getPopup().querySelector('#nombre').value;
          const apellido = Swal.getPopup().querySelector('#apellido').value;
          const tarea = Swal.getPopup().querySelector('#tarea').value;
    
          if (!nombre || !apellido || !tarea) {
            Swal.showValidationMessage("Por favor ingrese todos los datos!.");
          } else { 
            return { nombre: nombre, apellido: apellido, tarea: tarea };
           }
        }
      }).then((result) => {
        Swal.fire(`Nombre: ${result.value.nombre} Apellido: ${result.value.apellido} Tarea: ${result.value.tarea}`.trim());
    });
}