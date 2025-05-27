import { Router } from 'express';
import prisma from '../db.js';

const router = Router();

router.post('/', async (req, res) => {
  const { text, postId, authorId } = req.body;

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    const author = await prisma.user.findUnique({ where: { id: authorId } });

    if (!post || !author) {
      return res.status(400).json({ error: 'Invalid postId or authorId' });
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        post: { connect: { id: postId } },
        author: { connect: { id: authorId } },
      },
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const { authorId, postId } = req.query;

  const filters = {};
  if (authorId) filters.authorId = parseInt(authorId, 10);
  if (postId) filters.postId = parseInt(postId, 10);

  try {
    const comments = await prisma.comment.findMany({
      where: filters,
      include: {
        author: { select: { id: true, name: true } },
        post: { select: { id: true, title: true } }
      }
    });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
