const fs = require("fs");
const { parse } = require("csv-parse");

let keplerData = [];
let habitablePlanets = [];

// Import Raw data from csv then parse to json
fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    keplerData.push(data);

    if (isHabitablePlanets(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("err", (err) => {
    console.error(err);
  })
  .on("end", () => {
    console.log(
      `found all ${keplerData.length.toLocaleString("th-TH")} planets`
    );
    console.log(
      `found ${habitablePlanets.length.toLocaleString(
        "th-TH"
      )} habitable planets`
    );

    {
      habitablePlanets.length > 1 && console.log("-------------------------");
    }

    habitablePlanets.map((planet, idx) => {
      return console.log(`${idx + 1}. ${planet["kepler_name"]}`);
    });
  });

function isHabitablePlanets(planet) {
  // map data by key
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
