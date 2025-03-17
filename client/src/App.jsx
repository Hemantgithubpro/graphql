// import {ApolloClient} from '@apollo/client'

// const client = new ApolloClient({
//   uri: 'http://localhost:8000/graphql',
//   cache: new InMemoryCache()
// });

// const query = `
//   query{
//     getTodos{
//       id
//       title
//       completed
//       user{
//         name
//       }
//     }
//   }
// `

import {gql, useQuery} from '@apollo/client'

const query = gql`
  query GetTodosOfUser{
    getTodos{
      id
      title
      completed
      user{
        id
        name
      }
    }
  }
`

function App() {
  const {data, loading} = useQuery(query)

  if(loading) return <h1>Loading...</h1>

  console.log(data)

  return (
    <>
      {/* {JSON.stringify(data)}; */}
      <table>
        <tbody>
          {
            data.getTodos.map(todo => 
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? 'Completed' : 'Not Completed'}</td>
                <td>{todo.user.name}</td>
              </tr>)
          }
        </tbody>
      </table>
    </>
  )
}

export default App
