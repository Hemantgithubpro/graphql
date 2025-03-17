// we will be using json placeholder api to fetch data. link: jsonplaceholder.typicode.com/todos
const express = require('express');
// const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


async function startServer(){
    const app = express();
    // const server = new ApolloServer({});
    // i've created server till here.

    const server = new ApolloServer({
        typeDefs: `
            type User{
				id: ID!,
				name: String!,
				username: String!,
				email: String!,
				phone: String!,
				website: String!
			}
            
			type Todo{
                id: ID!,
                title: String!,
                completed: Boolean
				user: User
            }
            
            type Query{
                getTodos: [Todo],
				getUsers: [User],
				getUser(id: ID!): User
            }
        `,
        // we write main logic in this resolver
        resolvers: {
			
            Query:{
                // i've hard coded it below, but we can fetch data from api as well
                // getTodos: ()=>[
                //     {
                //         id:1,
                //         title: "some title",
                //         completed: false
                //     }
                // ]

                // without axios
                // getTodos: async () => {
                //     const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                //     const todos = await response.json();
                //     return todos;
                // }

                // with axios
                getTodos: async ()=> ( await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                // what i've done in above line is, i've fetched data from api and returned it. irl, we will be using database to fetch data like select* ...

				getUsers: async ()=> ( await axios.get('https://jsonplaceholder.typicode.com/users')).data,

				getUser: async (parent, {id})=> ( await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
            }
        }

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