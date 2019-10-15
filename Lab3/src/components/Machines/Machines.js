import React from 'react'
import axios from "axios";
import Link from 'react-router-dom'

export default class Machines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machine: [],
      loading: false,
      error: false
    };
  }

  async getMachine() {
    this.setState({
      loading: true
    });
    try {
      const response = await axios.get(
          `https://pokeapi.co/api/v2/machine/${this.props.match.params.id}`
      );
      console.log(response);
      this.setState({
        machine: response.data,
        loading: false
      });
    } catch(e) {
      this.setState({
        error: true
      })
    }
  }

  componentWillMount() {
    this.getMachine()
  }


  //Needs more work
  render() {
    let res = null;
    if(this.state.error) {
      return <div>404 No Machine Found</div>
    }
    if (this.state.loading) {
      res = (
          <div>Loading....</div>
      )
    } else {
      res = (
        <div>
        <h1>Machine</h1>
        <p>Name: {this.state.machine.item.name}</p>
        <p>Move Name: {this.state.machine.move.name.charAt(0).toUpperCase() + this.state.machine.move.name.slice(1)}</p>
        <p>Games the TM is found in: {this.state.machine.version_group.name} </p>
        <a href = "/machines/page/0">Back</a>
        </div>
      )
    }
    return res
  }
}
