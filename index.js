// import { parse } from "csv-parse";
const fs = require("fs");

let keplerData = [];

fs.createReadStream("kepler_data.csv")
  .on("data", (data) => {
    keplerData.push(data);
  })
  .on("err", (err) => {
    console.error(err);
  })
  .on("end", () => {
    console.log(keplerData);
  });

// const parser = parse({
//     delimiter: ':'
//   });
