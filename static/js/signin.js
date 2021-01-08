function onClick() {
  const user = {
    email: document.getElementById("email").value,
    login: document.getElementById("login").value,
    firstName: document.getElementById("firstName").value,
    secondName: document.getElementById("secondName").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
    repassword: document.getElementById("repassword").value,
  };
  console.log(user);
}
