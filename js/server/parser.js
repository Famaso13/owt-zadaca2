const ds = require("fs");

class Parser {
  dajIzlozbuJSON = function () {
    var podaci = ds.readFileSync("resursi/izlozba.json", "utf-8");
    return JSON.parse(podaci);
  };

  dajIzlozbuCSV = function () {
    var podaci = ds.readFileSync("resursi/izlozba.csv", "utf-8");
    return podaci;
  };

  dodajNaCSV = function (csvObj) {
    let data = ds.readFileSync("resursi/izlozba.csv", "utf-8", (err, data) => {
      if (err) console.log(err);
      else console.log(data);
    });
    data += csvObj + "\n";
    ds.writeFile("resursi/izlozba.csv", data, { flag: "w" }, (greska) => {
      if (greska) console.error("Greska zapisivanja novog retka u CSV");
      return greska;
    });
  };

  brisiIzCSV = function (csv) {
    let data = ds.readFileSync("resursi/izlozba.csv", "utf-8", (err, data) => {
      if (err) console.log(err);
      else console.log(data);
    });
    let ostali = "";
    let redovi = data.split("\n");
    for (var index in redovi) {
      var stupci = redovi[index].split("#");
      if (stupci[0] && stupci[0] != csv) {
        ostali += redovi[index] + "\n";
      }
    }
    if (ostali)
      ds.writeFile("resursi/izlozba.csv", ostali, { flag: "w" }, (greska) => {
        if (greska) console.error("Greska kod pisanja u csv datoteku.");
        return greska;
      });
  };

  kopirajJSONuCSV = function () {
    var podaci = this.dajIzlozbu();
    let csvRedak = "";
    for (var index in podaci) {
      if (index < podaci.length) {
        csvRedak += podaci[index].Model + "#";
        csvRedak += podaci[index].Godina + "#";
        csvRedak += podaci[index].Motor + "#";
        csvRedak += podaci[index].Boja + "#";
        csvRedak += podaci[index].Cijena + "\n";
      }
    }
    ds.writeFile("resursi/izlozba.csv", csvRedak, { flag: "w" }, (greska) => {
      if (greska) console.error("Greska zapisivanja JSON u CSV");
    });
  };

  prebaciCSVuJSON = function (csvObj) {
    let csvRedak = csvObj.split("\n");
    let jsonZapis = "";
    if (csvRedak.length > 1) {
      jsonZapis += "[";
    }
    for (let index in csvRedak) {
      let csvStupac = csvRedak[index].split("#");
      if (csvStupac[0]) {
        let jsonRedak =
          '{"Model":"' +
          csvStupac[0] +
          '","Godina":"' +
          csvStupac[1] +
          '","Motor":"' +
          csvStupac[2] +
          '","Boja":"' +
          csvStupac[3] +
          '","Cijena":"' +
          csvStupac[4] +
          '"}';
        if (index == 0) {
          jsonZapis += jsonRedak;
        } else {
          jsonZapis += "," + jsonRedak;
        }
      }
    }
    if (csvRedak.length > 1) {
      jsonZapis += "]";
    }

    return JSON.parse(jsonZapis);
  };

  prebaciJSONuCSV = function (jsonObj) {
    let csvRedak = "";
    csvRedak += jsonObj.Model + ",";
    csvRedak += jsonObj.Godina + ",";
    csvRedak += jsonObj.Motor + ",";
    csvRedak += jsonObj.Boja + ",";
    csvRedak += jsonObj.Cijena + "\n";

    return csvRedak;
  };
}

module.exports = Parser;
