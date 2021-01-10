function fillForm() {
  const obj = {};
  const properties = Array.from(
    document.querySelectorAll(".form-field__input")
  );

  for (let prop of properties) {
    obj[prop.name] = prop.value;
  }

  console.log(obj);
}
