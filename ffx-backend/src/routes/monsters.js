const express = require('express');
const router = express.Router();
const monstersController = require('../controllers/monsters');

router.get('/', monstersController.getAllMonsters);
router.get('/:id', monstersController.getMonsterById);
router.post('/', monstersController.createMonster);
router.put('/:id', monstersController.updateMonster);
router.delete('/:id', monstersController.deleteMonster);

module.exports = router; 