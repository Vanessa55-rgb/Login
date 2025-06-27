// Mostrar formulario según botón
function showForm(formId) {
  document.querySelectorAll(".tab-form").forEach(f => f.classList.add("hidden"));
  document.getElementById(formId).classList.remove("hidden");
}

// Variables del login
const $submit = document.getElementById("submit"),
    $password = document.getElementById("password"),
    $username = document.getElementById("username"),
    $visible = document.getElementById("visible");

let users = JSON.parse(localStorage.getItem("users")) || [
    { username: "admin", password: "1234" }
];

// Mostrar contraseña
document.addEventListener("change", (e) => {
  if (e.target === $visible) {
    $password.type = $visible.checked ? "text" : "password";
  }
});

// LOGIN
document.getElementById("login").addEventListener("submit", (e) => {
  e.preventDefault();
  const user = $username.value.trim();
  const pass = $password.value.trim();
  const found = users.find(u => u.username === user && u.password === pass);
  if (found) {
    alert("Login exitoso");
    window.location.href = "home.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});

// REGISTRAR
document.getElementById("register").addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("new-username").value.trim();
  const pass = document.getElementById("new-password").value.trim();

  if (users.some(u => u.username === user)) {
    alert("El usuario ya existe.");
    return;
  }

  users.push({ username: user, password: pass });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Usuario registrado correctamente");
  e.target.reset();
});

// ACTUALIZAR
document.getElementById("update").addEventListener("submit", (e) => {
  e.preventDefault();
  const oldUser = document.getElementById("old-username").value.trim();
  const newUser = document.getElementById("updated-username").value.trim();
  const newPass = document.getElementById("updated-password").value.trim();

  const index = users.findIndex(u => u.username === oldUser);
  if (index === -1) {
    alert("Usuario no encontrado.");
    return;
  }

  if (newUser !== "") users[index].username = newUser;
  if (newPass !== "") users[index].password = newPass;

  localStorage.setItem("users", JSON.stringify(users));
  alert("Usuario actualizado correctamente.");
  e.target.reset();
});

// ELIMINAR
document.getElementById("delete").addEventListener("submit", (e) => {
  e.preventDefault();
  const userToDelete = document.getElementById("delete-username").value.trim();

  const index = users.findIndex(u => u.username === userToDelete);
  if (index === -1) {
    alert("Usuario no encontrado.");
    return;
  }

  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Usuario eliminado.");
  e.target.reset();
});
