// pages/api/setMonsterCount.js
import { createRouter } from 'next-connect';
import db from '../../lib/db';

const router = createRouter();

router.post(async (req, res) => {
  const { userId, monsterId, count } = req.body;

  try {
    // Perform an upsert operation: Update the count if the record exists, otherwise insert a new one
    const query = `
      INSERT INTO user_monsters (user_id, monster_id, count) 
      VALUES (?, ?, ?) 
      ON DUPLICATE KEY UPDATE count = ?
    `;
    await db.query(query, [userId, monsterId, count, count]);

    res.status(200).json({ message: 'Monster count updated successfully', monsterId, count });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router.handler();
