import React, { Component } from "react";
import "./index.scss";

class Login extends Component {
  render() {
    return (
      <div className='hover'>
        <div className='background'>
          <div className='door'>403</div>
          <div className='rug'></div>
        </div>
        <div className='foreground'>
          <div className='bouncer'>
            <div className='head'>
              <div className='neck'></div>
              <div className='eye left'></div>
              <div className='eye right'></div>
              <div className='ear'></div>
            </div>
            <div className='body'></div>
            <div className='arm'></div>
          </div>
          <div className='poles'>
            <div className='pole left'></div>
            <div className='pole right'></div>
            <div className='rope'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
