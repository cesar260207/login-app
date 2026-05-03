function obtenerUsuario() {
  return JSON.parse(localStorage.getItem("usuario"));
}

function verificarSesion() {
  const usuario = obtenerUsuario();

  if (!usuario) {
    // Si no hay sesión → volver al login
    window.location.href = "index.html";
  } else {
    // Mostrar nombre
    document.getElementById("nombreUsuario").textContent = usuario.nombre;
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuario");
  localStorage.removeItem("token");

  window.location.href = "index.html";
}

// Ejecutar al cargar
verificarSesion();

// Evento botón logout
document.getElementById("logout").addEventListener("click", cerrarSesion);