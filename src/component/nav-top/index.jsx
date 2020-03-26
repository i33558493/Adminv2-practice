import React from 'react';
import { Link } from 'react-router-dom';
import Mutil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new Mutil();
const _user = new User();

class NavTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: _mm.getStorage('userInfo').username
        }
        this.onLogout=this.onLogout.bind(this);
    }
    //退出登录
    onLogout() {
        _user.logout()
            .then( res => {
                _mm.removeStorage('userInfo');
                // this.props.history.push('/login');
                window.location.href = '/login';
            })
            // .catch( err =>{
            //     _mm.errorTips(err);
            // } )
    }
    render() {
        return (
            <div className="navbar navbar-default top-navbar" role="navigation">
                <div className="navbar-header">
                    {/* <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button> */}
                    <Link className="navbar-brand" to="/"><b>HAPPY</b>MMALL</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username
                                ? <span>欢迎，{this.state.username}</span>
                                : <span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li><a onClick={this.onLogout} ><i className="fa fa-sign-out fa-fw"></i> 退出登录</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavTop;