import { createRouter } from 'next-connect';
import db from '../../lib/db';

const router = createRouter();

router.get(async (req, res) => {
  const locationId = req.query.id; // Get location ID from query parameter
  try {
    const [rows] = await db.query('SELECT * FROM monsters WHERE location_id = ?', [locationId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No monsters found for this location' });
    }
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router.handler();
