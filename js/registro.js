function mostrarError(mensaje) {
  document.getElementById("error").textContent = mensaje;
}

function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function validarRegistro(nombre, email, password, repetirPassword) {

  if (!nombre || !email || !password || !repetirPassword) {
    return "Todos los campos son obligatorios";
  }

  if (!email.includes("@")) {
    return "Email inválido";
  }

  if (password.length < 8) {
    return "Mínimo 8 caracteres";
  }

  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return "Debe tener letras y números";
  }

  if (password !== repetirPassword) {
    return "Las contraseñas no coinciden";
  }

  return null;
}

async function registrarUsuario(nombre, email, password) {
  try {
    const usuarios = obtenerUsuarios();

    // Verificar si ya existe
    const existe = usuarios.find(u => u.email === email);

    if (existe) {
      mostrarError("El usuario ya existe");
      return;
    }

    const nuevoUsuario = {
      nombre,
      email,
      password,
      role: "user"
    };

    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);

    alert("Usuario registrado correctamente");

    window.location.href = "login.html";

  } catch (error) {
    mostrarError("Error inesperado");
  }
}

document.getElementById("formRegistro").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const repetirPassword = document.getElementById("repetirPassword").value;

  const error = validarRegistro(nombre, email, password, repetirPassword);

  if (error) {
    mostrarError(error);
    return;
  }

  registrarUsuario(nombre, email, password);
});