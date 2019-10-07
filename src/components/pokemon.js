import React from 'react'

function Child({ match }) {
   return(
     <div>
     <h3>ID: {match.params.page}</h3>
   </div>
   )
 }
class Pokemon extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: null,
      bool: false
    };
  }

   async componentDidMount() {
     fetch('https://pokeapi.co/api/v2/pokemon/1/')
     .then(response => response.json())
     .then(pokemon  => this.setState({ pokemon }))
  }
  render() {
    if (!this.state.pokemon) {
      return <div>Loading...</div>;
    }
    return (
      <div>
      <p>Hey!</p>
      {this.state.pokemon.name}
      <Child/>
      </div>
    )
  }
}

export default Pokemon
