import express from 'express';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

function loadMonsters() {
  const files = fs.readdirSync('../location-monster-data');
  const monsters = [];
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(`../location-monster-data/${file}`));
    for (const fiend of data.fiends) {
      monsters.push({
        ...fiend,
        location: data.name
      });
    }
  }
  return monsters;
}

const monsterData = loadMonsters();

app.get('/monsters', (req, res) => {
  res.json(monsterData);
});

app.get('/locations', (req, res) => {
  const locations = [...new Set(monsterData.map(m => m.location))];
  res.json(locations);
});

app.listen(port, () => {
  console.log(`API ready on port ${port}`);
});
