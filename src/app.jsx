import React from 'react';
import ReactDOM from 'react-dom';
//KNOW 此处引入不同 Router 组件代表不同路由模式——BrowserRouter：H5路由，HashRouter：哈希路由
//KNOW 哈希路由地址栏会用 # 号隔开，特点是兼容性较好，H5路由地址栏用斜杆隔开，但上线时需要在后端设置以便更好访问
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
//页面
import Home from 'page/home/index.jsx' ;
import ErrorPage from 'page/error/index.jsx' ;
import UserPage from 'page/user/index.jsx' ;
import ProductRouter from 'page/product/router.jsx' ;
import OrderRouter from 'page/order/router.jsx' ;
import Login from 'page/login/index.jsx' ;

class App extends React.Component {
    render() {
        let LayoutRouter = (
            <Layout>
                {/* Switch 有两个作用：1.Router 标签只允许包含一个元素，此处用 Switch 标签包含；2.保证只匹配一个路由结果，避免指向 "/" 时重复跳转 */}
                <Switch>
                    {/* 首页的路由 */}
                    <Route exact path="/" component={Home} />
                    <Route path="/user/index" component={UserPage} />
                    <Route path="/product" component={ProductRouter} />
                    <Route path="/product-category" component={ProductRouter} />
                    <Route path="/order" component={OrderRouter} />
                    <Redirect exact from="/user" to="/user/index" />
                    <Route component={ErrorPage} />
                    {/* 指定任意路径都默认跳转到首页 */}
                    {/* <Redirect from="*" to="/" /> */}
                </Switch>
            </Layout>
        )
        return (
            <Router>
                <Switch>
                    {/* ·WAR 此处设置疑似在登录界面发出 ajax 请求时引发组件重绘 */}
                    <Route path="/login" component={Login} />
                    <Route path="/" render={ ( props ) => LayoutRouter } />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);