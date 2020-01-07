'use strict';
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }
    return (
      <div>
        <i className="fa fa-address-book"></i>
        <button onClick={() => this.setState({ liked: true })}>Like</button>
      </div>
    );

    // return e(
    //   'button',                                                             //参数一：标签名
    //   { onClick: () => this.setState({ liked: true }) },    //参数二：属性实例
    //   'Like'                                                                  //参数三：元素内容
    // );
  }
}

export default LikeButton;
