function updateProfile() {
  const obj = {};
  const properties = Array.from(document.querySelectorAll(".profile__input"));

  for (let prop of properties) {
    obj[prop.name] = prop.value;
  }

  console.log(obj);
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
  const err = document.getElementById("fileUploadError");
  const md = document.getElementById("mdFileUpload");
  if (err.classList.contains("modal__text_display_none")) {
    if (md.classList.contains("blackout_state_show")) {
      md.classList.remove("blackout_state_show");
    } else {
      md.classList.add("blackout_state_show");
    }
  }
}
