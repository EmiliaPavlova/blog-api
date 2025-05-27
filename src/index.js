import express, { json } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';

import postsRouter from './routes/posts.js';
import userRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';

const app = express();
app.use(json());

// REST
app.use('/api/posts', postsRouter);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

// Apollo Server + Express
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`REST API server running at http://localhost:${PORT}/api`);
    console.log(`GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
