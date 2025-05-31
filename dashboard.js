document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filters-box button');
    const tableItems = document.querySelectorAll('.table-item');
    const lifeCounter = document.querySelector('.life-counter');

    // Filtros
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.className;
            if (filter === 'all') {
                tableItems.forEach(item => {
                    item.style.display = '';
                });
            } else {
                tableItems.forEach(item => {
                    if (item.classList.contains(filter)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });

    // Botón check: eliminar item y sumar vida
    document.querySelectorAll('.check-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.table-item');
            if (item) item.remove();
            // Sumar 1 a life-counter
            if (lifeCounter) {
                let value = parseInt(lifeCounter.textContent, 10) || 0;
                lifeCounter.textContent = value + 1;
            }
        });
    });
});