const readline = require('readline');
const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql2/promise');



// Function to fetch HTML and parse items
async function fetchAndParseItems(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const items = [];

    // Select all item cards
    $('.card.item-card').each((index, element) => {
      const name = $(element).find('.card-header h6').text().trim();
      const description = $(element).find('dt:contains("Description:") + dd').text().trim();
      const effect = $(element).find('dt:contains("Effect:") + dd').text().trim();

      items.push({
        name: name,
        description: description,
        effect: effect
      });
    });

    return items;
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    return [];
  }
}

(async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password1234',
        database: 'ffx-prod',
    });
// URL of the page to parse (this should be the URL where the HTML is accessible)
    const itemsLinks = [
        {type: "Restorative", typeId:1, url: "https://jegged.com/Games/Final-Fantasy-X/Items/Restorative.html"},
        {type: "Distillers",typeId:2, url: "https://jegged.com/Games/Final-Fantasy-X/Items/Distillers.html"},
        {type: "Use Items",typeId:3, url: "https://jegged.com/Games/Final-Fantasy-X/Items/Use-Items.html"},
        {type: "Spheres",typeId:4, url: "https://jegged.com/Games/Final-Fantasy-X/Items/Spheres.html"},
        {type: "Miscellaneous",typeId:5, url: "https://jegged.com/Games/Final-Fantasy-X/Items/Miscellaneous.html"},
        {type: "Key Items",typeId:6, url: "https://jegged.com/Games/Final-Fantasy-X/Items/Key-Items.html"}
    ];



    // Fetch and parse items
    itemsLinks.forEach(itemLink => {
    fetchAndParseItems(itemLink.url).then(items => {
        console.log(`Items of type ${itemLink.type}:`, items);
        // Insert items into database
        items.forEach(item => {
            connection.query(`INSERT INTO items (name, type, description, effect) VALUES ('${item.name}','${itemLink.typeId}', '${item.description}', '${item.effect}');`);
        });
    });
    });

})();



// Example usage
// fetchAndParseItems(url).then(items => {
//   console.log(items);
// });
