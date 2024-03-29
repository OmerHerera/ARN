import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import "./App.css"

// const GET_USERS = gql`
//   {
//     users {
//       id
//       login
//       avatar_url
//     }
//   }
// `
const GET_ALL_CHARACTERS = gql`
  {
    characters(filter: { name: "" }) {
      info {
        next
        prev
        pages
        count
      }
      results {
        id
        name
        type
        image
      }
    }
  }
`

const User = ({ character: { name, image } }) => (
  <div className="Card">
    <div>
      <img alt="avatar" className="Card--avatar" src={image} />
      <h1 className="Card--name">{name}</h1>
    </div>
    {/* <a href={`https://github.com/${login}`} className="Card--link">
      See profile
    </a> */}
  </div>
)

function AppNew() {
  // const { loading, error, data } = useQuery(GET_USERS)
  const { loading, error, data } = useQuery(GET_ALL_CHARACTERS)

  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  return (
    <main className="App">
      <h1>RICK AND MORTY</h1>
      {data.characters.results.map(character => (
        <User key={character.id} character={character} />
      ))}
    </main>
  )
}

export default AppNew