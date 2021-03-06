import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import MachinesList from "./MachinesList";
import Machines from "./Machines";

export default class MachinesContainer extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/machines/page/:page" exact component={MachinesList} />
          <Route path="/machines/:id" exact component={Machines} />
        </Switch>
      </div>
    );
  }
}
