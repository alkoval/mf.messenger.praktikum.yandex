function onClick() {
  const user = {
    email: document.getElementById("email").value,
    login: document.getElementById("login").value,
    name: document.getElementById("name").value,
    lastName: document.getElementById("lastName").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
    repassword: document.getElementById("repassword").value,
  };
  console.log(user);
}
