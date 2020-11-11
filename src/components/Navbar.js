import React, { Component } from 'react';
import Identicon from 'identicon.js';
import dvideo from '../dvideo.png'

class Navbar extends Component {

  render() {
    const { account } = this.props
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.chivits.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={dvideo} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp;Chivideos
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <span className="text-white">
              <small id="account">{account}</small>
            </span>
            {account ?
            <img
              className="ml-2"
              width="30"
              height="30"
              src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
              alt=""
            /> : <span></span>}
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;