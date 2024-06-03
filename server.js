function dajPort(korime) {
  var os = require("os");
  const HOST = os.hostname();
  let port = null;
  if (HOST != "spider.foi.hr") {
    port = 12222;
  } else {
    const portovi = require("/var/www/OWT/2024/portovi.js");
    port = portovi[korime];
  }
  console.log(port);
  return port;
}

const port = dajPort("kvlah22"); //12090
const express = require("express");
const cookieParser = require("cookie-parser");
const server = express();
const putanja = __dirname;

const ds = require("fs");
const parserM = require("./js/server/parser.js");
const parser = new parserM();

server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

console.log(putanja);

//2. zad
// index.html
server.get("/", (zahtjev, odgovor) => {
  odgovor.sendFile(putanja + "/html/index.html");
});

// dokumentacija
server.get("/dok", (zahtjev, odgovor) => {
  odgovor.sendFile(putanja + "/html/glavne/dokumentacija.html");
});

// oAutoru
server.get("/oau", (zahtjev, odgovor) => {
  odgovor.sendFile(putanja + "/html/glavne/oAutoru.html");
});

// galerija
server.get("/gal", (zahtjev, odgovor) => {
  odgovor.sendFile(putanja + "/html/galerija.html");
});

// tablica
server.get("/tab", (zahtjev, odgovor) => {
  odgovor.sendFile(putanja + "/html/tablica.html");
});

// obrazac
server.get("/obr", (zahtjev, odgovor) => {
  odgovor.sendFile(putanja + "/html/obrazac.html");
});

// unosPrimjerka
server.get("/uno", (zahtjev, odgovor) => {
  odgovor.sendFile(putanja + "/html/unosPrimjerka.html");
});

// prica
server.get("/pri", (zahtjev, odgovor) => {
  odgovor.sendFile(putanja + "/html/detalji/prica.html");
});

// suveniri
server.get("/suv", (zahtjev, odgovor) => {
  odgovor.sendFile(putanja + "/html/detalji/suveniri.html");
});

// voznja
server.get("/voz", (zahtjev, odgovor) => {
  odgovor.sendFile(putanja + "/html/detalji/voznja.html");
});

// 3. zad
// klijentski js
server.use("/jsk", express.static(putanja + "/js/klijent"));

// css dir
server.use("/css", express.static(putanja + "/css"));

// slike dir
server.use("/slike", express.static(putanja + "/resursi/slike"));

// 5.zad
server.get("/popis", (zahtjev, odgovor) => {
  odgovor.type("html");
  // a
  let data = ds.readFileSync("resursi/izlozba.csv", "utf-8", (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });
  let lista = "";
  let redovi = data.split("\n");
  lista += "<ul>";
  for (var red in redovi) {
    var stupci = redovi[red].split("#");
    if (stupci[0]) {
      lista += "<li><a href='#'>" + stupci[0] + "</a> - ";
      for (var stupac in stupci) {
        if (stupac != 0) {
          if (stupac < stupci.length) lista += stupci[stupac] + ", ";
          else lista += stupci[stupac] + "\n";
        }
      }
    }
    lista += "</li>";
  }
  lista += "</ul>";

  // c
  forma = "<form><button id='popuni'>Popuni</button></form>";
  //skripta = '<script type="text/javascript">const gumb = document.getElementById("popuni"); function puniCSV() {alert("opa")} gumb.addEventListener("click", puniCSV);</script>';

  stranica = /*skripta +*/ forma + lista;
  odgovor.write(stranica);
  odgovor.end();
});

// 6.zad
server.get("/brisi/:naziv", (zahtjev, odgovor) => {
  naziv = zahtjev.params.naziv;
  parser.brisiIzCSV(naziv);
  odgovor.redirect("/popis");
  odgovor.end();
});

// 8.zad
// GET
server.get("/owt/izlozba", (zahtjev, odgovor) => {
  odgovor.type("json");
  let data = parser.dajIzlozbuCSV();
  if (data == null) {
    odgovor.send({ greska: "Greška kod učitavanja podataka" });
  } else {
    odgovor.status(200);
    odgovor.send(parser.prebaciCSVuJSON(data));
  }
});

// POST
server.post("/owt/izlozba", (zahtjev, odgovor) => {
  odgovor.type("json");
  post = zahtjev.body;
  podaci = [];
  for (kljuc in post) {
    podaci.push(post[kljuc]);
  }
  csvRedak = "";
  for (let i in podaci) {
    if (i < podaci.length - 1) csvRedak += podaci[i] + "#";
    else csvRedak += podaci[i];
  }
  let greska = parser.dodajNaCSV(csvRedak);
  if (greska) {
    odgovor.status(417);
    odgovor.send({ greska: "Nevaljani podaci" });
  } else {
    odgovor.status(200);
    odgovor.send({ poruka: "Podaci dodani" });
  }
});

// PUT
server.put("/owt/izlozba", (zahtjev, odgovor) => {
  odgovor.status(501);
  odgovor.send({ greska: "Metoda nije implementirana" });
});

// DELETE
server.delete("/owt/izlozba", (zahtjev, odgovor) => {
  odgovor.status(501);
  odgovor.send({ greska: "Metoda nije implementirana" });
});

// 9.zad
// GET
server.get("/owt/izlozba/:naziv", (zahtjev, odgovor) => {
  odgovor.type("json");
  naziv = zahtjev.params.naziv;
  let data = parser.dajIzlozbuCSV();
  if (data == null) {
    odgovor.send({ greska: "Greška kod učitavanja podataka" });
  } else {
    let redovi = data.split("\n");
    let resurs = 0;
    for (var index in redovi) {
      var stupci = redovi[index].split("#");
      if (stupci[0] == naziv) {
        resurs = redovi[index];
      }
    }
    if (resurs) {
      odgovor.status(200);
      odgovor.send(parser.prebaciCSVuJSON(resurs));
    } else {
      odgovor.status(404);
      odgovor.send({ greska: "Nema resursa" });
    }
  }
});

// POST
server.post("/owt/izlozba/:naziv", (zahtjev, odgovor) => {
  odgovor.type("json");
  odgovor.status(405);
  odgovor.send({ greska: "Metoda nije dopuštena" });
});

// PUT
server.put("/owt/izlozba/:naziv", (zahtjev, odgovor) => {
  odgovor.type("json");
  odgovor.status(501);
  odgovor.send({ greska: "Metoda nije implementirana" });
});

// DELETE
server.delete("/owt/izlozba/:naziv", (zahtjev, odgovor) => {
  odgovor.type("json");
  naziv = zahtjev.params.naziv;
  let data = parser.dajIzlozbuCSV();
  if (data == null) {
    odgovor.send({ greska: "Greška kod učitavanja podataka" });
  } else {
    let redovi = data.split("\n");
    let resurs = 0;
    for (var index in redovi) {
      var stupci = redovi[index].split("#");
      if (stupci[0] == naziv) {
        resurs = naziv;
      }
    }
    let greska = 0;
    if (resurs) {
      greska = parser.brisiIzCSV(resurs);
    }

    if (greska || !resurs) {
      odgovor.status(417);
      odgovor.send({ greska: "Brisanje neuspješno provjerite naziv" });
    } else {
      odgovor.status(200);
      odgovor.send({ poruka: "Podaci izbrisani" });
    }
  }
});

// kolacic za index
server.get("/kolacic/prikaz", (zahtjev, odgovor) => {
  const stanjeGumba = req.cookies.prikazStanje || "normalan";
  res.json({ state: stanjeGumba });
});

server.post("/kolacic/prikaz", (zahtjev, odgovor) => {
  const { state } = req.body;
  res.cookie("prikazStanje", state, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: false,
  });
  res.json({ success: true });
});

// 4.zad
server.use((zahtjev, odgovor) => {
  odgovor.status(404);
  odgovor.type("html");
  odgovor.send("<p>Stranica ne postoji!</p><a href='/'>Natrag na pocetnu</a>");
});

server.listen(port, () => {
  console.log(`Server pokrenut na portu: ${port}`);
});
