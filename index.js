import fs from "fs";
import data from "./src/MonsterData.js";
import Location from "./src/Location.js";

const reformatedDataArray = [];
data.forEach(([name, monsters]) => {
  reformatedDataArray.push(new Location(name, monsters).toObject());
});

fs.writeFile('./src/MonsterData.js', JSON.stringify(reformatedDataArray), function (err) {
  if (err) return console.log(err);
  console.log('Its done boss');
});
