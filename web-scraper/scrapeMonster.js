async function scrapeMonsterData($, location, connection) {
    // 1. Extract Data
    const name = $('h2').text().trim(); // Get the full text with jQuery
    const nameParts = name.split('Fiend Listing'); // Split into parts based on line break
    const monsterName = nameParts[0].trim(); 
    const hp = parseInt(extractHPValue($));
    const imageUrl = $('img.img-fluid').attr('src');
    const arenaLocation = $('p:contains("Monster Arena") a:nth-child(2)').text().trim();
    // 2. Determine type_id 
    const possibleTypes = ['Wolf','Lupine', 'Reptile', 'Bird', 'Wasp', 'Imp', 'Bat', 'Flan', 'Element', 'Armored', 'Helm', 'Fungii', 'Bomb', 'Ruminant', 'Giant'];
    const descriptionText = $('p:not(:has(table))').text();
    let typeId = null;

    for (const monsterType of possibleTypes) {
        const pattern = new RegExp(`\\b${monsterType}-type\\b`, 'i');
        if (pattern.test(descriptionText)) {
            typeId = fetchTypeIdFromDatabase(monsterType); 
            break; 
        }
    }

    locationId = fetchLocationIdFromDatabase(location);

    // check to see if monster already exists in the database
    


    if (!typeId) {
        console.error('Type not found in description!');
        typeId = 0; 
    }



    // 3. Construct SQL Statement (same as before)
    const sqlInsert = `INSERT INTO monsters (name, type_id, hp, image_url, arena_location) 
                       VALUES ('${monsterName}', ${typeId}, ${hp}, '${imageUrl}', '${arenaLocation}');`;

    // 4. Output the SQL

    return await connection.query(sqlInsert);
}


function fetchTypeIdFromDatabase(monsterType) {
    const typeMap = {
        'Wolf': 1,
        'Lupine': 1,
        'Reptile': 2,
        'Bird': 3,
        'Wasp': 4,
        'Imp': 5,
        'Bat': 6,
        'Flan': 7,
        'Element': 8,
        'Armored': 9,
        'Helm': 9,
        'Fungii': 10,
        'Bomb': 11,
        'Ruminant': 12,
        'Giant': 13
    };

    return typeMap[monsterType];
}

function fetchLocationIdFromDatabase(location) {
    const locationMap = {
        'Besaid': 1,
        'Kilika': 2,
        'Mi\'ihen Highroad': 3,
        'Mushroom Rock Road': 4,
        'Djose Highroad': 5,
        'Thunder Plains': 6,
        'Macalania Woods': 7,
        'Bikanel': 8,
        'Calm Lands': 9,
        'Stolen Fayth Cavern': 10,
        'Mt. Gagazet': 11,
        'Omega Ruins': 12,
        'Inside Sin': 13
    };

    return locationMap[location];

}

function extractHPValue($) {
    let $pTag = $('p strong:contains("HP:")').first().parent(); 
    let originalText = $pTag.text(); 
    let newText = originalText.replace("HP:", "");
    return newText.trim(); 
}


module.exports = scrapeMonsterData;