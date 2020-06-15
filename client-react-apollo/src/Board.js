import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import Card from "./Card"
import "./App.css"

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
  <Card title={name} image={image} />
)

function AppNew() {
  const { loading, error, data } = useQuery(GET_ALL_CHARACTERS)

  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  return (
    <main className="App">
      <h1>RICK AND MORTY</h1>
      {
        data.characters.results.map(character => (
        <User key={character.id} character={character} />
        ))
      }
    </main>
  )
}

export default AppNew