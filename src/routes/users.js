import { Router } from 'express';
import prisma from '../db.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email }
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany({
    include: { posts: true }
  });
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { posts: true, comments: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/comments', async (req, res) => {
  const authorId = parseInt(req.params.id, 10);

  if (isNaN(authorId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { authorId },
      include: {
        post: { select: { id: true, title: true } }
      }
    });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
