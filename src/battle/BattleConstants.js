export const BattleConstants = {
    // Agility to Tick Speed Conversion (Table 1 from spec)
    getTickSpeed: (agility) => {
        // 0-16: 12-28 (Lethargic). Let's just return a high value.
        if (agility <= 16) return 20; 
        if (agility <= 34) return 11;
        if (agility <= 43) return 7;
        if (agility <= 61) return 6;
        if (agility <= 97) return 5;
        if (agility <= 169) return 4;
        if (agility <= 255) return 3;
        return 3; // Cap
    },

    // Action Ranks (Table 2 from spec)
    ActionRank: {
        SWITCH: 1,
        QUICK_HIT: 1,
        ITEM: 2,
        DEFEND: 2,
        ATTACK: 3,
        MAGIC: 3,
        SKILL: 4,
        OVERDRIVE: 6 // range 4-8
    }
};

