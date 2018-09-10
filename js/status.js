function resizeHeaderOnScroll() {
  const distanceY = window.pageYOffset || document.documentElement.scrollTop,
  shrinkOn = 50,
  status = document.getElementById('mainStatus');
  status.classList.add('status');
  document.getElementById('messages').classList.add('messages-scroll');


  if (distanceY > shrinkOn) {
    status.classList.remove("status-height");
    status.classList.add("status-height-small");
  } else {
    status.classList.remove("status-height-small");
    status.classList.add("status-height");
  }
}

window.addEventListener('scroll', resizeHeaderOnScroll);
