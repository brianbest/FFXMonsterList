const pool = require('../config/database');

const locationsController = {
  // Get all locations
  async getAllLocations(req, res) {
    try {
      const [rows] = await pool.query(`
        SELECT location_id, location_name
        FROM locations
        ORDER BY FIELD(location_name, 
          'Besaid', 
          'Kilika', 
          'Mi''ihen Highroad', 
          'Mushroom Rock Road', 
          'Djose Road', 
          'Thunder Plains', 
          'Macalania', 
          'Bikanel', 
          'Calm Lands', 
          'Stolen Fayth Cavern', 
          'Mt. Gagazet', 
          'Inside Sin', 
          'Omega Dungeon'
        )
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get monsters by location
  async getMonstersByLocation(req, res) {
    try {
      const locationName = req.query.location;
      
      const [rows] = await pool.query(`
        SELECT 
          f.fiend_id,
          f.name,
          f.hp,
          f.mp,
          l.location_name,
          ft.type_name as fiend_type,
          d.common_drop,
          d.bribe_drop
        FROM fiends f
        JOIN locations l ON f.location_id = l.location_id
        JOIN fiend_types ft ON f.fiend_type_id = ft.fiend_type_id
        LEFT JOIN drops d ON f.fiend_id = d.fiend_id
        WHERE l.location_name = ?
        ORDER BY f.name
      `, [locationName]);

      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = locationsController; 