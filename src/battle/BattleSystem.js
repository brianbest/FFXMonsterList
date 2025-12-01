import { BattleConstants } from './BattleConstants.js';
import { BattleUnit } from './BattleUnit.js';

export class BattleSystem {
    constructor(config = {}) {
        this.units = [];
        this.turnOrder = []; // Predictive list
        this.state = 'INIT'; // INIT, WAITING_FOR_INPUT, EXECUTING, WIN, LOSE
        this.activeUnit = null;
        this.inputCallback = null; // Function to call when input is needed
        this.onBattleEnd = config.onBattleEnd || null;
    }

    addUnit(unit) {
        this.units.push(unit);
    }

    // Spec Part 4.1: Initial Counter Value
    initializeBattle() {
        this.units.forEach(unit => {
            // ICV approx Tick Speed * 3 + Random Variance
            const variance = Math.floor(Math.random() * 4); // 0-3
            unit.currentCounter = (unit.tickSpeed * 3) + variance;
        });

        // Initial sort to determine who acts first conceptually, 
        // though processNextTurn handles the actual tick decrement.
        this.processNextTurn();
    }

    // Spec Part 2.3: The Global Tick Decrement Loop
    processNextTurn() {
        // 1. Find Min Counter
        const livingUnits = this.units.filter(u => u.stats.hp > 0);
        if (livingUnits.length === 0) return; // Should not happen in normal play

        let minTicks = Infinity;
        livingUnits.forEach(u => {
            if (u.currentCounter < minTicks) {
                minTicks = u.currentCounter;
            }
        });

        // 2. Decrement All
        this.units.forEach(u => {
            if (u.stats.hp > 0) {
                u.currentCounter -= minTicks;
            }
        });

        // 3. Find Active Unit (Tie-Breaker Logic)
        // Spec Part 4.2: Priority Cascade
        // Counter Value (most negative) > Player > Party Index
        const candidates = livingUnits.filter(u => u.currentCounter <= 0);
        
        candidates.sort((a, b) => {
            if (a.currentCounter !== b.currentCounter) {
                return a.currentCounter - b.currentCounter; // Lower (more negative) is better
            }
            if (a.isPlayer !== b.isPlayer) {
                return a.isPlayer ? -1 : 1; // Player first
            }
            return a.partyIndex - b.partyIndex; // Lower index first
        });

        this.activeUnit = candidates[0];
        
        // Update the predictive timeline
        this.updatePredictiveTimeline();

        this.state = 'WAITING_FOR_INPUT';
        
        // If it's an enemy, we can auto-act (AI)
        if (!this.activeUnit.isPlayer) {
            setTimeout(() => this.executeEnemyTurn(), 500); // Small delay for feel
        }
    }

    executeAction(actionRank, targetUnit) {
        if (this.state !== 'WAITING_FOR_INPUT') return;

        this.state = 'EXECUTING';

        // Perform Action Logic (Damage, etc.)
        // Simple placeholder damage logic
        if (targetUnit) {
            // Basic damage formula
            const damage = Math.max(1, this.activeUnit.stats.attack || 10 - (targetUnit.stats.defense || 0));
            targetUnit.stats.hp = Math.max(0, targetUnit.stats.hp - damage);
            console.log(`${this.activeUnit.name} attacks ${targetUnit.name} for ${damage} damage!`);
        }

        // Apply CTB Recovery
        // Spec Part 2.2: Recovery Counter = Tick Speed * Action Rank
        this.activeUnit.takeTurn(actionRank);

        // Check Win/Loss
        if (this.checkBattleEnd()) {
            return;
        }

        // Loop again
        this.processNextTurn();
    }

    executeEnemyTurn() {
        // Simple AI: Attack random living player
        const players = this.units.filter(u => u.isPlayer && u.stats.hp > 0);
        if (players.length > 0) {
            const target = players[Math.floor(Math.random() * players.length)];
            this.executeAction(BattleConstants.ActionRank.ATTACK, target);
        } else {
            // No targets? Skip turn (defend)
            this.executeAction(BattleConstants.ActionRank.DEFEND, null);
        }
    }

    checkBattleEnd() {
        const livingPlayers = this.units.filter(u => u.isPlayer && u.stats.hp > 0);
        const livingEnemies = this.units.filter(u => !u.isPlayer && u.stats.hp > 0);

        if (livingPlayers.length === 0) {
            this.state = 'LOSE';
            console.log("Game Over");
            if (this.onBattleEnd) this.onBattleEnd(false);
            return true;
        }
        if (livingEnemies.length === 0) {
            this.state = 'WIN';
            console.log("Victory!");
            if (this.onBattleEnd) this.onBattleEnd(true);
            return true;
        }
        return false;
    }

    // Spec Part 6.2: The Prediction Algorithm
    updatePredictiveTimeline() {
        const predictionDepth = 10;
        this.turnOrder = [];
        
        // Deep Copy Simulation
        // We only need Counter, TickSpeed, Statuses, and Identity
        const simUnits = this.units.map(u => ({
            originalUnit: u,
            currentCounter: u.currentCounter,
            tickSpeed: u.tickSpeed,
            isPlayer: u.isPlayer,
            partyIndex: u.partyIndex,
            hp: u.stats.hp,
            statuses: [...u.statuses], // Shallow copy of status array
            // Helper to mimic class method
            calculateRecovery: function(rank) {
                 let recovery = this.tickSpeed * rank;
                 if (this.statuses.some(s => s.name === 'Haste')) recovery = Math.floor(recovery / 2);
                 if (this.statuses.some(s => s.name === 'Slow')) recovery = recovery * 2;
                 return Math.max(1, recovery);
            }
        })).filter(u => u.hp > 0);

        // Simulation Loop
        while (this.turnOrder.length < predictionDepth) {
            // 1. Find min
            let minTicks = Infinity;
            simUnits.forEach(u => {
                if (u.currentCounter < minTicks) minTicks = u.currentCounter;
            });

            // 2. Decrement
            simUnits.forEach(u => {
                u.currentCounter -= minTicks;
            });

            // 3. Find Active (Tie Breaker)
            const candidates = simUnits.filter(u => u.currentCounter <= 0);
            candidates.sort((a, b) => {
                if (a.currentCounter !== b.currentCounter) return a.currentCounter - b.currentCounter;
                if (a.isPlayer !== b.isPlayer) return a.isPlayer ? -1 : 1;
                return a.partyIndex - b.partyIndex;
            });

            const winner = candidates[0];

            // Add to list
            this.turnOrder.push(winner.originalUnit);

            // "Act" - Assume Rank 3 (Attack) as baseline
            // Spec says: "Assume when a clone takes a turn, they use a standard Rank 3 action"
            const recovery = winner.calculateRecovery(BattleConstants.ActionRank.ATTACK);
            winner.currentCounter += recovery;
        }
    }
}

