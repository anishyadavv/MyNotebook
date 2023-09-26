import React, { Component } from 'react'
import loading from './loading1.0.gif'

export class Spinner extends Component {
  render() {
    return (
      <>
        <div className="blurbackground"></div>
        <div className="text-center spinner">
          <img src={loading} alt="loading" width={200} />
        </div>
      </>
    );
  }
}

export default Spinner
