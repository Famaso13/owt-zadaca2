var gumb = document.getElementById("verzija");
var div_gumb = document.getElementById("prikaz_div");
var nav = document.getElementById("racunalo");
var opis_h1 = document.getElementById("opis_h1");
var mapa_tekst_h1 = document.getElementById("mapa_tekst_h1");
var opis_p = document.getElementById("opis_p");
var mapa_tekst_p = document.getElementById("mapa_tekst_p");
var vijesti_sadrzaj = document.getElementById("vijesti_sadrzaj");
var porsche_logo = document.getElementById("img_slika");
var porsche_tekst = document.getElementById("img_tekst");

var verzija = 0;

window.onload = function () {
  kontrolaVerzije();
};

function upisiKolacic() {
  var stanje = gumb.innerHTML;
  document.cookie = "Stanje=" + stanje + ";";
}

function kontrolaVerzije() {
  var trazi = "Stanje=";
  var kolacici = document.cookie;
  if (kolacici.length > 0) {
    var pocetak = kolacici.indexOf(trazi);
    if (pocetak !== -1) {
      kolacici = kolacici.substring(pocetak + trazi.length, kolacici.length);
      var kraj = kolacici.indexOf(";");
      if (kraj === -1) {
        kraj = kolacici.length;
      }
      var mojKolacic = kolacici.substring(0, kraj);
      if (mojKolacic !== null && mojKolacic.length > 0) {
        if (mojKolacic === "Prebaci na mobilnu verziju") {
          div_gumb.classList.add("prikaz_div_verzija");
          div_gumb.classList.remove("prikaz_div");
          gumb.innerHTML = "Vrati na stolnu verziju";
          verzija = 1;

          //  logo
          porsche_logo.classList.add("img_slika_verzija");
          porsche_logo.classList.remove("img_slika");
          porsche_tekst.classList.add("img_tekst_verzija");
          porsche_tekst.classList.remove("img_tekst");

          //nav
          nav.classList.add("nav_verzija");
          nav.classList.remove("nav");

          //  h1
          opis_h1.classList.add("opis_mapa_tekst_h1_verzija");
          mapa_tekst_h1.classList.add("opis_mapa_tekst_h1_verzija");

          //  vijesti sadrzaj
          vijesti_sadrzaj.classList.add("vijesti_sadrzaj_mobile");
          vijesti_sadrzaj.classList.remove("vijesti_sadrzaj");
        } else {
          div_gumb.classList.add("prikaz_div");
          div_gumb.classList.remove("prikaz_div_verzija");
          gumb.innerHTML = "Prebaci na mobilnu verziju";
          verzija = 0;

          //  logo
          porsche_logo.classList.add("img_slika");
          porsche_logo.classList.remove("img_slika_verzija");
          porsche_tekst.classList.add("img_tekst");
          porsche_tekst.classList.remove("img_tekst_verzija");

          //nav
          nav.classList.add("nav");
          nav.classList.remove("nav_verzija");

          //  h1
          opis_h1.classList.remove("opis_mapa_tekst_h1_verzija");
          mapa_tekst_h1.classList.remove("opis_mapa_tekst_h1_verzija");

          //  vijesti sadrzaj
          vijesti_sadrzaj.classList.add("vijesti_sadrzaj");
          vijesti_sadrzaj.classList.remove("vijesti_sadrzaj_mobile");
        }
      }
    }
  }
}

gumb.addEventListener("click", function () {
  upisiKolacic();
  kontrolaVerzije();
});
