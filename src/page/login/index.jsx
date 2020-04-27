import React from 'react';
import './index.scss';

import Mutil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new Mutil();
const _user = new User();

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            //跳转地址指向登录前页面
            redirect: _mm.getUrlParam('redirect') || '/'
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputKeyUp = this.onInputKeyUp.bind(this);
    }
    onInputChange(e) {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        this.setState({
            [inputName]: inputValue
        });
    }
    //用户提交表单
    //TAB 此处曾因请求类型错误而无法获得后端服务器响应
    onSubmit() {
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        },
            checkResult = _user.checkLoginInfo(loginInfo);
        //验证通过
        if(checkResult.status){
            _user.login(loginInfo)
            .then((res) =>{
                //本地保存后端接口返回数据
                _mm.setStorage('userInfo',res);
                //外层的 Router 会提供一个 history 对象放入 props
                //Router 通过修改后的 history 对象跳转
                this.props.history.push(this.state.redirect);
            },(err) =>{
                _mm.errorTips(err);
            })
        }
        //验证不通过
        else{
            _mm.errorTips(checkResult.msg);
        }        
    }
    //键盘按下（回车）
    onInputKeyUp(e) {
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
                    <div className="panel-body">
                        {/* KNOW 将此处的 form 元素改为 div ，因为 form 元素在提交后会自动刷新页面，除非另行禁用默认行为 */}
                        <div className="form-login">
                            <div className="form-group">
                                <label htmlFor="inputUser" className="sr-only">用户名</label>
                                <input type="text"
                                    name="username"
                                    id="inputUser"
                                    className="form-control"
                                    placeholder="请输入用户名"
                                    onChange={this.onInputChange}
                                    onKeyUp = {this.onInputKeyUp}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPassword" className="sr-only">密码</label>
                                <input type="password"
                                    name="password"
                                    id="inputPassword"
                                    className="form-control"
                                    placeholder="请输入密码"
                                    onChange={this.onInputChange}
                                    onKeyUp = {this.onInputKeyUp}
                                    required />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                onClick={this.onSubmit}>
                                登录
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;