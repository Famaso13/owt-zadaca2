// 5 b
document.addEventListener("DOMContentLoaded", () => {
  const parserM = require("../server/parser.js");
  const parser = new parserM();

  var dialog = document.getElementById("dialog_text");
  var gumb_pop = document.getElementById("popuni");
  gumb_pop.addEventListener("click", () => {
    parser.kopirajJSONuCSV();
    console.log("zeeees");
    window.location.href("/popis");
  });
  var linkovi = document.querySelectorAll("#linki");
  linkovi.forEach((link) => {
    console.log(link);
    link.addEventListener("click", function (event) {
      event.preventDefault();
      if (confirm("Dela?")) {
        console.log("alelalasdlkalallelellellealallae");
      }
    });
  });
});
