
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cedula = document.querySelector('.cedula').value.trim();
    const clave = document.querySelector('.clave').value.trim();
    if (cedula === '1234' && clave === '1234') {
        window.location.href = 'dashboard.html';
    } else {
        alert('Credenciales incorrectas');
    }
});