export const NodeType = {
    EMPTY: 'EMPTY',
    ATTRIBUTE: 'ATTRIBUTE',
    ABILITY: 'ABILITY',
    LOCK: 'LOCK'
};

export const StatType = {
    HP: 'hp',
    MP: 'mp',
    STRENGTH: 'attack', // Mapping 'Strength' to 'attack' for compatibility with BattleUnit
    DEFENSE: 'defense',
    MAGIC: 'magic',
    MAGIC_DEFENSE: 'magicDefense',
    AGILITY: 'agility',
    LUCK: 'luck',
    ACCURACY: 'accuracy',
    EVASION: 'evasion'
};

export class GridNode {
    constructor(data) {
        this.id = data.id;
        this.type = data.type || NodeType.EMPTY;
        this.statType = data.statType || null; // For ATTRIBUTE nodes
        this.value = data.value || 0; // For ATTRIBUTE nodes
        this.abilityId = data.abilityId || null; // For ABILITY nodes
        this.lockLevel = data.lockLevel || 0; // For LOCK nodes
        this.connections = data.connections || []; // Array of neighbor Node IDs
        this.position = data.position || { x: 0, y: 0 }; // For UI
    }
}

export class SphereGrid {
    constructor(nodesData) {
        this.nodes = new Map();
        if (nodesData) {
            this.loadNodes(nodesData);
        }
    }

    loadNodes(nodesData) {
        nodesData.forEach(nodeData => {
            this.nodes.set(nodeData.id, new GridNode(nodeData));
        });
    }

    getNode(id) {
        return this.nodes.get(id);
    }

    getNeighbors(id) {
        const node = this.getNode(id);
        if (!node) return [];
        return node.connections.map(connId => this.getNode(connId)).filter(n => n);
    }
}

