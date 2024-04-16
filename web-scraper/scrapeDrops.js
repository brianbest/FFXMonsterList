async function scrapeDrops($) {
    return await fetchItems($);
}

async function fetchItems($) {
    console.log("Fetching items...");
    try {
        // Parse "Steal" items
        const stealItems = [];
        $('strong:contains("Steal:")').next('br').next('small').find('a').each((i, elem) => {
            const text = $(elem).parent().text();
            const countMatch = text.match(/\(x(\d+)\)/);
            const count = countMatch ? parseInt(countMatch[1], 10) : 1;
            const rarity = text.includes('common') ? 'common' : (text.includes('rare') ? 'rare' : 'common');

            const item = {
                name: $(elem).text().trim(),
                count: count,
                rarity: rarity
            };
            stealItems.push(item);
        });

        // Parse "Drops" items
        const dropItems = [];
        $('strong:contains("Drops:")').next('br').next('small').find('a').each((i, elem) => {
            const text = $(elem).parent().text();
            const countMatch = text.match(/\(x(\d+)\)/);
            const count = countMatch ? parseInt(countMatch[1], 10) : 1;
            const rarity = text.includes('common') ? 'common' : (text.includes('rare') ? 'rare' : 'common');

            const item = {
                name: $(elem).text().trim(),
                count: count,
                rarity: rarity
            };
            dropItems.push(item);
        });
        return { stealItems, dropItems };
    } catch (error) {
        console.error('Error fetching item data:', error);
        return { stealItems: [], dropItems: [] };
    }
}




module.exports = scrapeDrops;