const readline = require('readline');
const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql2/promise');
const scrapeMonsterData = require('./scrapeMonster');
const scrapeDrops = require('./scrapeDrops');

// Get location links from list
const locationIndexUrl = 'https://jegged.com/Games/Final-Fantasy-X/Monster-Arena/';
(async () => {
    try {
        const locationLinks = await getLocationLinks(locationIndexUrl);

        // Sequentially scrape each location link
        for (const locationLink of locationLinks) {
            const locationMonsterLinks = await getMonsterLinks(locationLink);
            //Sequentially scrape each monster data
            for (const monsterLink of locationMonsterLinks) {
                await scrapeData(monsterLink); // Make sure scrapeData is an async function
            }
            // Prompt the user to review the scraped data
            const userResponse = await askQuestion(`Does the data look good in the database? https://jegged.com/Games/Final-Fantasy-X/Monster-Arena/${locationLink} (y/n): `);
            if (userResponse.toLowerCase() === 'n') {
                console.log('Scraping discontinued. Exiting...');
                process.exit(); // Exit the program
            }
            // If user presses 'y', the function will simply continue to the next iteration.
        }

        // DEBUG get the first location and scrape the first monster
        // const locationLink = locationLinks[0];
        // const locationMonsterLinks = await getMonsterLinks(locationLink);
        // const monsterLink = locationMonsterLinks[0];
        // await scrapeData(monsterLink);

        // DEBUG get the first location and scrape the monsters in location
        // const locationLink = locationLinks[0];
        // const locationMonsterLinks = await getMonsterLinks(locationLink);
        // for (const monsterLink of locationMonsterLinks) {
        //     await scrapeData(monsterLink);
        // }


    } catch (error) {
        console.error('Error during scraping:', error);
    }
})();

async function getLocationLinks(rootUrl) {
    const locationLinks = [];
    const response = await axios.get(rootUrl);
    const $ = await cheerio.load(response.data);
    $('#page-top > div > div > div.col-12.col-lg-8.col-xl-9 > div:nth-child(21) a.list-group-item.side-list-group-item').each((i, elem) => {
        locationLinks.push(rootUrl + elem.attribs.href.slice(0, -1));
    });
    return locationLinks;
}

async function getMonsterLinks(locationUrl) {
    const monsterLinks = [];
    const response = await axios.get(locationUrl);
    const $ = await cheerio.load(response.data);
    $('#page-top > div.container.main-body > div > div.col-12.col-lg-8.col-xl-9 > div.list-group.side-list.mx-auto.d-block > a').each((i, elem) => {
        monsterLinks.push(locationUrl + '/' + elem.attribs.href);
    });
    return monsterLinks;
}


async function scrapeData(monsterUrl, locationId) {
    const { data } = await axios.get(monsterUrl);
    const $ = cheerio.load(data);
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password1234',
        database: 'ffx-prod',
    });
    try {
        const scrapedMonsterData = await scrapeMonsterData($, locationId, connection);


        const monsterEntry = await connection.query(scrapedMonsterData.insertSql);
        if (monsterEntry === undefined) {
            return;
        }
        const monsterId = monsterEntry[0].insertId;


        const {stealItems, dropItems} = await scrapeDrops($);
        console.log(stealItems);
        // for each item type, find the item in the database and link it to the monster
        await processItems(stealItems, 'steal', connection, monsterId);
        await processItems(dropItems, 'drop', connection, monsterId);
    }
    catch (error) {
        console.error(error);
    }

}

// a function that will check the name of a given item for a match in the database, if it finds a match it will return the id of the item
async function fetchItemIdFromDatabase(itemName, connection) {
    const [results, fields] = await connection.query(`SELECT id FROM items WHERE name = '${itemName}'`);
    if (results.length === 0) {
        return null;
    }
    return results[0].id;
}

async function linkItemToMonster(monsterId, itemId, connection, type,count, rarity) {
    const table = type === 'steal' ? 'monster_item_steals' : 'monster_item_drops';
    const [results, fields] = await connection.query(`INSERT INTO ${table} (monster_id, item_id, count, rarity) VALUES (${monsterId}, ${itemId}, ${count}, '${rarity}')`);
    return results;

}

async function processItems(items, category, connection, monsterId) {
    for (const { name, count, rarity } of items) {
        const itemId = await fetchItemIdFromDatabase(name, connection);
        if (itemId === null) {
            console.warn(`Item ${name} not found in database`);
            continue;
        }
        await linkItemToMonster(monsterId, itemId, connection, category, count, rarity);
    }
}

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }));
}
