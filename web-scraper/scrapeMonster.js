async function scrapeMonsterData($) {
    // 1. Extract Data
    const name = $('h2').text().trim(); // Get the full text with jQuery
    const nameParts = name.split('Fiend Listing'); // Split into parts based on line break
    const monsterName = nameParts[0].trim(); 
    const hp = extractHPValue($);
    const imageUrl = $('#page-top > div.container.main-body > div > div.col-12.col-lg-8.col-xl-9 > div.screenshot-image.mx-auto.d-block > div > a > img').attr('src');
    const arenaLocation = $('p:contains("Monster Arena") a:nth-child(2)').text().trim();
    // 2. Determine type_id 
    const descriptionText = $('p:not(:has(table))').text();
    const monsterType = determineMonsterType(descriptionText);
    if (monsterType) {
        typeId = fetchTypeIdFromDatabase(monsterType);
    } else {
        console.warn('Type not found in description!');
        typeId = 15; 
    }

    // if hp is 0 alert the user the location and name of the monster
    if (hp === 0) {
        console.log(`Monster ${monsterName} at location ${location} has 0 HP`);
    }


    if (!typeId) {
        typeId = 15; // 15 is unknown, which is valid for this  
    }

    return {
        insertSql: buildMonsterInsertStatement(monsterName, typeId, hp, imageUrl, arenaLocation, fetchLocationIdFromDatabase(arenaLocation)),
        monsterName,
        typeId,
        hp,
        imageUrl,
        arenaLocation
    };
}

function buildMonsterInsertStatement(monsterName, typeId, hp, imageUrl, arenaLocation, locationId) {
    return `INSERT INTO monsters (name, type_id, hp, image_url, arena_location, location_id) 
            VALUES ('${monsterName}', ${typeId}, ${hp}, '${imageUrl}', '${arenaLocation}', ${locationId});`;

}

function determineMonsterType(descriptionText) {
    const possibleTypes = ['Wolf','Lupine', 'Reptile', 'Bird', 'Wasp', 'Imp', 'Bat', 'Flan', 'Element', 'Armored', 'Helm', 'Fungii', 'Bomb', 'Ruminant', 'Giant'];
    for (const monsterType of possibleTypes) {
        const pattern = new RegExp(`\\b${monsterType}-type\\b`, 'i');
        if (pattern.test(descriptionText)) {
            return monsterType;
        }
    }
    return null;

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
        'Helm': 10,
        'Fungii': 11,
        'Bomb': 12,
        'Ruminant': 13,
        'Giant': 14,
        'Unknown': 15
    };

    return typeMap[monsterType];
}

function extractHPValue($) {
    const originalText = $('p strong:contains("HP:")').first().parent().text();
    const hpValue = originalText.replace(/HP:|,/g, '').trim(); // Remove "HP:" and commas globally
    return hpValue ? parseInt(hpValue) : 0; // Parse and return the integer or 0 if empty
}

function fetchLocationIdFromDatabase(location) {
    const locationMap = {
        'Besaid': 1,
        'Kilika': 2,
        'Mi’ihen Highroad': 3,
        'Mushroom Rock Road': 4,
        'Djose Road': 5,
        'Thunder Plains': 6,
        'Macalania': 7,
        'Bikanel': 8,
        'Calm Lands': 9,
        'Stolen Fayth Cavern': 10,
        'Mt. Gagazet': 11,
        'Omega Ruins': 12,
        'Inside Sin': 13,
        'Arena Conquest': 14,
        'Species Conquest': 15,
        'Original': 16,
    };
    //search url for location string. ignore any single quotes periods or spaces
    return locationMap[location];

}


module.exports = scrapeMonsterData;