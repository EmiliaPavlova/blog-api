import prisma from '../db.js';

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany({ include: { posts: true, comments: true } }),
    
    user: (_, { id }) =>
      prisma.user.findUnique({
        where: { id: Number(id) },
        include: { posts: true, comments: true }
      }),

    posts: () =>
      prisma.post.findMany({ include: { author: true, comments: true } }),

    post: (_, { id }) =>
      prisma.post.findUnique({
        where: { id },
        include: { author: true, comments: true }
      }),

    comments: () =>
      prisma.comment.findMany({ include: { author: true, post: true } }),

    commentsByAuthorAndPost: async (_, { authorId, postId }) => {
      return await prisma.comment.findMany({
        where: { authorId, postId },
        include: {
          author: true,
          post: true
        }
      });
    },
  },

  Mutation: {
    createUser: (_, { name, email }) =>
      prisma.user.create({
        data: { name, email }
      }),

    createPost: (_, { title, content, authorId }) =>
      prisma.post.create({
        data: {
          title,
          content,
          author: { connect: { id: authorId } }
        }
      }),

    createComment: (_, { text, postId, authorId }) =>
      prisma.comment.create({
        data: {
          text,
          post: { connect: { id: postId } },
          author: { connect: { id: authorId } }
        }
      }),
  },

  User: {
    posts: (parent) => prisma.post.findMany({ where: { authorId: parent.id } }),
    comments: (parent) => prisma.comment.findMany({ where: { authorId: parent.id } }),
  },

  Post: {
    author: (parent) => prisma.user.findUnique({ where: { id: parent.authorId } }),
    comments: (parent) => prisma.comment.findMany({ where: { postId: parent.id } }),
  },

  Comment: {
    author: (parent) => prisma.user.findUnique({ where: { id: parent.authorId } }),
    post: (parent) => prisma.post.findUnique({ where: { id: parent.postId } }),
  },
};
