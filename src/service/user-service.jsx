import Mutil from 'util/mm.jsx';

const _mm = new Mutil();

//TODO 编写用户服务
class User {
    //用户登录
    login(loginInfo) {
        //注意使用 return 返回 promise 对象
        return _mm.request({
            url: '/manage/user/login.do',
            type: 'post',
            data: loginInfo
        });
    }
    //检查登录接口数据是否合法
    checkLoginInfo(loginInfo) {
        let username = $.trim(loginInfo.username);
        let password = $.trim(loginInfo.password);
        //验证用户名为空
        if (typeof username !== 'string' || username.length === 0) {
            return {
                status: false,
                msg: '用户名不能为空！'
            }
        }
        //验证密码为空
        if (typeof password !== 'string' || password.length === 0) {
            return {
                status: false,
                msg: '密码不能为空！'
            }
        }
        //验证通过
        return {
            status: true,
            msg: '验证通过。'
        }
    }
    //退出登录
    logout() {
        return _mm.request({
            url: '/user/logout.do',
            type: 'post'
        });
    }
    getUserList(pageNum) {
        //注意使用 return 返回 promise 对象
        return _mm.request({
            type : 'post',
            url : '/manage/user/list.do',
            data : {
                pageNum: pageNum
            }
        });
    }
}

export default User;