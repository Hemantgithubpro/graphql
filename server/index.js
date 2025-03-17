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
        // we write main logic in this resolver
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