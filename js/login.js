function mostrarError(mensaje) {
  document.getElementById("error").textContent = mensaje;
}

function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

async function loginUsuario(email, password) {
  try {
    const usuarios = obtenerUsuarios();

    const usuario = usuarios.find(
      u => u.email === email && u.password === password
    );

    if (usuario) {
      // Simular token
      localStorage.setItem("token", "fake-token-123");

      // Guardar usuario actual
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Redirección según rol
      if (usuario.role === "admin") {
        window.location.href = "admin.html";
      } else if (usuario.role === "coach") {
        window.location.href = "coach.html";
      } else {
        window.location.href = "user.html";
      }

    } else {
      mostrarError("Email o contraseña incorrectos");
    }

  } catch (error) {
    mostrarError("Error inesperado");
  }
}

document.getElementById("formLogin").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    mostrarError("Completa todos los campos");
    return;
  }

  loginUsuario(email, password);
});