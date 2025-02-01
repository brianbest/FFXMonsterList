const pool = require('../config/database');

// Add authorization guard at the top of the file
const requireAuth = (req, res, next) => {
  return res.status(401).json({ message: 'Unauthorized' });
};

const monstersController = {
  // Get all monsters with their location, type, and elemental weaknesses
  async getAllMonsters(req, res) {
    try {
      const locationName = req.query.location;
      let query = `
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
      `;

      const queryParams = [];
      
      if (locationName) {
        query += ' WHERE l.location_name = ?';
        queryParams.push(locationName);
      }

      query += ' ORDER BY f.name';

      const [rows] = await pool.query(query, queryParams);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a single monster by ID with all its details
  async getMonsterById(req, res) {
    try {
      const [monster] = await pool.query(`
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
        WHERE f.fiend_id = ?
      `, [req.params.id]);

      if (monster.length === 0) {
        return res.status(404).json({ message: 'Monster not found' });
      }

      // Get elemental weaknesses
      const [weaknesses] = await pool.query(`
        SELECT 
          e.element_name,
          ew.multiplier,
          ew.is_immune,
          ew.absorbs
        FROM elemental_weaknesses ew
        JOIN elements e ON ew.element_id = e.element_id
        WHERE ew.fiend_id = ?
      `, [req.params.id]);

      res.json({
        ...monster[0],
        elemental_weaknesses: weaknesses
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new monster
  async createMonster(req, res) {
    // Check authorization first
    requireAuth(req, res);
    
    const { name, hp, mp, fiend_type, location, common_drop, bribe_drop } = req.body;
    
    try {
      // Start transaction
      const connection = await pool.getConnection();
      await connection.beginTransaction();

      try {
        // Get location_id and fiend_type_id
        const [location_result] = await connection.query(
          'SELECT location_id FROM locations WHERE location_name = ?',
          [location]
        );
        const [type_result] = await connection.query(
          'SELECT fiend_type_id FROM fiend_types WHERE type_name = ?',
          [fiend_type]
        );

        if (!location_result.length || !type_result.length) {
          await connection.rollback();
          connection.release();
          return res.status(400).json({ message: 'Invalid location or fiend type' });
        }

        // Insert the fiend
        const [result] = await connection.query(
          'INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) VALUES (?, ?, ?, ?, ?)',
          [name, hp, mp, type_result[0].fiend_type_id, location_result[0].location_id]
        );

        // Insert the drops
        await connection.query(
          'INSERT INTO drops (fiend_id, common_drop, bribe_drop) VALUES (?, ?, ?)',
          [result.insertId, common_drop, bribe_drop]
        );

        await connection.commit();
        connection.release();

        res.status(201).json({
          id: result.insertId,
          message: 'Monster created successfully'
        });
      } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a monster
  async updateMonster(req, res) {
    // Check authorization first  
    requireAuth(req, res);

    const { name, hp, mp, fiend_type, location, common_drop, bribe_drop } = req.body;
    const fiendId = req.params.id;

    try {
      const connection = await pool.getConnection();
      await connection.beginTransaction();

      try {
        // Get location_id and fiend_type_id if provided
        let locationId, fiendTypeId;

        if (location) {
          const [locationResult] = await connection.query(
            'SELECT location_id FROM locations WHERE location_name = ?',
            [location]
          );
          if (!locationResult.length) {
            throw new Error('Invalid location');
          }
          locationId = locationResult[0].location_id;
        }

        if (fiend_type) {
          const [typeResult] = await connection.query(
            'SELECT fiend_type_id FROM fiend_types WHERE type_name = ?',
            [fiend_type]
          );
          if (!typeResult.length) {
            throw new Error('Invalid fiend type');
          }
          fiendTypeId = typeResult[0].fiend_type_id;
        }

        // Update fiend
        await connection.query(
          `UPDATE fiends SET 
            name = COALESCE(?, name),
            hp = COALESCE(?, hp),
            mp = COALESCE(?, mp),
            fiend_type_id = COALESCE(?, fiend_type_id),
            location_id = COALESCE(?, location_id)
          WHERE fiend_id = ?`,
          [name, hp, mp, fiendTypeId, locationId, fiendId]
        );

        // Update drops if provided
        if (common_drop || bribe_drop) {
          await connection.query(
            `UPDATE drops SET 
              common_drop = COALESCE(?, common_drop),
              bribe_drop = COALESCE(?, bribe_drop)
            WHERE fiend_id = ?`,
            [common_drop, bribe_drop, fiendId]
          );
        }

        await connection.commit();
        connection.release();

        res.json({ message: 'Monster updated successfully' });
      } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a monster
  async deleteMonster(req, res) {
    // Check authorization first
    requireAuth(req, res);

    try {
      const connection = await pool.getConnection();
      await connection.beginTransaction();

      try {
        // Delete related records first
        await connection.query('DELETE FROM drops WHERE fiend_id = ?', [req.params.id]);
        await connection.query('DELETE FROM elemental_weaknesses WHERE fiend_id = ?', [req.params.id]);
        
        // Delete the fiend
        const [result] = await connection.query('DELETE FROM fiends WHERE fiend_id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
          await connection.rollback();
          connection.release();
          return res.status(404).json({ message: 'Monster not found' });
        }

        await connection.commit();
        connection.release();

        res.json({ message: 'Monster deleted successfully' });
      } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = monstersController; 