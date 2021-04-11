import React from "react";
import axios from "axios";
import "../../src/App.css";

class RobotList extends React.Component {
  state = {
    robots: [],
    factoryRobots: [],
    passedRobots: [],
  }

  componentDidMount() {
    axios.get('http://localhost:3001/robots')
      .then(res => {
        const robots = res.data;
        // remove robots with statuses.includes("looseScrews") and statuses.includes("paintScratched"),
        // pass these robots to factoryRobots state
        const factoryData = robots.filter(obj =>
          obj.statuses.includes("looseScrews") && obj.statuses.includes("paintScratched")
        );
        // initially set passedRobots to robots state less these factoryRobots
        this.setState({
          robots,
          passedRobots: robots,
          factoryRobots: factoryData,
          forShipmentRobots: [],
        });
      })
  }

  onExtinguish(id) {
    axios.post(`http://localhost:3001/robots/${id}/extinguish`)
        .then(response => {
            console.log(response); 
            this.setState({ recycledRobots: response.data });
            // remove this id from the passedRobots state
            const passedRobots = passedRobots.filter(function( obj ) {
              return obj.id !== response.data.id;
            });
            this.setState({
              passedRobots
            });
          }
        );

  }

  onRecycle() {
    const data = this.state.robots.filter(obj => obj.configuration.numberOfRotors > 3 ||
      obj.configuration.numberOfRotors < 8 ||
      (obj.configuration.hasWheels && obj.configuration.hasTracks) ||
      (obj.configuration.hasWheels && obj.statuses.includes("rusty")) ||
      (obj.configuration.hasSentience && obj.statuses.includes("looseScrews")) ||
      obj.statuses.includes("onFire")
    );

    let result = data.map(({ id }) => id);

    console.log(data);
    const postBodyObj = {
      recycleRobots: result
    };

    axios.post('http://localhost:3001/robots/recycle', data)
        .then(response => this.setState({ recycledRobots: response.data }));

    // remove this ids from passedRobots state
    let robotArray = this.state.passedRobots;
    robotArray.filter(i => !data.map(j => j.id).includes(i.id));

    this.setState({
      passedRobots: robotArray
    });
  }

  onAddToShipment(robot) {
    this.state.forShipmentRobots.push(robot);
  }

  onRemoveFromShipment(robot) {
    let returnedRobots = [];
    const filteredObj = this.state.forShipmentRobots.filter(function( obj ) {
      return obj.id !== robot.id;
    });

    this.setState({
      forShipmentRobots: filteredObj
    });

    if (robot.statuses.includes("looseScrews") && robot.statuses.includes("paintScratched")) {
      returnedRobots = this.state.factoryRobots;
      returnedRobots.push(robot);
      this.setState({ factoryRobots: returnedRobots });
    } else {
      returnedRobots = this.state.passedRobots
      returnedRobots.push(robot);
      this.setState({ passedRobots: returnedRobots });
    }
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.onRecycle}>RECYCLE</button>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Robot Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.robots.map(u => (
              <tr key={u.id}>
                <td>{u.name}
                { u.configuration.hasSentience && u.statuses.includes("onFire") &&
                  <button onClick={this.onExtinguish.bind(this, u.id)}>EXTINGUISH</button>
                }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>FACTORY SECONDS</h3>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Has Sentience</th>
              <th>Has Wheels</th>
              <th>Has Tracks</th>
              <th>No. of Rotors</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {this.state.factoryRobots.map(u => (
              <tr key={u.id}>
                <td>{u.id}
                </td>
                <td>{u.name}
                { u.configuration.hasSentience && u.statuses.includes("onFire") &&
                  <button onClick={this.onAddToShipment.bind(this, u)}>ADD TO SHIPMENT</button>
                }
                </td>
                <td>{u.configuration.hasSentience}
                </td>
                <td>{u.configuration.hasWheels}
                </td>
                <td>{u.configuration.hasTracks}
                </td>
                <td>{u.configuration.numberOfRotors}
                </td>
                <td>{u.configuration.Colour}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>PASSED QA</h3>
        <table className="table table-dark">
          <thead>
            <tr>
            <th>ID</th>
              <th>Name</th>
              <th>Has Sentience</th>
              <th>Has Wheels</th>
              <th>Has Tracks</th>
              <th>No. of Rotors</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {this.state.passedRobots.map(u => (
              <tr key={u.id}>
                <td>{u.id}
                </td>
                <td>
                  {u.name}
                  { u.configuration.hasSentience && u.statuses.includes("onFire") &&
                    <button onClick={this.onAddToShipment.bind(this, u)}>ADD TO SHIPMENT</button>
                  }
                </td>
                <td>{u.configuration.hasSentience}
                </td>
                <td>{u.configuration.hasWheels}
                </td>
                <td>{u.configuration.hasTracks}
                </td>
                <td>{u.configuration.numberOfRotors}
                </td>
                <td>{u.configuration.Colour}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>READY TO SHIP</h3>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Robot Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.passedRobots.map(u => (
              <tr key={u.id}>
                <td>
                  {u.name}
                  <button onClick={this.onRemoveFromShipment.bind(this, u)}>REMOVE FROM SHIPMENT</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RobotList;
