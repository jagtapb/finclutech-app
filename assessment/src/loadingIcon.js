import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './App.css';

class LoadingIcon extends React.Component {
  render() {
    return (
      <div className={"loading-div"}>
        <CircularProgress className={"loading-icon"}/>
      </div>
    );
  }
}

export default LoadingIcon;


