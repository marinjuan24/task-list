document.addEventListener('DOMContentLoaded', () => {
    // Selección de prioridad visual
    document.querySelectorAll('.btn-priority').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-priority').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById('prioridad').value = this.dataset.priority;
        });
    });
    // Seleccionar el primero por defecto
    document.querySelector('.btn-priority.red').classList.add('selected');

    // Guardar tarea al enviar el formulario
    document.querySelector('.form-task').addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = this.nombre.value.trim();
        const prioridad = this.prioridad.value;

        if (!nombre) return;

        // Obtener tareas existentes o array vacío
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        // Agregar nueva tarea
        tareas.push({ nombre, prioridad });
        // Guardar en localStorage
        localStorage.setItem('tareas', JSON.stringify(tareas));
        // Redirigir al dashboard
        window.location.href = 'dashboard.html';
    });
});