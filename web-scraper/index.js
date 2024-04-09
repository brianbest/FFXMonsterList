const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql2/promise');
const scrapeMonsterData = require('./scrapeMonster');
const scrapeDrops = require('./scrapeDrops');


const targetUrl = 'https://jegged.com/Games/Final-Fantasy-X/Monster-Arena/Besaid/Dingo.html';


async function scrapeData(monsterUrl, location) {
    const { data } = await axios.get(monsterUrl);
    const $ = cheerio.load(data);
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password1234',
        database: 'ffx-prod',
    });
    try {
        //const discard = await trucateTables(connection);
        const monsterResults = await scrapeMonsterData($, location, connection);
        if (monsterResults === undefined) {
            return;
        }
        const monsterId = monsterResults[0].insertId;

        const [itemResults, itemFeilds] = await connection.query('SELECT name FROM items');
        
        // transform the results into an array of strings using the name property
        const existingItemNames = itemResults.map(item => item.name);

        scrapeDrops(monsterId, $, connection, existingItemNames).forEach(async (sqlStatement) => {
            console.log(sqlStatement);
            await connection.query(sqlStatement);
        });
    }
    catch (error) {
        console.error(error);
    }

}


// Get location links from list
const locationIndexUrl = 'https://jegged.com/Games/Final-Fantasy-X/Monster-Arena/';
(async () => {
    try {
        const locationLinks = [];
        const response = await axios.get(locationIndexUrl);
        const $ = cheerio.load(response.data);
        $('#page-top > div.container.main-body > div > div.col-12.col-lg-8.col-xl-9 > div:nth-child(20) a').each((i, elem) => {
            locationLinks.push(elem.attribs.href.slice(0, -1));
        });
        console.log(locationLinks);

        // Sequentially scrape each location link
        for (const locationLink of locationLinks) {
            let linkURL = `https://jegged.com/Games/Final-Fantasy-X/Monster-Arena/${locationLink}/`;
            const { data } = await axios.get(linkURL);
            const $ = cheerio.load(data);
            const monsterLinks = [];
            $('#page-top > div.container.main-body > div > div.col-12.col-lg-8.col-xl-9 > div.list-group.side-list.mx-auto.d-block a').each((i, elem) => {
                monsterLinks.push(elem.attribs.href);
            });

            // Sequentially scrape each monster data
            for (const monsterLink of monsterLinks) {
                const monsterURL = `https://jegged.com/Games/Final-Fantasy-X/Monster-Arena/${locationLink}/${monsterLink}`;
                await scrapeData(monsterURL, locationLink); // Make sure scrapeData is an async function
            }
        }
    } catch (error) {
        console.error('Error during scraping:', error);
    }
})();




//scrapeData(); 