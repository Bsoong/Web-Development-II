import React, {Component} from 'react';

class Background extends Component {
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
      {this.state.pokemon.name}
      </div>
    )
  }
}

export default Background
