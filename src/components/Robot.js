import React from "react";
import RobotList from "./RobotList";

class Robot extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h2>Demo - React, Redux and Redux-Saga</h2>
            <RobotList/>
      </div>
    );
  }
}

export default Robot;
