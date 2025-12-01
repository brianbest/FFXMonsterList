import { SphereGrid } from './SphereGrid.js';
import { ProgressionState } from './ProgressionState.js';
import { MockGridData } from './SphereGridData.js';

export class ProgressionSystem {
    constructor() {
        this.sphereGrid = new SphereGrid(MockGridData);
        this.characterStates = new Map();
    }

    initializeCharacter(characterId, config) {
        const state = new ProgressionState({
            characterId: characterId,
            currentNodeId: config.startNodeId,
            baseStats: config.baseStats
        });
        this.characterStates.set(characterId, state);
        return state;
    }

    getCharacterState(characterId) {
        return this.characterStates.get(characterId);
    }

    // Spec Part 2.2: AP and S.Lv
    awardAp(characterId, amount) {
        const state = this.getCharacterState(characterId);
        if (state) {
            return state.addAp(amount);
        }
        return false;
    }

    // Spec Part 2.2.2: Movement
    moveCharacter(characterId, targetNodeId) {
        const state = this.getCharacterState(characterId);
        if (!state) return false;

        const neighbors = this.sphereGrid.getNeighbors(state.currentNodeId);
        if (!neighbors.some(n => n.id === targetNodeId)) {
            return false; // Not adjacent
        }

        const cost = state.getMovementCost(targetNodeId, this.sphereGrid);
        return state.move(targetNodeId, cost);
    }

    // Spec Part 2.3: Node Activation
    activateNode(characterId, nodeId) {
        const state = this.getCharacterState(characterId);
        if (!state) return false;

        // In a real game, we'd check/consume items here.
        return state.activateNode(nodeId, this.sphereGrid);
    }

    getCharacterStats(characterId) {
        const state = this.getCharacterState(characterId);
        if (state) {
            return state.getStats(this.sphereGrid);
        }
        return null;
    }
}

