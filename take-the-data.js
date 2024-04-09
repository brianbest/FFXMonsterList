let $ = jQuery

function scrapeMonsterData() {
    // 1. Extract Data
    const name = $('h2').first().text().trim();
    const hp = parseInt(extractHPValue());
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

    if (!typeId) {
        console.error('Type not found in description!');
        typeId = 0; 
    }

    // 3. Construct SQL Statement (same as before)
    const sqlInsert = `INSERT INTO monsters (name, type_id, hp, image_url, arena_location) 
                       VALUES ('${name}', ${typeId}, ${hp}, '${imageUrl}', '${arenaLocation}');`;

    // 4. Output the SQL
    console.log(sqlInsert);
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

function extractHPValue() {
    let $pTag = $('p strong:contains("HP:")').first().parent(); 
    let originalText = $pTag.text(); 
    let newText = originalText.replace("HP:", "");
    return newText.trim(); 
}

// Execute the function (only if jQuery is loaded)
if (window.$) {
    scrapeMonsterData(); 
} else {
    console.error('jQuery not loaded!'); 
    var jq = document.createElement('script');
    jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    setTimeout(()=>{
        $ = jQuery;
        scrapeMonsterData();
    }, 1000);
}
