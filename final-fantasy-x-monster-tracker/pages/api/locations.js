// pages/api/locations.js
import { createRouter } from 'next-connect';
import db from '../../lib/db';

const router = createRouter();

router.get(async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM locations');
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router.handler();
