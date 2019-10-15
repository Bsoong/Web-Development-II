import React from 'react'
import axios from "axios";

export default class Berries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      berry: [],
      loading: false,
      error: false
    };
  }

  async getBerry() {
    this.setState({
      loading: true
    });
    try {
      const response = await axios.get(
          `https://pokeapi.co/api/v2/berry/${this.props.match.params.id}`
      );
      console.log(response);
      this.setState({
        berry: response.data,
        loading: false
      });
    } catch(e) {
      this.setState({
        error: true
      })
    }
  }

  componentWillMount() {
    this.getBerry()
  }

  //Needs more work
  render() {
    let res = null;
    if(this.state.error) {
      return <div>404 No Berries Found</div>
    }
    if (this.state.loading) {
      res = (
          <div>Loading....</div>
      )
    } else {
      res = (
        <div>
        <h1>Berry</h1>
        <p>Name: {this.state.berry.name.charAt(0).toUpperCase() + this.state.berry.name.slice(1)}</p>
        <p>Firmness: {this.state.berry.firmness.name.charAt(0).toUpperCase() + this.state.berry.firmness.name.slice(1)}</p>
        <p>Random Flavor of the berry: {this.state.berry.flavors[Math.floor(Math.random() * this.state.berry.flavors.length-1)].flavor.name}</p>
        <p>Growth Time: {this.state.berry.growth_time} Pokemon Days</p>
        <a href = "/berries/page/0">Back</a>
        </div>
      )
    }
    return res
  }
}
