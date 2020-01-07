import React from 'react';
import ReactDOM from 'react-dom';
import LikeButton from './LikeButton.jsx';


import "../node_modules/font-awesome/css/font-awesome.min.css";
import './index.scss';


const e = React.createElement;
const domContainer = document.querySelector('#app');
// ReactDOM.render(e(LikeButton), domContainer);
ReactDOM.render (
    <div>
      {/* <i className="fa fa-address-book"></i> */}
      {/* <button onClick={() => this.setState({ liked: true })}>Like</button> */}
    </div>,
    document.getElementById('app')
  );

