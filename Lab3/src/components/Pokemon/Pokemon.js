import React from 'react'
import axios from "axios";

export default class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      loading: false,
      error: false
    };
  }

  async getPokemon() {
    this.setState({
      loading: true
    });
    try {
      const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`
      );
      console.log(response);
      this.setState({
        pokemon: response.data,
        loading: false
      });
    } catch(e) {
      this.setState({
        error: true
      })
    }
  }

  componentWillMount() {
    this.getPokemon()
  }


  //Needs more work
  render() {
    let res = null;
    if(this.state.error) {
      return <div>404 No pokemon Found</div>
    }
    if (this.state.loading) {
      res = (
        <div>Loading....</div>
      )
    } else {
      res = (
        <div>
        <h1>Pokemon</h1>
        <img src = {this.state.pokemon.sprites.front_default} alt = "Whos that pokemon?"></img>
        <p>Name: {this.state.pokemon.name.charAt(0).toUpperCase()+this.state.pokemon.name.slice(1)}</p>
        <p>Weight: {this.state.pokemon.weight} lbs</p>
        <p>Type: {this.state.pokemon.types.map(typeArr => typeArr.type.name).join(' ')} </p>
        <p>Random Move: {this.state.pokemon.moves[Math.floor(Math.random() * this.state.pokemon.moves.length-1)].move.name}</p>
        <a href = "/pokemon/page/0">Back</a>
        </div>
      )
    }
    return res
  }
}
