function scrapeDrops(monsterId, $, connection, existingItemNames) {
    const [stealItems, dropItems] = extractItems($);
    // log the count of steal and drop items
    console.log(`Steal Items: ${stealItems.length}`);
    console.log(`Drop Items: ${dropItems.length}`);

    // Step 3: Generating SQL Statements
    const importStatements = [
        ...generateItemInserts(stealItems, dropItems, existingItemNames), // Combine for item table
        ...generateMonsterItemInserts(monsterId, stealItems, 'steal'),
        ...generateMonsterItemInserts(monsterId, dropItems, 'drop')
    ];

    return importStatements;
}

function extractItems($) {
    let steals = [];
    let drops = [];

    // Function to extract items and their rarity, correctly targeting the sibling text node for rarity
    function extractItemsAndRarity() {
        function collectRarities() {
            const rarities = [];
            const rarityPattern = /\(([^)]+)\)/g;
            const text = $('#page-top > div.container.main-body > div > div.col-12.col-lg-8.col-xl-9 > p:nth-child(9)').text(); // Get all text within the body
            let match;
            while ((match = rarityPattern.exec(text)) !== null) {
                rarities.push(match[1]); // match[1] contains the captured rarity
            }
            return rarities;
        }

        const rarities = collectRarities();
        let rarityIndex = 0; // To keep track of which rarity to assign

        $('strong').each(function () {
            let headerText = $(this).text();
            if (headerText === 'Steal:' || headerText === 'Drops:') {
                $(this).nextAll('small').first().find('a').each(function () {
                    let item = $(this).find('strong').text();
                    // Assign rarity from the collected rarities based on index
                    let rarity = rarities[rarityIndex++];

                    if (headerText === 'Steal:') {
                        steals.push({ item, rarity });
                    } else {
                        drops.push({ item, rarity });
                    }
                });
            }
        });
    }

    // Extract items and their rarities
    extractItemsAndRarity();

    console.log("Steals:", steals);
    console.log("Drops:", drops);
    return [steals, drops];
}

function generateItemInserts(uniqueStealItems, dropItems, existingItemNames) {
    let items = [...uniqueStealItems, ...dropItems];

    // filter out duplicates
    items = items.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t.item === item.item
        ))
    );

    // Filter out items that already exist in the database
    const filteredItems = items.filter(item => !existingItemNames.includes(item.item));

    return filteredItems.map(item =>
        `INSERT INTO items (name, description) VALUES ('${item.item}', 'Description from ${item.rarity}');`
    );
}

function generateMonsterItemInserts(monsterId, items, type) {
    return items.map(item =>
        `INSERT INTO monster_item_${type === 'steal' ? 'steals' : 'drops'} 
         (monster_id, item_id, ${type === 'steal' ? 'steal_rarity' : 'drop_rate'}) 
       VALUES 
         (${monsterId}, (SELECT id FROM items WHERE name = '${item.item}'), '${item.rarity || ""}');`
    );
}



module.exports = scrapeDrops;