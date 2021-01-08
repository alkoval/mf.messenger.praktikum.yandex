function onClick() {
  const user = {
    email: document.getElementById("email").value,
    login: document.getElementById("login").value,
    firstName: document.getElementById("firstName").value,
    secondName: document.getElementById("secondName").value,
    displayName: document.getElementById("displayName").value,
    phone: document.getElementById("phone").value,
  };
  console.log(user);
}

function checkFile(o) {
  const label = document.getElementById("fileUploadLabel");
  const err = document.getElementById("fileUploadError");
  let valid = false;
  if (o.files[0] !== undefined) {
    if (o.files[0].name.endsWith(".jpg") || o.files[0].name.endsWith(".png")) {
      // Максимальный допустимый размер 10 мб
      if (o.files[0].size < 1e7) {
        label.textContent = o.files[0].name;
        valid = true;
      } else {
        err.textContent = "Превышен допустимый размер!";
      }
    } else {
      err.textContent = "Неверный формат!";
    }
  } else {
    err.textContent = "Ошибка чтения файла!";
  }

  if (valid) {
    err.classList.add("modal__text_display_none");
  } else {
    err.classList.remove("modal__text_display_none");
  }
}

function toggleModalFileUpload() {
  if (
    document
      .getElementById("fileUploadError")
      .classList.contains("modal__text_display_none")
  ) {
    const md = document.getElementById("mdFileUpload");
    if (md.classList.contains("modal_state_hide")) {
      md.classList.remove("modal_state_hide");
      md.classList.add("modal_state_show");
    } else {
      md.classList.remove("modal_state_show");
      md.classList.add("modal_state_hide");
    }
  }
}
