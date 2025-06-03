document.addEventListener('DOMContentLoaded', () => {
    const tableArea = document.querySelector('.table-area');
    const lifeCounter = document.querySelector('.life-counter');
    const filterButtons = document.querySelectorAll('.filters-box button');
    let tareaSeleccionada = null; // Guardar la tarea a eliminar

    // Inicializar vidas y tareas si es la primera vez
    if (localStorage.getItem('firstTime') !== 'no') {
        localStorage.setItem('tareas', JSON.stringify([]));
        localStorage.setItem('vidas', '0');
        localStorage.setItem('firstTime', 'no');
    }

    // Mostrar vidas desde localStorage
    lifeCounter.textContent = localStorage.getItem('vidas') || '0';

    // Cargar tareas de localStorage (más recientes primero)
    function renderTareas() {
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        tableArea.innerHTML = '';
        tareas.slice().reverse().forEach((tarea, idx, arr) => {
            const div = document.createElement('div');
            div.className = `table-item ${tarea.prioridad}`;
            div.dataset.index = arr.length - 1 - idx; // Guardar el índice real
            div.innerHTML = `
                <p>${tarea.nombre}</p>
                <div class="item-actions">
                    <button class="check-btn" title="Completar">&#10003;</button>
                    <button class="cross-btn" title="No completado">&#10005;</button>
                </div>
            `;
            tableArea.appendChild(div);
        });
    }
    renderTareas();

    // Filtros
    function applyFilter(filter) {
        document.querySelectorAll('.table-item').forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            applyFilter(btn.className);
        });
    });

    // Botón check eliminar item y sumar vida
    tableArea.addEventListener('click', function(e) {
        if (e.target.classList.contains('check-btn')) {
            const item = e.target.closest('.table-item');
            if (item) {
                // Eliminar del localStorage
                const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
                const idx = parseInt(item.dataset.index, 10);
                tareas.splice(idx, 1);
                localStorage.setItem('tareas', JSON.stringify(tareas));
                // Eliminar del DOM
                item.remove();
                // Actualizar vidas en localStorage y en pantalla
                let value = parseInt(lifeCounter.textContent, 10) || 0;
                value += 1;
                lifeCounter.textContent = value;
                localStorage.setItem('vidas', value.toString());
            }
        }
        // Guardar referencia a la tarea para el modal
        if (e.target.classList.contains('cross-btn')) {
            tareaSeleccionada = e.target.closest('.table-item');
            const modal = document.getElementById('modal-penalty');
            if (modal) modal.style.display = 'flex';
        }
    });

    // Modal cerrar y gastar vida
    document.body.addEventListener('click', function(e) {
        // Cerrar modal
        if (e.target.classList.contains('close')) {
            const modal = document.getElementById('modal-penalty');
            if (modal) modal.style.display = 'none';
        }
        // Gastar vida y eliminar tarea
        if (e.target.classList.contains('life')) {
            let vidas = parseInt(lifeCounter.textContent, 10) || 0;
            if (vidas > 0) {
                vidas -= 1;
                lifeCounter.textContent = vidas;
                localStorage.setItem('vidas', vidas.toString());
            }
            // Eliminar la tarea seleccionada
            if (tareaSeleccionada) {
                const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
                const idx = parseInt(tareaSeleccionada.dataset.index, 10);
                tareas.splice(idx, 1);
                localStorage.setItem('tareas', JSON.stringify(tareas));
                tareaSeleccionada.remove();
                tareaSeleccionada = null;
            }
            // Cerrar modal después de gastar vida
            const modal = document.getElementById('modal-penalty');
            if (modal) modal.style.display = 'none';
        }

        
    });
});

