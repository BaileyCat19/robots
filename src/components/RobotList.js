import React from "react";
import { connect } from "react-redux";
import {
  fetchRobots,
  fetchRobotById
} from "../actions/userActions";
import "../../src/App.css";

class RobotList extends React.Component {
  componentDidMount() {
    this.props.fetchRobots();
  }

  render() {
    return (
      <div className="App">
        <table className="table table-dark">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.props.Robots.map(u => (
              <tr key={u.id}>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Users: state.robotReducer.users,
  error: state.robotReducer.error
});

export default connect(
  mapStateToProps,
  { fetchRobots, fetchRobotById }
)(RobotList);
