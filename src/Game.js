import { BattleSystem } from './battle/BattleSystem.js';
import { BattleUnit } from './battle/BattleUnit.js';
import { BattleConstants } from './battle/BattleConstants.js';
import { SVGIcons } from './assets.js';
import { ProgressionSystem } from './progression/ProgressionSystem.js';

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Initialize Progression System
        this.progression = new ProgressionSystem();
        this.initProgression();

        // Set initial dimensions
        this.resize();
        
        // Handle window resizing
        window.addEventListener('resize', () => this.resize());
        
        // Input handling
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        
        this.lastTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000 / 60; // 60 FPS

        this.initBattle();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    initProgression() {
        // Initialize characters with base stats and starting positions
        this.progression.initializeCharacter('fighter', {
            startNodeId: 100,
            baseStats: { hp: 300, mp: 10, attack: 40, defense: 10, agility: 20 }
        });

        this.progression.initializeCharacter('mage', {
            startNodeId: 200,
            baseStats: { hp: 150, mp: 50, attack: 10, defense: 5, agility: 15, magic: 30, magicDefense: 20 }
        });

        this.progression.initializeCharacter('healer', {
            startNodeId: 300,
            baseStats: { hp: 180, mp: 40, attack: 15, defense: 8, agility: 35, magic: 20, magicDefense: 25 }
        });
    }

    initBattle() {
        this.battle = new BattleSystem({
            onBattleEnd: (victory) => {
                if (victory) {
                    console.log("Battle Won! Awarding AP...");
                    // Award AP to all characters
                    ['fighter', 'mage', 'healer'].forEach(id => {
                        const leveledUp = this.progression.awardAp(id, 500); // 500 AP reward
                        const state = this.progression.getCharacterState(id);
                        console.log(`${id} gained AP. Total S.Lv: ${state.totalSphereLevels}. Available: ${state.availableSphereLevels}`);
                    });
                }
            }
        });

        // Create Players
        const fighterStats = this.progression.getCharacterStats('fighter');
        const fighter = new BattleUnit({
            name: "Fighter",
            isPlayer: true,
            partyIndex: 0,
            hp: fighterStats.hp,
            mp: fighterStats.mp,
            stats: fighterStats,
            x: this.width * 0.7,
            y: this.height * 0.3,
            color: '#e74c3c',
            svgPath: SVGIcons.sword,
            scale: 2
        });

        const mageStats = this.progression.getCharacterStats('mage');
        const mage = new BattleUnit({
            name: "Mage",
            isPlayer: true,
            partyIndex: 1,
            hp: mageStats.hp,
            mp: mageStats.mp,
            stats: mageStats,
            x: this.width * 0.8,
            y: this.height * 0.5,
            color: '#9b59b6',
            svgPath: SVGIcons.staff,
            scale: 2
        });

        const healerStats = this.progression.getCharacterStats('healer');
        const healer = new BattleUnit({
            name: "Healer",
            isPlayer: true,
            partyIndex: 2,
            hp: healerStats.hp,
            mp: healerStats.mp,
            stats: healerStats,
            x: this.width * 0.75,
            y: this.height * 0.7,
            color: '#2ecc71',
            svgPath: SVGIcons.heart,
            scale: 2
        });

        // Create Enemies
        const enemy1 = new BattleUnit({
            name: "Goblin",
            isPlayer: false,
            partyIndex: 0,
            hp: 200,
            stats: { agility: 18, attack: 25, defense: 5 }, // Tick Speed 11
            x: this.width * 0.2,
            y: this.height * 0.4,
            color: '#e67e22',
            svgPath: SVGIcons.monster,
            scale: 2.5
        });

        const enemy2 = new BattleUnit({
            name: "Big Boss",
            isPlayer: false,
            partyIndex: 1,
            hp: 800,
            stats: { agility: 12, attack: 60, defense: 15 }, // Slow but strong (Tick Speed 20)
            x: this.width * 0.3,
            y: this.height * 0.6,
            color: '#c0392b',
            svgPath: SVGIcons.skull,
            scale: 3
        });

        this.battle.addUnit(fighter);
        this.battle.addUnit(mage);
        this.battle.addUnit(healer);
        this.battle.addUnit(enemy1);
        this.battle.addUnit(enemy2);

        this.battle.initializeBattle();

        this.selectedAction = null;
    }

    start() {
        this.gameLoop(0);
    }

    gameLoop(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        this.accumulatedTime += deltaTime;

        while (this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep);
            this.accumulatedTime -= this.timeStep;
        }

        this.draw();
        requestAnimationFrame((ts) => this.gameLoop(ts));
    }

    update(deltaTime) {
        // Battle logic is mostly event driven, but we might want animations later
    }

    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.battle.state === 'WAITING_FOR_INPUT' && this.battle.activeUnit.isPlayer) {
            // Check UI Clicks
            if (this.handleMenuClick(x, y)) return;
            
            // Check Target Clicks if action selected
            if (this.selectedAction) {
                this.handleTargetClick(x, y);
            }
        } else if (this.battle.state === 'WIN' || this.battle.state === 'LOSE') {
            // Click to restart
             location.reload(); 
        }
    }

    handleMenuClick(x, y) {
        // Simple menu area bottom left
        const menuX = 50;
        const menuY = this.height - 150;
        const buttonHeight = 40;
        const buttonWidth = 200;

        const actions = [
            { name: "Attack (Rank 3)", rank: BattleConstants.ActionRank.ATTACK },
            { name: "Quick Hit (Rank 1)", rank: BattleConstants.ActionRank.QUICK_HIT },
            { name: "Item (Rank 2)", rank: BattleConstants.ActionRank.ITEM }
        ];

        for (let i = 0; i < actions.length; i++) {
            const by = menuY + (i * (buttonHeight + 10));
            if (x >= menuX && x <= menuX + buttonWidth && y >= by && y <= by + buttonHeight) {
                this.selectedAction = actions[i];
                console.log("Selected Action:", this.selectedAction.name);
                return true;
            }
        }
        return false;
    }

    handleTargetClick(x, y) {
        // Find clicked unit
        // Simple radius check. Unit radius is approx 20 * scale
        for (const unit of this.battle.units) {
            if (unit.stats.hp <= 0) continue; // Cannot target dead bodies for now

            const dx = x - unit.x;
            const dy = y - unit.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            // Hitbox approx 40-60 pixels
            if (dist < 50) {
                console.log("Targeted:", unit.name);
                this.battle.executeAction(this.selectedAction.rank, unit);
                this.selectedAction = null;
                return true;
            }
        }
        return false;
    }

    draw() {
        // Clear screen
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw Units
        this.battle.units.forEach(unit => {
            if (unit.stats.hp > 0) {
                unit.draw(this.ctx);
                
                // Highlight active unit
                if (unit === this.battle.activeUnit) {
                    this.ctx.strokeStyle = '#ffff00';
                    this.ctx.lineWidth = 3;
                    this.ctx.beginPath();
                    this.ctx.arc(unit.x, unit.y, 60, 0, Math.PI*2);
                    this.ctx.stroke();
                }
            }
        });

        // Draw Timeline
        this.drawTimeline();

        // Draw UI
        if (this.battle.state === 'WAITING_FOR_INPUT' && this.battle.activeUnit.isPlayer) {
            this.drawMenu();
        } else if (this.battle.state === 'EXECUTING') {
             this.ctx.fillStyle = '#fff';
             this.ctx.font = '30px Arial';
             this.ctx.fillText("Action executing...", this.width/2 - 100, 100);
        } else if (this.battle.state === 'WIN') {
             this.ctx.fillStyle = '#0f0';
             this.ctx.font = '60px Arial';
             this.ctx.fillText("VICTORY!", this.width/2 - 150, this.height/2);
             this.ctx.font = '20px Arial';
             this.ctx.fillText("Click to restart", this.width/2 - 70, this.height/2 + 50);
        } else if (this.battle.state === 'LOSE') {
             this.ctx.fillStyle = '#f00';
             this.ctx.font = '60px Arial';
             this.ctx.fillText("GAME OVER", this.width/2 - 180, this.height/2);
        }
    }

    drawTimeline() {
        const startX = 50;
        const startY = 50;
        const gap = 60;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.width, 100);

        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText("Turn Order:", 20, 30);

        this.battle.turnOrder.forEach((unit, index) => {
            const x = startX + (index * gap);
            const y = startY;

            // Draw mini icon
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.scale(0.8, 0.8); // Smaller for timeline
            
            // Draw background circle for portrait
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 20, 0, Math.PI*2);
            this.ctx.fillStyle = unit.color;
            this.ctx.fill();

             // Draw SVG
            if (unit.svgPath) {
                this.ctx.fillStyle = '#fff'; // White icon on colored bg
                // Center the path roughly
                this.ctx.translate(-12, -12); // Path is approx 24x24
                this.ctx.fill(new Path2D(unit.svgPath));
            }
            
            this.ctx.restore();

            // Draw line to next
            if (index < this.battle.turnOrder.length - 1) {
                this.ctx.strokeStyle = '#555';
                this.ctx.beginPath();
                this.ctx.moveTo(x + 25, y);
                this.ctx.lineTo(x + gap - 25, y);
                this.ctx.stroke();
            }
        });
    }

    drawMenu() {
        const menuX = 50;
        const menuY = this.height - 150;
        const buttonHeight = 40;
        const buttonWidth = 200;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(menuX - 10, menuY - 10, buttonWidth + 20, 160);

        const actions = [
            { name: "Attack", rank: BattleConstants.ActionRank.ATTACK },
            { name: "Quick Hit", rank: BattleConstants.ActionRank.QUICK_HIT },
            { name: "Item", rank: BattleConstants.ActionRank.ITEM }
        ];

        this.ctx.font = '18px Arial';
        this.ctx.textAlign = 'left';

        actions.forEach((action, i) => {
            const by = menuY + (i * (buttonHeight + 10));
            
            // Highlight selected
            if (this.selectedAction && this.selectedAction.rank === action.rank) {
                 this.ctx.fillStyle = '#f1c40f';
                 this.ctx.fillRect(menuX, by, buttonWidth, buttonHeight);
                 this.ctx.fillStyle = '#000';
            } else {
                 this.ctx.fillStyle = '#555';
                 this.ctx.fillRect(menuX, by, buttonWidth, buttonHeight);
                 this.ctx.fillStyle = '#fff';
            }

            this.ctx.fillText(action.name, menuX + 10, by + 25);
        });

        if (this.selectedAction) {
             this.ctx.fillStyle = '#fff';
             this.ctx.font = '20px Arial';
             this.ctx.fillText("Select Target...", menuX + buttonWidth + 30, menuY + 50);
        }
    }
}
