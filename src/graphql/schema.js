import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: Int!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: Int!
    text: String!
    post: Post!
    author: User!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: Int!): Post
    comments: [Comment!]!
    commentsByAuthorAndPost(authorId: Int!, postId: Int!): [Comment!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createPost(title: String!, content: String!, authorId: Int!): Post!
    createComment(text: String!, postId: Int!, authorId: Int!): Comment!
  }
`;
