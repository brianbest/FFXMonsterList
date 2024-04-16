import { createRouter } from 'next-connect';
import db from '../../lib/db';

const router = createRouter();

router.get(async (req, res) => {
  try {
    // Query using the MySQL connection
    const [rows] = await db.query('SELECT * FROM monsters');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No monsters found' });
    }
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router.handler();
