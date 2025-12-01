export class ProgressionState {
    constructor(config) {
        this.characterId = config.characterId; // e.g., "fighter"
        this.currentAp = config.currentAp || 0;
        this.totalSphereLevels = config.totalSphereLevels || 0; // TSL (Lifetime gained)
        this.availableSphereLevels = config.availableSphereLevels || 0; // S.Lv (Currency for movement)
        
        this.currentNodeId = config.currentNodeId || 0;
        this.activatedNodes = new Set(config.activatedNodes || []); // Set of Node IDs
        
        // Base stats (starting stats before grid bonuses)
        this.baseStats = config.baseStats || {
            hp: 100, mp: 10, attack: 10, defense: 5, 
            magic: 10, magicDefense: 5, agility: 10, 
            luck: 1, accuracy: 10, evasion: 5
        };
    }

    // Spec Part 2.2.1: The Sphere Level (S.Lv) Algorithm
    getApRequirement() {
        const tsl = this.totalSphereLevels;
        if (tsl <= 100) {
            return Math.floor(5 * (tsl + 1) + (Math.pow(tsl, 3) / 50));
        }
        return 22000;
    }

    addAp(amount) {
        this.currentAp += amount;
        let leveledUp = false;
        
        while (true) {
            const req = this.getApRequirement();
            if (this.currentAp >= req) {
                this.currentAp -= req;
                this.totalSphereLevels++;
                this.availableSphereLevels++;
                leveledUp = true;
            } else {
                break;
            }
        }
        return leveledUp;
    }

    // Spec Part 2.2.2: Traversal Mechanics
    // Returns the S.Lv cost to move to a neighbor node
    getMovementCost(targetNodeId, sphereGrid) {
        // "Moving to an adjacent node that the character has activated (or crossed)... costs 0.25 S.Lv"
        // Note: The spec implies we track "crossed" nodes too, but for simplicity we'll check activated for now.
        // Actually, let's strictly follow: "Unexplored Path... 1 S.Lv", "Explored Path... 0.25 S.Lv"
        // To implement "crossed", we might need another Set. For this slice, checking 'activatedNodes' is a good proxy.
        // If the target node is activated by THIS character, it's cheap.
        
        // A better interpretation might be: if the neighbor is in `activatedNodes`, it's 0.25.
        // Or if we have been there before. 
        // Let's stick to: if target is in `activatedNodes`, cost is 0.25, else 1.
        
        // Wait, the interface allows moving 4 steps for 1 S.Lv. 
        // This usually means we accumulate movement points.
        // But the prompt asks for the logic.
        
        // Let's implement a simpler version: 
        // 1 S.Lv allows moving 1 step on unactivated nodes, or 4 steps on activated nodes.
        // We can treat S.Lv as a float locally for calculation or just return the cost.
        
        if (this.activatedNodes.has(targetNodeId)) {
            return 0.25;
        }
        return 1;
    }

    move(targetNodeId, cost) {
        if (this.availableSphereLevels >= cost) {
            this.availableSphereLevels -= cost;
            this.currentNodeId = targetNodeId;
            return true;
        }
        return false;
    }

    activateNode(nodeId, sphereGrid) {
        // Validation: Must be at the node or adjacent (Spec 2.3)
        // Check if node is current node or neighbor
        const currentNode = sphereGrid.getNode(this.currentNodeId);
        const neighbors = sphereGrid.getNeighbors(this.currentNodeId);
        
        const isAdjacent = neighbors.some(n => n.id === nodeId);
        const isCurrent = this.currentNodeId === nodeId;

        if (!isCurrent && !isAdjacent) {
            return false; // Cannot activate
        }

        // Check if already activated
        if (this.activatedNodes.has(nodeId)) {
            return false;
        }

        // In a full implementation, we would check for Items (Spheres) here.
        // For vertical slice, we might skip item inventory or assume infinite.
        
        this.activatedNodes.add(nodeId);
        return true;
    }

    // Calculate effective stats based on base stats + activated nodes
    getStats(sphereGrid) {
        const stats = { ...this.baseStats };

        this.activatedNodes.forEach(nodeId => {
            const node = sphereGrid.getNode(nodeId);
            if (node && node.type === 'ATTRIBUTE' && node.statType) {
                stats[node.statType] = (stats[node.statType] || 0) + node.value;
            }
        });

        return stats;
    }
}

