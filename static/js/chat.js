function toggleModalDialog() {
  const md = document.getElementById("mdDialog");
  if (md.classList.contains("modal_state_hide")) {
    md.classList.remove("modal_state_hide");
    md.classList.add("modal_state_show");
  } else {
    md.classList.remove("modal_state_show");
    md.classList.add("modal_state_hide");
  }
}

function toggleModalClip() {
  const md = document.getElementById("mdClip");
  const btn = document.getElementById("btnClip");
  md.style.top = btn.offsetTop;
  md.style.left = btn.offsetLeft;
  if (md.classList.contains("modal_state_hide")) {
    md.classList.remove("modal_state_hide");
    md.classList.add("modal_state_show");
  } else {
    md.classList.remove("modal_state_show");
    md.classList.add("modal_state_hide");
  }
}
