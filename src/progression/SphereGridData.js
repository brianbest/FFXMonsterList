import { NodeType, StatType } from './SphereGrid.js';

export const MockGridData = [
    // --- Fighter Cluster (Start 100) ---
    { id: 100, type: NodeType.EMPTY, position: {x: 100, y: 300}, connections: [101, 102] },
    { id: 101, type: NodeType.ATTRIBUTE, statType: StatType.STRENGTH, value: 2, position: {x: 150, y: 300}, connections: [100, 103] },
    { id: 102, type: NodeType.ATTRIBUTE, statType: StatType.HP, value: 200, position: {x: 100, y: 350}, connections: [100, 103] },
    { id: 103, type: NodeType.ATTRIBUTE, statType: StatType.DEFENSE, value: 2, position: {x: 150, y: 350}, connections: [101, 102, 104] },
    { id: 104, type: NodeType.ABILITY, abilityId: 'power_break', position: {x: 200, y: 325}, connections: [103, 105] },
    { id: 105, type: NodeType.LOCK, lockLevel: 1, position: {x: 250, y: 325}, connections: [104, 200] }, // Connects to Mage

    // --- Mage Cluster (Start 200) ---
    { id: 200, type: NodeType.EMPTY, position: {x: 300, y: 300}, connections: [201, 202, 105] },
    { id: 201, type: NodeType.ATTRIBUTE, statType: StatType.MAGIC, value: 2, position: {x: 350, y: 300}, connections: [200, 203] },
    { id: 202, type: NodeType.ATTRIBUTE, statType: StatType.MP, value: 20, position: {x: 300, y: 250}, connections: [200, 203] },
    { id: 203, type: NodeType.ATTRIBUTE, statType: StatType.MAGIC_DEFENSE, value: 2, position: {x: 350, y: 250}, connections: [201, 202, 204] },
    { id: 204, type: NodeType.ABILITY, abilityId: 'fire', position: {x: 400, y: 275}, connections: [203, 205] },
    { id: 205, type: NodeType.LOCK, lockLevel: 1, position: {x: 450, y: 275}, connections: [204, 300] }, // Connects to Healer

    // --- Healer Cluster (Start 300) ---
    { id: 300, type: NodeType.EMPTY, position: {x: 500, y: 300}, connections: [301, 302, 205] },
    { id: 301, type: NodeType.ATTRIBUTE, statType: StatType.AGILITY, value: 2, position: {x: 550, y: 300}, connections: [300, 303] },
    { id: 302, type: NodeType.ATTRIBUTE, statType: StatType.MP, value: 20, position: {x: 500, y: 350}, connections: [300, 303] },
    { id: 303, type: NodeType.ATTRIBUTE, statType: StatType.MAGIC_DEFENSE, value: 2, position: {x: 550, y: 350}, connections: [301, 302, 304] },
    { id: 304, type: NodeType.ABILITY, abilityId: 'cure', position: {x: 600, y: 325}, connections: [303] },
];

