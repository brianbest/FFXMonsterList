import { BattleConstants } from './BattleConstants.js';

export class BattleUnit {
    constructor(config) {
        this.name = config.name;
        this.isPlayer = config.isPlayer;
        this.stats = {
            hp: config.hp || 100,
            maxHp: config.hp || 100,
            mp: config.mp || 20,
            maxMp: config.mp || 20,
            agility: config.agility || 10,
            ...config.stats
        };
        
        // Visual properties
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.color = config.color || '#fff';
        this.svgPath = config.svgPath; // Path2D data or simple shape type
        this.scale = config.scale || 1;

        // CTB State
        this.tickSpeed = BattleConstants.getTickSpeed(this.stats.agility);
        this.currentCounter = 0; // Will be initialized by BattleSystem
        this.partyIndex = config.partyIndex || 0; // 0, 1, 2 for players; 0, 1 for enemies
        
        // Status Effects
        this.statuses = []; // Objects like { name: 'Haste', duration: 3 }
    }

    updateTickSpeed() {
        this.tickSpeed = BattleConstants.getTickSpeed(this.stats.agility);
    }

    // Spec Part 3.1: Haste/Slow Logic
    // Returns the calculated recovery ticks for a given action rank
    calculateRecovery(rank) {
        let recovery = this.tickSpeed * rank;
        
        // Apply status modifiers
        if (this.hasStatus('Haste')) {
            recovery = Math.floor(recovery / 2);
        }
        if (this.hasStatus('Slow')) {
            recovery = recovery * 2;
        }

        return Math.max(1, recovery);
    }

    hasStatus(name) {
        return this.statuses.some(s => s.name === name);
    }

    takeTurn(actionRank) {
        const recovery = this.calculateRecovery(actionRank);
        this.currentCounter += recovery;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scale, this.scale);

        if (this.svgPath) {
            ctx.fillStyle = this.color;
            ctx.fill(new Path2D(this.svgPath));
        } else {
            // Fallback circle
            ctx.beginPath();
            ctx.arc(0, 0, 20, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // Draw HP bar
        ctx.fillStyle = '#333';
        ctx.fillRect(-20, -40, 40, 5);
        ctx.fillStyle = '#0f0';
        ctx.fillRect(-20, -40, 40 * (this.stats.hp / this.stats.maxHp), 5);

        // Name
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, 0, 30);

        ctx.restore();
    }
}

