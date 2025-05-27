# Blog API
Simple blog app to present **GraphQL** vs **REST API** architecture.

## Starting the project
`node src/index.js`

## Links
[Postman Collection](https://me0000-2905.postman.co/workspace/Blog-API~237a8d0a-391e-49fc-b6d4-c5b156044966/request/22220063-635b33c0-a215-4140-aa12-dc7ea057b434)

[GraphQL Playground](https://studio.apollographql.com/sandbox/explorer)

## Data Base

#### USER

| Field | Type   | Note            |
|-------|--------|-----------------|
| id    | Int    | Primary Key (PK)|
| name  | String |                 |
| email | String |                 |


#### POST

| Field    | Type   | Note                       |
|----------|--------|----------------------------|
| id       | Int    | Primary Key (PK)           |
| title    | String |                            |
| content  | String |                            |
| authorId | Int    | Foreign Key (FK) → USER(id)|


#### COMMENT

| Field    | Type   | Note                       |
|----------|--------|----------------------------|
| id       | Int    | Primary Key (PK)           |
| text     | String |                            |
| postId   | Int    | Foreign Key (FK) → POST(id)|
| authorId | Int    | Foreign Key (FK) → USER(id)|
