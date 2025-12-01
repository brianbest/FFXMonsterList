import { test, describe, it } from 'node:test';
import assert from 'node:assert';
import { BattleConstants } from '../src/battle/BattleConstants.js';

describe('BattleConstants', () => {
    describe('getTickSpeed', () => {
        it('should return correct tick speed for various agility values', () => {
            // Table 1 checks
            assert.strictEqual(BattleConstants.getTickSpeed(10), 20); // <= 16
            assert.strictEqual(BattleConstants.getTickSpeed(16), 20); // Boundary
            
            assert.strictEqual(BattleConstants.getTickSpeed(17), 11); // 17-34
            assert.strictEqual(BattleConstants.getTickSpeed(34), 11);
            
            assert.strictEqual(BattleConstants.getTickSpeed(35), 7); // 35-43
            
            assert.strictEqual(BattleConstants.getTickSpeed(44), 6); // 44-61
            
            assert.strictEqual(BattleConstants.getTickSpeed(62), 5); // 62-97
            
            assert.strictEqual(BattleConstants.getTickSpeed(98), 4); // 98-169
            
            assert.strictEqual(BattleConstants.getTickSpeed(170), 3); // 170-255
            assert.strictEqual(BattleConstants.getTickSpeed(255), 3);
            
            assert.strictEqual(BattleConstants.getTickSpeed(999), 3); // Cap check
        });
    });

    describe('ActionRank', () => {
        it('should have correct rank values', () => {
            assert.strictEqual(BattleConstants.ActionRank.QUICK_HIT, 1);
            assert.strictEqual(BattleConstants.ActionRank.ITEM, 2);
            assert.strictEqual(BattleConstants.ActionRank.ATTACK, 3);
            assert.strictEqual(BattleConstants.ActionRank.MAGIC, 3);
            assert.strictEqual(BattleConstants.ActionRank.SKILL, 4);
            assert.strictEqual(BattleConstants.ActionRank.OVERDRIVE, 6);
        });
    });
});

