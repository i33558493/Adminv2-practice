import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';


import Mutil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new Mutil();
const _user = new User();


class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            isFirstLoading : true
        }
    }
    componentDidMount() {
        this.loadUserList();
    }
    loadUserList() {
        _user.getUserList(this.state.pageNum)
            .then(res => {
                this.setState(res , () => {
                    this.setState({
                        isFirstLoading : false
                    })
                })
            }, (errMsg => {
                _mm.errorTips(errMsg)
            }));
    }
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        })
    }
    render() {
        let listUser =
            this.state.list.map((user, index) => {
                return (
                    <tr key={index}>
                        <th>{user.id}</th>
                        <th>{user.username}</th>
                        <th>{user.email}</th>
                        <th>{user.phone}</th>
                        <th>{new Date(user.createTime).toLocaleDateString()}</th>
                    </tr>
                );
            });
        let listError = (
            <tr>
                <th className="text-center" colSpan="5">
                    {this.state.isFirstLoading ? '正在加载中~' : '没有找到相应的结果！'}
                </th>
            </tr>
        );
        let tableBody = this.state.list.length > 0 ? listUser : listError;
        return (
            <div className="container" id="page-wrapper">
                <PageTitle title="用户列表" />
                <div className="row">
                    <div className="table-wrap col-md-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>用户名</th>
                                    <th>邮箱</th>
                                    <th>电话</th>
                                    <th>注册时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableBody}
                            </tbody>
                        </table>
                        <Pagination
                            current={this.state.pageNum}
                            total={this.state.total}
                            // totalBoundaryShowSizeChanger={10}
                            onChange={(pageNum) => this.onPageNumChange(pageNum)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserPage