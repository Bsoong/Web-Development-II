import React, {Component} from 'react';

class Background extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      berries: [],
      machines: []
    };
  }

   async componentDidMount() {
    const url = "https://pokeapi.co/api/v2/pokemon/1/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default Background
