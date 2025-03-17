
## Steps
### Step 1: Create neccessary files
1. Create a two folders: `client` and `server`.
2. `npm init -y` in both folders.
3. `npm install express` in `server` folder.

### Step 2: Apollo Server
We'll be using Apollo Server to create a GraphQL server. Apollo Server is a community-maintained open-source GraphQL server that works with all Node.js HTTP server frameworks: Express, Connect, Hapi, Koa, Restify, and Lambda.
1. `npm install apollo-server-express graphql` in `server` folder.
2. install body-parser middleware: `npm install body-parser` in `server` folder.
3. Create a new file `server/index.js` and add the following code:
```javascript
// we will be using json placeholder api to fetch data. link: jsonplaceholder.typicode.com/todos
const express = require('express');
// const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');


async function startServer(){
    const app = express();
    // const server = new ApolloServer({});
    // i've created server till here.

    const server = new ApolloServer({
        typeDefs: `
            type Todo{
                id: ID!,
                title: String!,
                completed: Boolean
            }
            
            type Query{
                getTodos: [Todo]
            }
        `,
        resolvers: {}

    });


    app.use(bodyParser.json());
    app.use(cors());
    // middlewares are implemented

    await server.start();
    // graphql server is started

    app.use("/graphql", expressMiddleware(server));
    // whenver a request comes to /graphql, it will be handled by the server

    app.listen(8000, () => {
        console.log("Server is running on port 8000");
    });

}

startServer();
```
4. Run the server using `node server/index.js`.
5. Open `http://localhost:8000/graphql` in your browser. You should see the GraphQL playground.

### Step 3: Understanding typeDefs and resolvers
1. `typeDefs` is a string that defines the schema of the GraphQL server. It defines the types of data that can be queried and the structure of the data.
2. `resolvers` is an object that contains functions that resolve the queries defined in the `typeDefs`.


### Step 4: Fetching data from JSON Placeholder API
1. Install axios: `npm install axios` in `server` folder. axios is a promise-based HTTP client for the browser and Node.js. it helps us to make requests to the JSON Placeholder API.
2. add types of axios: `npm install @types/axios` in `server` folder.
3. Write following code:
```javascript
const axios = require('axios');
// rest is same as above
// resolvers is implemented as follows
const resolvers = {
    Query: {
        getTodos: async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
            return response.data;
        }
    }
};
```
4. Now we hit different url for fetching data with different schema: link: `https://jsonplaceholder.typicode.com/users`.