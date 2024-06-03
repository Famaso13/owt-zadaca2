// 5 b
document.addEventListener("DOMContentLoaded", () => {
  var dialog = document.getElementById("dialog_text");
  var gumb_pop = document.getElementById("popuni");
  gumb_pop.addEventListener("click", () => {
    window.location.href = "/popis";
  });
  var linkovi = document.querySelectorAll("#linki");
  linkovi.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });
});
