import { createRouter } from 'next-connect';
import db from '../../lib/db';

const router = createRouter();

router.post(async (req, res) => {
    const { uuid } = req.body;
    try {
      const [result] = await db.query('INSERT INTO users (uuid) VALUES (?)', [uuid]);
      res.status(200).json({ id: result.insertId, uuid });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

export default router.handler();
