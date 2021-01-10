function toggleModalDialog() {
  const md = document.getElementsByClassName('modal modal_position-right-top')[0];
  if (md.classList.contains("modal_state_show")) {
    md.classList.remove("modal_state_show");
  } else {
    md.classList.add("modal_state_show");
  }
}

function toggleModalClip() {
  const md = document.getElementsByClassName('modal modal_position_left-end')[0];
  const btn = document.getElementsByClassName('history__button history__button_type_text')[0];
  md.style.top = btn.offsetTop;
  md.style.left = btn.offsetLeft;
  if (md.classList.contains("modal_state_show")) {
    md.classList.remove("modal_state_show");
  } else {
    md.classList.add("modal_state_show");
  }
}
