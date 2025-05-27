import { Router } from 'express';
import prisma from '../db.js';

const router = Router();
const { post } = prisma;

router.get('/', async (req, res) => {
  try {
    const posts = await post.findMany({
      include: { author: true, comments: true }
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const singlePost = await post.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { author: true, comments: true }
    });
    if (!singlePost) return res.status(404).json({ error: 'Post not found' });
    res.json(singlePost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/comments', async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  if (isNaN(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: true,
        post: { select: { id: true, title: true } }
      }
    });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const newPost = await post.create({
      data: { title, content, authorId }
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;