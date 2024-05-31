// 3 zad
function provjera() {
  // inputi
  var ime = document.obrazac.ime.value;
  var prezime = document.obrazac.prezime.value;
  var email = document.obrazac.mail.value;
  var mobitel = document.obrazac.br_mobitel.value;
  var automobil = document.getElementById("odabir");
  var paket = document.obrazac.radio.value;
  var dob = parseInt(document.obrazac.godine.value);
  var datum = new Date(document.obrazac.datum.value);
  var br_dana = parseInt(document.obrazac.brojke.value);
  var napomena = document.obrazac.napomena.value;
  var uvijeti = document.obrazac.kocke.checked;

  // greske
  var greska_ime = document.getElementById("greska_ime");
  var greska_prezime = document.getElementById("greska_prezime");
  var greska_mail = document.getElementById("greska_mail");
  var greska_mobitel = document.getElementById("greska_mobitel");
  var greska_automobil = document.getElementById("greska_automobil");
  var greska_paket = document.getElementById("greska_paket");
  var greska_dob = document.getElementById("greska_dob");
  var greska_datum = document.getElementById("greska_datum");
  var greska_br_dana = document.getElementById("greska_br_dana");
  var greska_napomena = document.getElementById("greska_napomena");
  var greska_uvijeti = document.getElementById("greska_uvijeti");

  //select
  var grupe = automobil.getElementsByTagName("optgroup");
  let izabran = 1;
  let baremJedan = 0;

  for (const grupa of grupe) {
    let opcije = grupa.getElementsByTagName("option");
    let odabranaGrupa = 0;

    for (const opcija of opcije) {
      if (opcija.selected) {
        odabranaGrupa = 1;
        baremJedan = 1;
        break;
      }
    }

    if (!odabranaGrupa) {
      izabran = 0;
      break;
    }
  }

  // textarea
  const pocetakKraj = /^[A-Z].*\.$/s;
  const recenica = /^[A-Z][^<>#-]*[.!?]$/;
  const zabranjeni = /[<>#-]/;

  // a, b

  var greska = 0;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var mobitelRegex = /^\d{10}$/;
  var imePrezimeRegex = /^[A-Za-z\s\-]+$/;

  var danas = new Date(Date.now());
  danas.setHours(0, 0, 0, 0);
  var datum_najranije = new Date();
  datum_najranije.setDate(danas.getDate() + 2);
  var datum_najkasnije = new Date();
  datum_najkasnije.setDate(danas.getDate() + 30);

  if (!ime) {
    greska_ime.firstElementChild.style.borderLeft = "3px #b12b28 solid";
    greska_ime.lastElementChild.innerHTML = "Niste stavili ime";
    greska = 1;
  } else if (!imePrezimeRegex.test(ime)) {
    greska_ime.firstElementChild.style.borderLeft = "3px #b12b28 solid";
    greska_ime.lastElementChild.innerHTML =
      "Ime može sadržavati samo slova, razmake i spojnice";
    greska = 1;
  } else {
    greska_ime.firstElementChild.style.borderLeft = "none";
    greska_ime.lastElementChild.innerHTML = "";
  }

  if (!prezime) {
    greska_prezime.lastElementChild.innerHTML = "Niste stavili prezime";
    greska = 1;
    greska_prezime.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else if (!imePrezimeRegex.test(prezime)) {
    greska_prezime.lastElementChild.innerHTML =
      "Prezime može sadržavati samo slova, razmake i spojnice";
    greska = 1;
    greska_prezime.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else {
    greska_prezime.lastElementChild.innerHTML = "";
    greska_prezime.firstElementChild.style.borderLeft = "none";
  }

  if (!email) {
    greska_mail.lastElementChild.innerHTML = "Niste stavili e-mail";
    greska = 1;
    greska_mail.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else if (!emailRegex.test(email)) {
    greska_mail.lastElementChild.innerHTML =
      "Email treba biti u formatu korisnik@primjer.com";
    greska = 1;
    greska_mail.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else {
    greska_mail.lastElementChild.innerHTML = "";
    greska_mail.firstElementChild.style.borderLeft = "none";
  }

  if (!mobitel) {
    greska_mobitel.lastElementChild.innerHTML = "Niste stavili broj mobitela";
    greska = 1;
    greska_mobitel.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else if (isNaN(mobitel) || !mobitelRegex.test(mobitel)) {
    greska_mobitel.lastElementChild.innerHTML =
      "Broj mobitela mora sadržavati 10 brojeva";
    greska = 1;
    greska_mobitel.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else {
    greska_mobitel.lastElementChild.innerHTML = "";
    greska_mobitel.firstElementChild.style.borderLeft = "none";
  }

  if (!baremJedan) {
    greska_automobil.lastElementChild.innerHTML = "Niste odabrali automobil";
    greska = 1;
    greska_automobil.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else if (!izabran) {
    greska_automobil.lastElementChild.innerHTML =
      "Niste odabrali barem jedan automobil iz svake grupe";
    greska = 1;
    greska_automobil.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else {
    greska_automobil.lastElementChild.innerHTML = "";
    greska_automobil.firstElementChild.style.borderLeft = "none";
  }

  if (!paket) {
    greska_paket.lastElementChild.innerHTML = "Niste odabrali paket";
    greska = 1;
    greska_paket.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else {
    greska_paket.lastElementChild.innerHTML = "";
    greska_paket.firstElementChild.style.borderLeft = "none";
  }

  if (!dob) {
    greska_dob.lastElementChild.innerHTML = "Niste stavili dob";
    greska = 1;
    greska_dob.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else {
    greska_dob.lastElementChild.innerHTML = "";
    greska_dob.firstElementChild.style.borderLeft = "none";
  }

  if (!datum || datum == "Invalid Date") {
    greska_datum.lastElementChild.innerHTML = "Niste stavili datum";
    greska = 1;
    greska_datum.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else if (datum < datum_najranije || datum > datum_najkasnije) {
    greska_datum.lastElementChild.innerHTML =
      "Datum mora biti najranije 2 dana i najkasnije 1 mjesec u budućnost";
    greska = 1;
    greska_datum.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else {
    greska_datum.lastElementChild.innerHTML = "";
    greska_datum.firstElementChild.style.borderLeft = "none";
  }

  if (!br_dana) {
    greska_br_dana.lastElementChild.innerHTML = "Niste stavili broj dana";
    greska = 1;
    greska_br_dana.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else if (br_dana < 1 || br_dana > 5) {
    greska_br_dana.lastElementChild.innerHTML =
      "Broj dana mora biti između najmanje 1 i najviše 5";
    greska = 1;
    greska_br_dana.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else {
    greska_br_dana.lastElementChild.innerHTML = "";
    greska_br_dana.firstElementChild.style.borderLeft = "none";
  }

  if (!napomena) {
    greska_napomena.lastElementChild.innerHTML = "Niste stavili napomenu";
    greska = 1;
    greska_napomena.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else if (!pocetakKraj.test(napomena)) {
    greska_napomena.lastElementChild.innerHTML =
      "Tekst treba početi s velikim slovom i završiti točkom";
    greska = 1;
    greska_napomena.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else if (zabranjeni.test(napomena)) {
    greska_napomena.lastElementChild.innerHTML =
      "Tekst ne smije sadržavati znakove < > # -";
    greska = 1;
    greska_napomena.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else {
    const brojRecenica = (napomena.match(/[.!?]/g) || []).length;

    if (brojRecenica > 4) {
      greska_napomena.lastElementChild.innerHTML =
        "Tekst može sadržavati najviše 4 rečenice";
      greska = 1;
      greska_napomena.firstElementChild.style.borderLeft = "3px #b12b28 solid";
    } else {
      const recenice = napomena.split(/(?<=[.!?])\s+/);
      let ispravneRecenice = true;
      for (const rec of recenice) {
        if (!recenica.test(rec.trim())) {
          ispravneRecenice = false;
          break;
        }
      }
      if (!ispravneRecenice) {
        greska_napomena.lastElementChild.innerHTML =
          "Svaka rečenica mora početi velikim slovom i završiti točkom, uskličnikom ili upitnikom";
        greska = 1;
        greska_napomena.firstElementChild.style.borderLeft =
          "3px #b12b28 solid";
      } else {
        greska_napomena.lastElementChild.innerHTML = "";
        greska_napomena.firstElementChild.style.borderLeft = "none";
      }
    }
  }

  if (!uvijeti) {
    greska_uvijeti.lastElementChild.innerHTML = "Niste prihvatili uvijete";
    greska = 1;
    greska_uvijeti.firstElementChild.style.borderLeft = "3px #b12b28 solid";
  } else {
    greska_uvijeti.lastElementChild.innerHTML = "";
    greska_uvijeti.firstElementChild.style.borderLeft = "none";
  }

  if (greska) {
    return false;
  } else {
    return true;
  }
}
