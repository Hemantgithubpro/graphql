import { useState } from 'react'
import {ApolloClient} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
});

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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    </>
  )
}

export default App
