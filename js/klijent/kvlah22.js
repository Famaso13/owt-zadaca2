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
gumb.addEventListener("click", function () {
  if (verzija == 0) {
    div_gumb.classList.toggle("prikaz_div");
    div_gumb.classList.toggle("prikaz_div_verzija");
    gumb.innerHTML = "Vrati na stolnu verziju";
    verzija = 1;

    //  logo
    porsche_logo.classList.toggle("img_slika");
    porsche_tekst.classList.toggle("img_tekst");

    //nav
    nav.classList.toggle("nav");
    nav.classList.toggle("nav_verzija");

    //  h1
    opis_h1.classList.toggle("opis_mapa_tekst_h1_verzija");
    mapa_tekst_h1.classList.toggle("opis_mapa_tekst_h1_verzija");

    //  vijesti sadrzaj
    vijesti_sadrzaj.classList.toggle("vijesti_sadrzaj");
    vijesti_sadrzaj.classList.toggle("vijesti_sadrzaj_mobile");
  } else {
    div_gumb.classList.toggle("prikaz_div");
    div_gumb.classList.toggle("prikaz_div_verzija");
    gumb.innerHTML = "Prebaci na mobilnu verziju";
    verzija = 0;

    //  logo
    porsche_logo.classList.toggle("img_slika");
    porsche_tekst.classList.toggle("img_tekst");

    //nav
    nav.classList.toggle("nav");
    nav.classList.toggle("nav_verzija");

    //  h1
    opis_h1.classList.toggle("opis_mapa_tekst_h1_verzija");
    mapa_tekst_h1.classList.toggle("opis_mapa_tekst_h1_verzija");

    //  vijesti sadrzaj
    vijesti_sadrzaj.classList.toggle("vijesti_sadrzaj");
    vijesti_sadrzaj.classList.toggle("vijesti_sadrzaj_mobile");
  }
});
