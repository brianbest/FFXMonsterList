import { test, describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { BattleSystem } from '../src/battle/BattleSystem.js';
import { BattleUnit } from '../src/battle/BattleUnit.js';
import { BattleConstants } from '../src/battle/BattleConstants.js';

describe('BattleSystem', () => {
    let battle;
    let p1, p2, e1;

    beforeEach(() => {
        battle = new BattleSystem();
        
        // Player 1: Fast (Agility 50 -> TS 6)
        p1 = new BattleUnit({ 
            name: 'P1', 
            isPlayer: true, 
            partyIndex: 0,
            stats: { agility: 50, hp: 100 }
        });

        // Player 2: Slow (Agility 20 -> TS 11)
        p2 = new BattleUnit({ 
            name: 'P2', 
            isPlayer: true, 
            partyIndex: 1,
            stats: { agility: 20, hp: 100 }
        });

        // Enemy 1: Mid (Agility 40 -> TS 7)
        e1 = new BattleUnit({ 
            name: 'E1', 
            isPlayer: false, 
            partyIndex: 0,
            stats: { agility: 40, hp: 100 }
        });

        battle.addUnit(p1);
        battle.addUnit(p2);
        battle.addUnit(e1);
    });

    it('should initialize battle and set active unit', () => {
        battle.initializeBattle();
        // initializeBattle calls processNextTurn, so counters are decremented.
        // At least one unit should be at or below 0.
        const activeUnits = battle.units.filter(u => u.currentCounter <= 0);
        assert.ok(activeUnits.length > 0, 'At least one unit should be active');
        assert.ok(battle.activeUnit, 'Should have an active unit after init');
    });

    it('should decrement global ticks correctly', () => {
        // Manually set counters to predictable values
        p1.currentCounter = 10;
        p2.currentCounter = 20;
        e1.currentCounter = 15;

        // Force process
        battle.processNextTurn();

        // Min was 10 (P1). Subtract 10 from all.
        // P1: 0 (Active)
        // P2: 10
        // E1: 5
        
        assert.strictEqual(p1.currentCounter, 0);
        assert.strictEqual(p2.currentCounter, 10);
        assert.strictEqual(e1.currentCounter, 5);
        assert.strictEqual(battle.activeUnit, p1);
    });

    it('should resolve ties in favor of player then index', () => {
        p1.currentCounter = 10;
        e1.currentCounter = 10; // Tie
        p2.currentCounter = 20;

        battle.processNextTurn();

        // P1 should win over E1 because isPlayer = true
        assert.strictEqual(battle.activeUnit, p1);
    });

    it('should update predictive timeline', () => {
        battle.initializeBattle();
        assert.ok(battle.turnOrder.length > 0, 'Timeline should be populated');
        assert.strictEqual(battle.turnOrder.length, 10, 'Should predict 10 turns');
    });

    it('should handle unit death', () => {
        p1.stats.hp = 0; // P1 is dead
        p2.currentCounter = 20;
        e1.currentCounter = 10;

        battle.processNextTurn();

        // Should ignore P1, pick E1 (10 < 20)
        assert.strictEqual(battle.activeUnit, e1);
    });
    
    it('should detect win condition', () => {
        e1.stats.hp = 0;
        const result = battle.checkBattleEnd();
        assert.strictEqual(result, true);
        assert.strictEqual(battle.state, 'WIN');
    });

    it('should detect loss condition', () => {
        p1.stats.hp = 0;
        p2.stats.hp = 0;
        const result = battle.checkBattleEnd();
        assert.strictEqual(result, true);
        assert.strictEqual(battle.state, 'LOSE');
    });
});

