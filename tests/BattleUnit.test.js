import { test, describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { BattleUnit } from '../src/battle/BattleUnit.js';

describe('BattleUnit', () => {
    let unit;

    beforeEach(() => {
        unit = new BattleUnit({
            name: 'TestUnit',
            isPlayer: true,
            stats: { agility: 35 } // Tick Speed 7
        });
    });

    it('should initialize with correct tick speed', () => {
        assert.strictEqual(unit.tickSpeed, 7);
    });

    describe('calculateRecovery', () => {
        it('should calculate base recovery correctly', () => {
            // Rank 3 * Tick Speed 7 = 21
            const recovery = unit.calculateRecovery(3);
            assert.strictEqual(recovery, 21);
        });

        it('should handle Haste status', () => {
            unit.statuses.push({ name: 'Haste' });
            // floor(21 / 2) = 10
            const recovery = unit.calculateRecovery(3);
            assert.strictEqual(recovery, 10);
        });

        it('should handle Slow status', () => {
            unit.statuses.push({ name: 'Slow' });
            // 21 * 2 = 42
            const recovery = unit.calculateRecovery(3);
            assert.strictEqual(recovery, 42);
        });

        it('should ensure minimum recovery is 1', () => {
            unit.tickSpeed = 0; // Edge case
            const recovery = unit.calculateRecovery(1);
            assert.strictEqual(recovery, 1);
        });
    });

    describe('takeTurn', () => {
        it('should increase currentCounter', () => {
            unit.currentCounter = 0;
            unit.takeTurn(3); // Recovery 21
            assert.strictEqual(unit.currentCounter, 21);
        });
    });
});

