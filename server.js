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
const server = express();
const putanja = __dirname;

const ds = require("fs");
const parserM = require("./js/server/parser.js");
const parser = new parserM();

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
// a
server.get("/popis", (zahtjev, odgovor) => {
  odgovor.type("html"); //moramo reci koji je tip
  // let zaglavlje = fs.readFileSync("resursi/zaglavlje.txt", "utf-8");
  // let podnozje = fs.readFileSync("resursi/podnozje.txt", "utf-8");
  // odgovor.write(zaglavlje);
  // odgovor.write("Dinamicna stranica");
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
  odgovor.write(lista);
  odgovor.end();
});

// 6.zad
server.get("/brisi/:naziv", (zahtjev, odgovor) => {
  naziv = zahtjev.params.naziv;
  let data = ds.readFileSync("resursi/izlozba.csv", "utf-8", (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });
  let ostali = "";
  let pronaden = 0;
  let redovi = data.split("\n");
  for (var index in redovi) {
    var stupci = redovi[index].split("#");
    if (stupci[0] != naziv) {
      ostali += redovi[index] + "\n";
    }
  }
  ds.writeFile("resursi/izlozba.csv", ostali, { flag: "w" }, (greska) => {
    if (greska) console.error("Greska kod pisanja u csv datoteku.");
  });
  odgovor.redirect("/popis");
  odgovor.end();
});

// 8.zad
// GET
server.get("/owt/izlozba", (zahtjev, odgovor) => {
  odgovor.type("json");
  let data = parser.dajIzlozbuCSV();
  if (data == null) {
    odgovor.send(JSON.stringify({ poruka: "Greška kod učitavanja podataka" }));
  } else {
    odgovor.status(200);
    odgovor.send(data);
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
  console.log(podaci);
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
